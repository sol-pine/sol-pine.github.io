---
date: "2023-02-25"
emoji: 🪄
title: "CloudFront를 이용해 HTTPS 적용하기"
category: "study"
summary: "[배포 2단계] 조금 더 빠르고 안전한 서비스"
tags: ["web", "manual", "AWS", "배포", "HTTPS"]
---

이전 글에서는 [AWS S3 버킷을 이용해 정적 웹사이트를 호스팅하는 법](https://sol-pine.github.io/react-deploy-with-s3/)을 다뤄보았습니다.
이번 글에서는 AWS CloudFront가 무엇인지, CloudFront를 이용해 배포된 서비스에 HTTPS를 적용하는 법을 살펴보겠습니다.

# AWS CloudFront

CloudFront는 **웹 콘텐츠를 안정적이고 빠르게 전송하는 콘텐츠 전송 네트워크(CDN) 서비스**입니다. AWS는 전 세계에 Edge Server(또는 Edge Locations)를 가지고 있습니다. 쉽게 말해 이 Edge Server는 대리점입니다. 사용자가 콘텐츠를 요청하면 사용자의 위치에서 가장 가까운 대리점(Edge Server)에 요청하게 됩니다. 이를 통해 Server는 **데이터를 빠르게 전송할 수 있고 사용자의 대기 시간을 줄일 수 있습니다.** 만약 Edge Server에 캐시 데이터가 없을 때만 Origin Server(S3)로 요청하게 됩니다. Edge Server에 캐시 데이터의 TTL(Time to live, 유효기간)은 24시간입니다. 즉, 24시간 동안은 기존 캐시 데이터가 유지되고 24시간이 지나야 Origin Server를 통해 데이터를 다시 받아옵니다. 따라서 CICD를 구현할 때, 캐시 무효화 처리를 따로 추가해 줘야 하는데 이건 CICD에 관한 글에서 다시 다루도록 하겠습니다. 이제 CloudFront CDN을 통해 S3로 배포된 서비스를 빠르게 제공함과 동시에 HTTPS까지 적용해 보도록 하겠습니다! (이 글에서는 AWS CLI는 사용하지 않습니다.)

# 왜 HTTPS를 적용해야 할까요?

우선 HTTP와 HTTPS의 차이점이 뭘까요? HTTPS에는 "S"라는 글자가 하나 더 붙었죠. "S"는 Security인데요. HTTPS는 HTTP 위에 **SSL/TLS를 추가하여 보안이 더 강화된 프로토콜**입니다. HTTP는 통신 내용을 암호화하지 않고 바로 보내기 때문에 보내는 정보가 그대로 노출되지만, HTTPS는 SSL 인증서를 사용해 통신 내용을 암호화하고 보낸 사람과 받는 사람의 신원을 확인하기 때문에 안전성이 높습니다. 또한 HTTPS는 SEO에 유리합니다. 검색 엔진은 HTTPS의 강력한 보안을 적극적으로 지원하고 선호하기 때문이죠. 구글은 HTTPS를 사용하는 사이트의 검색 순위를 높게 부여해 상단에 노출되도록 합니다. 안 쓸 이유가 없죠?

# CloudFront 배포하기

0. AWS Console에 로그인하고 [S3 버킷을 통해 정적 웹사이트를 배포](https://sol-pine.github.io/react-deploy-with-s3/)한 이후부터 진행하겠습니다.
1. [CloudFront 페이지](https://console.aws.amazon.com/cloudfront/v3/home)의 <배포 생성> 버튼을 클릭합니다.
2. 원본 도메인을 선택합니다. 이전에 만들어 둔 **S3 버킷 도메인**을 선택해 주세요.

![원본 도메인](https://user-images.githubusercontent.com/105091138/235878763-4b13c112-fb75-4a91-b9df-2a10c1ef9094.png)

3. 원본 액세스에서 **Legacy access identities**를 선택, <새 OAI 생성> 버튼을 클릭하여 OAI를 생성합니다. 버킷 정책은 **예, 버킷 정책 업데이트**를 선택해주세요.

![원본 액세스](https://user-images.githubusercontent.com/105091138/235880899-d88d4dc9-666a-42bc-aa6c-0dfefd5f5efb.png)

4. Origin Shield를 활성화하고 리전은 가장 가까운 위치로 선택합니다. Origin Shield는 Edge Server와 Origin Server 사이에 캐싱 계층을 하나 더 추가하여 Origin Server의 부하를 줄이고 로드 속도를 높여줍니다.

![Origin Shield 활성화](https://user-images.githubusercontent.com/105091138/235893215-f05e4e62-32d7-4eb4-a9fd-43ab45f452ff.png)

5. 자동으로 객체 압축을 해 요청 파일 크기를 압축합니다. 뷰어 프로토콜 정책을 **Redirect HTTP to HTTPS**로 설정해 HTTP로 접근할 시 HTTPS로 리다이렉트되도록 합니다. 정적 웹사이트를 배포할 거라 허용된 HTTP 방법은 **GET, HEAD**로 설정합니다.

![뷰어 정책](https://user-images.githubusercontent.com/105091138/235894120-6192ea46-811f-45d5-bdb2-7fa81a409d15.png)

6. 캐시 정책은 **CachingOptimized**를 선택합니다. 캐시를 비활성화하고 싶은 경우엔, CachingDisabled를 선택해주세요.

![캐시 정책](https://user-images.githubusercontent.com/105091138/235895082-c243d65e-7abe-46e2-b63f-1692913676f1.png)

7. 가격 분류는 **모든 엣지 로케이션에서 사용**으로 선택해 주었습니다. 프로젝트 상황과 비용을 고려해 적절한 옵션을 선택해 주세요.

![가격 분류](https://user-images.githubusercontent.com/105091138/235896085-56dfb001-b38d-4521-bf4c-5cbb5ad6fa83.png)

8. 구입한 도메인을 적용하고 싶으면 대체 도메인 이름을 입력해 주세요.

![대체 도메인](https://user-images.githubusercontent.com/105091138/235896269-0f1358ab-6aa0-4e3c-936f-6be0a9986a80.png)

9. 위에서 HTTPS는 SSL 인증서를 사용해 통신 내용을 암호화한다고 설명했었는데요. 바로 여기서 SSL 인증서를 요청해 HTTPS를 설정해 줍니다. <인증서 요청> 링크를 눌러 인증서를 발급하고 선택해 주세요.

![SSL 인증서](https://user-images.githubusercontent.com/105091138/235896818-2d6834b0-6b24-4b30-ba44-aae22af7c3d3.png)

10. 기본값 루트 객체는 index 페이지를 입력합니다.

![루트 객체](https://user-images.githubusercontent.com/105091138/235897016-ffbde231-e299-485e-abd7-7ca5016c4321.png)

11. <배포 생성> 버튼을 누르면 배포가 완료됩니다!

12. 배포 후, <오류 페이지>탭에서 오류 코드에 따라 Fallback Redirect 설정을 해줄 수 있습니다.

![오류 페이지 탭](https://user-images.githubusercontent.com/105091138/235897949-f0b71d63-e8a7-48c5-a39b-b8c87f71fa32.png)

13. HTTP 오류 코드를 선택하고 리다이렉트할 경로를 입력, 응답 코드를 선택해 주세요. 저는 오류 코드 403에 대한 응답 페이지는 index 페이지, 응답 코드는 200을 반환하도록 설정해 주었습니다.

![사용자 정의 오류 응답 생성](https://user-images.githubusercontent.com/105091138/235945271-2710f96c-2f46-41e8-bcc9-970b0f451a33.png)

배포된 사이트로 접속해 페이지가 제대로 로드되는 것까지 확인이 되면 설정 끝입니다!

S3부터 CloudFront까지 리액트로 만든 프로젝트를 배포하는 법을 정리해 보았는데요. 배포는 할 때마다 이전에 했던 방법들을 찾아보게 되는 것 같습니다. 저도 다음 배포 때 다시 참고하기 위해 글로 정리하게 되었습니다. 이제 배포 시리즈의 나머지 Route53과 Github Actions를 이용한 CICD 구축이 남아있네요. 2023-02-25 기준으로 작성된 글이라 글을 읽는 시점에 따라 AWS 인터페이스와 이 글의 캡처 화면이 완벽하게 같지 않을 수 있습니다. 그래도 흐름을 한번 보시면 설정에 무리는 없을 것 같습니다, 없길 바랍니다! 감사합니다.

#### [연관 글] 리액트를 스무스하게 배포하는 법

- [S3로 스무스하게 프론트 배포하기](https://sol-pine.github.io/react-deploy-with-s3/)
- [CloudFront를 이용해 HTTPS 적용하기](https://sol-pine.github.io/aws-cloudfront/)

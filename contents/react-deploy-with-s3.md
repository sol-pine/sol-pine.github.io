---
date: "2023-02-23"
emoji: 🪄
title: "S3로 스무스하게 프론트 배포하기"
category: "study"
summary: "[배포 1단계] AWS 정적 웹사이트 호스팅"
tags: ["web", "manual", "AWS", "배포"]
---

AWS는 Amazon Web Services 약자입니다. Amazon? 맞습니다, 그 아마존입니다. 아마존이 클라우드 컴퓨팅 시장에 뛰어든 이유에 대한 다양한 썰들이 존재하지만, 처음엔 아마존 내부에서 사용하기 위한 인프라를 구축하고 운영하는 것이 목적이었습니다. 그러다 점차 클라우드 컴퓨팅 시장의 비즈니스 가능성을 보고 이를 적극적으로 활용하기 시작한 거죠.
![AWS](https://user-images.githubusercontent.com/105091138/232197624-f1378fff-d807-48cb-b3ec-eac4e0e3600c.png)
당시 기업들은 대부분 자체적으로 인프라를 구축하고 운영하였습니다. 하지만 이런 방식은 비용이 많이 들고 자원도 효율적으로 사용하기 어렵다는 단점이 있었습니다. 이러한 문제의 해결책으로 클라우드 컴퓨팅이 등장하게 되었습니다.

# 클라우드 컴퓨팅이란?

클라우드 컴퓨팅은 물리적인 서버를 구매해서 관리할 필요 없이 필요한 컴퓨팅 리소스를 원하는 사양, 원하는 시간만큼 빌려 사용하는 것입니다. 기업이 클라우드 컴퓨팅을 이용하면 관리에 들었던 비용과 시간에서 자유로워질 수 있죠. 또한, 클라우드 컴퓨팅은 유연성과 확장성이 높습니다. 비즈니스의 변화에 따라 컴퓨터의 사양 또는 개수를 늘릴 수도, 줄일 수도 있습니다.

# AWS S3

2006년 봄에 AWS가 시작한 첫 번째 스토리지 서비스가 바로 S3입니다. S3는 Simple Storage Service입니다. 말 그대로 심플하게 파일들을 저장해주는 서비스입니다. 보통 정적 파일들을 저장해두는 용도로 사용하지만, 더 나아가 정적 웹사이트 호스팅에도 사용할 수 있습니다. CRA를 통해 만들어진 React 프로젝트를 build 할 경우 정적인 build 파일들이 생성되기 때문에 이를 S3 서비스를 통해 저장함으로써 서비스를 배포할 수 있게 됩니다.

# 서비스를 배포합시다!

그럼 이제 S3를 이용해 React 프로젝트를 배포해볼까요?

1. AWS에 가입 후 S3 버킷 서비스 화면에서부터 시작하겠습니다. 우선, <버킷 만들기>라는 버튼을 클릭합니다.

![s3-bucket](https://user-images.githubusercontent.com/105091138/232241620-e7845a12-6c29-4e13-96be-6b6da1fa529b.png)

2. 하단의 이미지처럼 설정해줍니다. 여기서 가장 중요한 건 **퍼블릭 액세스 차단은 모두 해제**해야 합니다. 전 세계 누구나 우리가 배포할 사이트에 접근할 수 있는 권한을 가질 수 있도록 열어주는 것입니다.

![s3-setting](https://user-images.githubusercontent.com/105091138/232242414-c47c867a-9ee2-4123-a3b7-b3816f048c8d.png)

3. <버킷 만들기> 버튼을 눌러 버킷이 만들어지면 **속성** 탭의 가장 하단에 정적 웹 사이트 호스팅의 편집 버튼을 눌러 정적 웹 사이트 호스팅 편집 페이지로 들어갑니다. 정적 웹 사이트 호스팅을 활성화한 다음 인덱스 문서와 오류 문서를 모두 index.html로 지정해줍니다. React는 Single Page Application이잖아요? 우리가 가진 문서는 index.html밖에 없으니 고민하지 말고 심플하게 지정해줍시다.

![s3-hosting](https://user-images.githubusercontent.com/105091138/232242828-c6155f3d-f8f2-4d4a-99a4-20c107e015cf.png)

4. **권한** 탭으로 들어가 하단의 코드를 버킷 정책에 붙여 넣어줍니다. Resource의 your-bucket-name에는 본인 버킷 이름을 넣어주세요.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::your-bucket-name/*"
    }
  ]
}
```

5. 마지막으로 잘 만든 React 프로젝트를 빌드하고 빌드 파일을 선택해 객체에 업로드해줍니다. 여기서 주의할 점은 빌드 폴더를 넣는 게 아니라 **빌드 폴더 내의 파일들**을 넣어주세요!

# Congrats!

이제 여러분은 AWS S3를 이용해 웹사이트를 호스팅할 수 있게 되었습니다. AWS는 12개월 동안 프리티어를 제공하여 합리적인 가격에 내가 만든 서비스를 인터넷 세상에 배포할 수 있습니다! (광고 아님 🤔)

![internet-meme](https://images.squarespace-cdn.com/content/v1/61004d79242dd506873b769a/4a1da6a9-3968-4a27-9a6b-c4f5731d37c8/online.gif)

#### [연관 글] 리액트를 스무스하게 배포하는 법

- [S3로 스무스하게 프론트 배포하기](https://sol-pine.github.io/react-deploy-with-s3/)
- [CloudFront를 이용해 HTTPS 적용하기](https://sol-pine.github.io/aws-cloudfront/)

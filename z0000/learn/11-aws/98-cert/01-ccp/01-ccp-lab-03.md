Perfect—this is where your training becomes **premium-level**.
Below is a **chapter-wise lab manual structure** (only for hands-on–relevant chapters). Each lab is written so you can **directly give to corporate learners**.

---

# 🧪 LAB MANUAL — AWS Cloud Practitioner

Aligned to AWS Certified Cloud Practitioner

---

# 🟨 SECTION 3: SECURITY LABS

## 📘 Chapter 10 Lab: IAM User & Policy Setup

![Image](https://images.openai.com/static-rsc-4/0u_fJPDzpet3eyinCaA1jFjv_etFjezpa6v66a-pf1wMLjuBG9r9wRH_UVvv3lgzjiJVzCok_edafFUidft6Ca-MsYXcUxnF1WWHnPD3xk_k0lqZbbubEWF-5tgs8GzbqLL-C_w8JuMurLjDQyDc6FUb38KtQcyxJkUIvzfD3POiaTZejh5tMz7X1vAwBaCN?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/8w7CaUzzGB-BACxwf82m6JnE9x2101dkvF3IQmm7FSUlUOLiSgJvt2zVOAb0mX32dko1ubOUzw_xfaB7AJ3_E9HdYgdie9qG4BT98jC5yEO_qUkzaUfRZHzeDFYtQUCjWZVC6NyeRpEeZgGDVc_c0em-yRiMK5qx1MVjywn-qgORlizXHyttm_d8jCeLQEqA?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/0fEk9bet9q0wNY91d2-JwwYtpdTqW1XZVTyUJSdSRfrNkE_KxSN0woLJc4GePczzcEhca54IXz4kcj8wYBssNRjvvnaAEkGzAMJWwx7viaMwoEbYEbhedN0iqLGEh4EZAwYJYsyblTomni5aUvS69M1xLx3YPm0kdm07y7UmlnKb1xqmaUfTTp_mDSz8mISL?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/Q8Dj9UNPh48VFE3f7Wlcfr2PSr8h3U26QTzFSrseCyFKG_CCpLW6gni3T3JPIEqYMGJVhh4y9Hvt7aa8cdz2yFBpW-9VyrxDJFlsO7Uryo5kaTgRCi8larv1LjPUS1l0ygT7S2u6Oh1h_swzlJdI-evczaKoGUFNc_mPbUyT6AMM462_HAp-aVX2A772zStB?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/zaY2h2TFrSvsvsKl7jBK3h5_hyrdPepZ5vslQ1tCdJn6doDnm-8Ckm4X8vrF0wv4o_QSoHCNrUADaqeGuuwpL2KoIX1ZyI1MOSH8ADg520krvcbmV53XyRYduEG5-M3dXY7DQ7ARgNus_4NMXpTKPii5bG8Ch_8jAGC36kHVaOr6BpSra95SyGffr9s-dDTz?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/aBmPxGd692jx2zZMmqzNafOFs99XKUO4wM27UkRS4HuPhQGUVPBXTmpn_Dkpxt_s7QfvAglC3eYa56J_EUp4paf-AZy_5zwEDzmRhKwPYjshbQ_6tnow8yHA0ANALZa9nWeISmRDjb7bNnWDGBeevg2N8M7qqraNQ1f52QWfuAuUbVAGd6aA3HcbL3G2mdte?purpose=fullsize)

### 🎯 Objective

Create IAM users and assign least-privilege permissions.

### 🧰 Pre-requisites

* AWS account access
* Console login

### 🧪 Tasks

1. Go to IAM → Users → Create user
2. Username: `student1`
3. Enable console access
4. Set password → require reset

---

### 🔐 Policy Task

1. Create custom policy:

* Allow: S3, EC2 (basic)
* Deny: Billing

2. Attach policy to user

---

### ✅ Validation

* Login as IAM user
* Verify:

  * Can access S3
  * Cannot access billing

---

### 🎯 Outcome

* Understand IAM user lifecycle
* Learn least privilege

---

---

# 🟥 SECTION 4: COMPUTE LABS

## 📘 Chapter 15 Lab: Launch EC2 Instance

![Image](https://images.openai.com/static-rsc-4/t_qbuTBGDiMx1n_xawYNETr620eoX0iUwc0sbB7h4ZS67Jy332GckIk0FZbHFxq-MA3pMfwiyHnw1VyG4ETZ5P-6OJBLAvsRYffrfBscZtiuIVrbHP8wqmiAiEse4X0FATOwot4BBzAYPiOLEiPweBxT47YwEv4jp2dcNxTVhDjFdJvgySF3BM3oJJgHF71P?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/C6NdqHtDu5sBanOaBYBtrKikZ5SHy2FLc59RwrXig-oeR0mT85VJM8IksGIIVXlN0tNBblH-_xm25utgmeD1uhbvcXNhboSzl3abZWjJBRkkfla6AwrMH9E12pICTN6F3kvCieIL3_rjAL6LoyL45Kz0JF1VnuLVJT_2A9Uc3AEkQ-fRgzd2PsefZK6wSSfK?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/5XJ0M7kzS1D1bHPt306tfH4v7lVLM_NOMX9j1Rwom0vb2GoNASNTyij9ffN-2tzRuDxg8s-6RVh5_26try-HidKRWAf6WTqLz55tjrgnEYJFuybHGBQnnYKRY8rmkYTIK4D6sZvlwDbvKu9Kkw1mZy5wPVUJ_Ti3Ev5c4oJcaDadsjhfKUz2Y9q961Kf3taI?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/cIlazAugZ9sZffmJrajo7ghNVu9D14XJjJ48bEFcU4dn38eDz_XnLxRTwlxh5RvDwofFZUN66zkQZHgtsQyAwDcn_RHtPgsO2CRoUk9D3HCWd5oYPZwHSygOxhOBWZ_0A95w9shO4KzDAH9f5LN7WlX2cPPr0vqg21rIUIZLqtEZ3l213Su_oXN9IAXfvpFS?purpose=fullsize)

### 🎯 Objective

Launch and connect to a virtual server

### 🧪 Tasks

1. Go to EC2 → Launch Instance
2. Select:

   * AMI: Amazon Linux / Ubuntu
   * Instance: t2.micro
3. Create key pair → download `.pem`
4. Configure security group:

   * Allow SSH (22)

---

### 🔌 Connect

```bash
ssh -i key.pem ec2-user@<public-ip>
```

---

### ✅ Validation

* Successfully connect via SSH
* Run:

```bash
sudo yum update -y
```

---

### 🎯 Outcome

* Understand compute provisioning

---

---

## 📘 Chapter 17 Lab: Auto Scaling (Concept + Demo)

### 🎯 Objective

Understand scaling behavior

### 🧪 Tasks

1. Create Launch Template
2. Create Auto Scaling Group
3. Set:

   * Min: 1
   * Max: 3

---

### ✅ Validation

* Increase load → instances scale

---

### 🎯 Outcome

* Understand elasticity

---

---

## 📘 Chapter 18 Lab: AWS Lambda Function

![Image](https://images.openai.com/static-rsc-4/zHj4DGRHGHzXnjGW7GpZUGWZ5C1sY7HPaeeoVPimXUoYd4SdefqBQxY0ZyUkbNyzscVDOKIoohr5C4a7vDnkN7cGgLluq9N-ox5bmr2Ll6F7q35TrT6CkRJTZLR5sZ_v-wadv_1tMPLkI1NOnDNftbGeWCNVxmjmb3qdAq3P6Lh62mR7wRfU9HH7sQIhq9V3?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/LzDmfZFU8ET6A62b1ik1RnyfdmLYjZbT0FsxMBc3w7qWoNKdWeNk6HwgqeUe-lLrQS5dUXYRt9N01X6ec81frRoBiqAuZRFP57V0krbcPRmLVQKGVUIqhahage18sjipLEEazFEYrO4cOoyVCFTgjVj6gg9ZtOdOpho725zVEP5rwJFN0xTlZcF07lXaN5PX?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/tTqfYfs9Fx95UCLtb1dB-EyYw3bBTf7V-A3iASvhOCnwszwgVLCmdW_DA1fM1_Mlfxxw4pR9JECTY1_63b1zSbVeCKVuY3Mt4H5SsTSblSxsrELerfmJM4BnQ6bUdQk1DbibKkuHBjg3EUaaw7BMZtQswNh1_OasJwUfstcNkqKeYXc4D5v2DvwayxdtwvQZ?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/bOyYIT-mt8dwTh9oUSpmgvMe6l1BaaWcWrZE548bnmjK2OrUU_XjAnjkL1i2kv9JJWd_OoATZod2iik0XEUVpy-QmnUCqhiSHjPHnd-Yp8KRqUDnLPNnoQYDZBHxsv7xauYW5Qb0rLybT1JC0DlbLKALcQucLzKCNgMt55tADru1IR5tbie14JIBCCtzJUz3?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/7Us42owqLBHaucwPPAjfheA9RzUr27bsSRrhiB13gVC_5_RPDlwGjHhn4cR4Qsovfwfax8RdT-fVOnKYPKhnCpBNbPgr0ihGRU0EmjAM5u5Ee3FOB0OdZjHNLVS1Jkepk0LQ0UlzVHtn-qJImSB7SF8RQyObJOIUfUHCkaIiFx8Ht3ZSwg0VH1kTykxtuBM9?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/3FGO0pjjc-Xks7fK02S3AlbCQUTcseBhJ6PMVIQbpYSVxFO84Kh6ObpMw1ThtWf0XnHg79HWfRXkWfjT8aI8BhOVL48wkzsoe7S9pO8u6JoaBs1T75cEqIBv9pNa_-P-SUBaokiav-LpqNQYACdfvxgjeFiKiWzZ9nfRR9Zu0j0-qiDiwgwYCfBPDaSYZ4au?purpose=fullsize)

### 🎯 Objective

Create serverless function

### 🧪 Tasks

1. Go to Lambda → Create function
2. Runtime: Python
3. Code:

```python
def lambda_handler(event, context):
    return "Hello from Lambda"
```

4. Click Test

---

### ✅ Validation

* Output appears

---

### 🎯 Outcome

* Understand serverless

---

---

# 🟪 SECTION 5: STORAGE LABS

## 📘 Chapter 21 Lab: S3 Bucket & Upload

![Image](https://images.openai.com/static-rsc-4/mrR6bNLxzWmL1aH5KUJLW66o8pRFTG1pevhB9DtMb5yIpsQE1PdCxY3hftfEn0lW2zWAz9qMTXuB76E6yVoTmW90sIs_ZcSUfpjehkRbR_WjsDHEC31FkMTskP5hhQDGMd6SpcXInl_X6N1ltfPnImDPgh7gJZFxwaK6ypat1ajFG7h4OeRSnSJJEXvu-4yk?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/2gFDFpvjZafuGWJpOdq3VkqduJylv2IA59E-ok-6wCVRU4KEKC2XXZc432S6gzAtuYuEvjqS04xBvTpqt34YbMVvBKMV2Zw14-OJgMdsDwC3uarx0S-JGiMhtDu3KqKWlfR61JX2OL0RbkJEKClAnD-DHE5HGfDISC8QmcI-K1InGImhBjPHdklO9kVdSkLi?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/MKszEzSUJT0D2a0Z1a3E64LZBkj41-Hy136i8Q75dErGwiIgvaHHGUiWeB9_K1Ez9lBbmHqTlhv0JeTfLgnX8kwDvqQr-JGcWx3u4qGdhGAqBYC3bqHXorMuOqYTgW6dF1rIA8sfDIksQ7-vIiLda5NzACPfgh7M3X7uzKuH59yxhgV39liIMFB8bXTxirB1?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/RGKWDb7Aunor9vKpzQ7q9G8hbXwAsC_4wiiZ_BJt1I5qGtf77ZeHVmRjFJPxFTwfcFJvTyKUWGMq1-MOTm_kBrr0zrrDO8Y_0UfkWGzqXhGKjU-Z2vd9dut43xSlP7jx0AtnC7hSbHqn92KRPjuKBUGFyl94pvuCd46QPNvAZhK4xf89KkkdZq-xfKb5KgKo?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/wjZQFBreaO4zxcGjO9WIbjozoBjd_IcEfGyMiTF03AbgBaeZrXoFPCNj4oRQhmBqmL4DblKhKQZTP5O0QdcJJWFxLQKae-fQxyFCAB9nR2jQ7CQ_FD7wv6EsAI8zKoBLHGobwvIPOAQ_9yiDfh7hwEtLkS-CgMGQwBPKzc7ud5JRxLJOHgB8Z_Trw0qrGKjC?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/1l8GwWBvvr0kSVGL75WKZxRqH0IQKJsZv2fztKXwMV2Pk4rBlayCICbE-FhOdlbwodLf-fSjWODmxfkMXMl3rPVj3cRWsgloi1HL3JvZ7-LlyMU3UAS9zYV14RbezrR_hZCtJ9JpeyI8ayN1MRPuLna1TT__RAHWtWd8h-JDnKDKzCS3pPzkuysQ5BxIgRbQ?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/OU4WVxvBiqCRmM7B2jau5AMWYZMPDzfGYhaxnxlAS5_RVWOrVr_i6GtyHcIjwMmyjoO8x6ZAmP6wXzx0goxtCFBXzZv8IOEC_by2n5m_crVm-EzVpm9FG3-VwpT-v_7JaDbpK0k-n0HgjATW4eRWG-VCQ763IG0qS2shkJ-b2PKu1DqCE2pbQs4_IvB63Can?purpose=fullsize)

### 🎯 Objective

Store and retrieve objects

### 🧪 Tasks

1. Create bucket
2. Upload file
3. Enable public access
4. Copy object URL

---

### ✅ Validation

* Access file via browser

---

### 🎯 Outcome

* Understand object storage

---

---

## 📘 Chapter 22 Lab: S3 Lifecycle Policy

### 🎯 Objective

Automate storage cost optimization

### 🧪 Tasks

1. Go to bucket → Lifecycle
2. Add rule:

   * Move to Glacier after 30 days

---

### ✅ Validation

* Rule created successfully

---

### 🎯 Outcome

* Learn cost optimization

---

---

# 🟫 SECTION 6: DATABASE LABS

## 📘 Chapter 27 Lab: Create RDS Instance

![Image](https://images.openai.com/static-rsc-4/nycIPY20d2Qadmk6I7BJZVRUBtBFeunpGxJwmaj10BHQh2jNd5V4Ia-Bz0q1nvO2MSJbFQA_4kwUIvFc3R9LbnHx-UPizR8SFIMkRMf1nnpU5yORBn6nON6GCORtbHxL5qaqov__VPowe9j2reyeLYo354ftuCU620jDLpaDEmhE57noN1MnhNc8wAQ1ToEV?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/3wZOZ7DXbx1RTP80YhklC0ZhKHwSejaoCh6tx8LwD5x3R3ji88OKdG7SxDQLJNdtDb7OCSQICfAMBPxEPPMyKMaW5-Pa3EAyf2Td47sU2Ev3GKIpE_2S0C0JtCjxfwh1RoOMllCSCRqwmgY3rZC3aUNjefIl0ddhrmSMY2VfIB5JtUwb8DH0V9i3sfjZwnhT?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/tJsHawiagReu95i-KHDAsLWDfyHJfQR8xpTFhzHvUYfplPVyfUWymVRQUam-Gd9Apd8rZvulb0Oe-zYbcm904kof2IPjvM95rW46gUk4nNLkcpfGke1pCVRYl_IH9wKpBlxsz-Z2fidWGBUn0jAsCyO35rf-o_BZj0htZHaN8YhhfwQNhN6RUNewoiOiUvGM?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/NrJh_4OdABDPEc5ESQqIm8zUlUcwUqQ38jmGKoG1koP0XkAw9YJN0XftvNwFYzHp_0daH8B05NnxkoS1Yy1bDNlGtjLNMhLe3S9ATyc0kmgakWqJu0vIqg2TidkgKZ6MwJINwPHv1q5eN_qXe-xVxqt3cOAx3J6BXOxyXpu70JdjkrHbY83rMraMXOjGYeaB?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/TGqase4JbSR9qLeFlbOjI3PRcPjE4pSVYcLRVx-3bD6di39mqAGBIx4l2P2d7YoDF3GyMwZajpprqu3Dd8-cVmIT5qvUNcMEN81CuSrH0nMOesTJw-IgTe1meHA2olWPnFMaGvbjpMKDgsCTxrUK4jaES3v4fbLANNWS_FnaFZPd6wAUj1m-Wa_QXR0ymL-5?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/a8D52Zs_0R8IiB2Sq7CTs_4U6uXAtIDeCkWrgpY_y-lVpA75v6AVg2ZG9P8YFBFOtoFhqDPFMkcZE5AR4bBxQMKKX3MIlUIRvajO3Ny0qHgoiG_2LojJ3YasYu8bi-bp--SqxM7UPc9iCg74YQwhncf4k7L6M4LvMYouPV7QZH0XJ26jVGX4FG9-5KuzJM-a?purpose=fullsize)

### 🎯 Objective

Create managed database

### 🧪 Tasks

1. Go to RDS → Create DB
2. Select:

   * MySQL
   * Free tier
3. Set username/password

---

### 🔌 Connect

Use:

* MySQL Workbench or CLI

---

### ✅ Validation

* Connect successfully

---

### 🎯 Outcome

* Understand managed DB

---

---

## 📘 Chapter 28 Lab: DynamoDB Table

### 🎯 Objective

Create NoSQL database

### 🧪 Tasks

1. Create table
2. Partition key: `id`
3. Insert item

---

### ✅ Validation

* Data visible

---

### 🎯 Outcome

* Understand NoSQL

---

---

# 🟧 SECTION 7: NETWORKING LABS

## 📘 Chapter 30 Lab: Create VPC

![Image](https://images.openai.com/static-rsc-4/Sm4UwJI5BDGRSUCRgCjjsVBT-0X1U88Rfr84o_WwuU1ECwj3q1vwzv5JQPU4AlpPfxjI77IVMkEaNm2x7VGDZyzFsi129QaDFmOB0aeoDa5DSllPLgLIoTanRQlyGob3o5qn3S3kdGUVu3DVcQrrzvC2-VLnFPpUJKaR9Q7dZnXPbYqyCv7z4NaHm6PjlS5e?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/jHifz1qN8MfVais0ivLSoB5c8P1PfMRCe9kFETBIUap4ESSo-SFH9OhlCKFjMc1CWs2Sby9tqxExvTolqB6U_0lqLmSt82sXPPUSuf2SuDgtMBSd4BFCUfMBt1TNV1u6AafZ0sx6NXssEtmEAEoY_FbW0vBDEzohcSgu-mbBWBAeBqmltJetZtj_xLg4okhi?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/29LJNg6ykzAhhQxMeWSnr7s7-h_sdSnQASVXhdgqV4r6k9YjEeoDR87V-1K5_J64zPCmB0i1gG8Rs4rXvUix6Ny6v1lOSQnl4CCBcYeLQzcCE6HtnTcCcHwO5vp7QKYDGB7nIZ3bhon6ZUDKqJbeuszZSc6xmXoJlhD0Km5n-taZtW_gO-fKMmv6mcK_VzRE?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/ZysMypzOfPHNnOhVETnIWne2ps9NjtDiW-ddx4FboG-N7T-cG9BE24SG-2SwEPzcYaZ5OhSVksbaD-IcRy6mRrYuoTJUumlwMFL0qfSPGSZTp7PGwllb9QCqS1n6qGKW7dSBlBiQGkIYGZsi6iankgEdBrDjA2_lXuVD2Btn1COmN37pgbJmq4Gt-yn0XOj7?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/adyOau1LZpnkg63RaQ16HjTRZijlLZ0jmMHfvC45rPdNSk8zwk3JU-pDPgkOCEkrYljhzyztoS85Kr8ua3QPvaXkUw8EPUIfE-TsaiU6Pu5tG6qr68FBkC5MS_hXa1Kg3EEG2bSX2PdRlEsNzZWJ4kt6XOT_CYCEUI7FjvSDFvkGMGDkOJjx_gUkVELyK81p?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/EboPY2SNLEmS3SPrJ0skGIksJ0Z7EkH0F6gI5fZAb_B_7pAOoCbczzEyS6NhyUi9mo7SLxmJawuW0K4C8G906j4tLxnoy_HjsAJ9dwmEPyBAIznf_rkLhMwimbyhububx6hnD-rkhcbDzmua_5UxCPu5y823CkXM2Q_mTyaPyLrbm_u3JdDuQ3mIZcJSlzDd?purpose=fullsize)

### 🎯 Objective

Understand networking basics

### 🧪 Tasks

1. Create VPC
2. Add subnet
3. Attach internet gateway

---

### ✅ Validation

* VPC created successfully

---

### 🎯 Outcome

* Understand isolation

---

---

## 📘 Chapter 34 Lab: Route 53 + Domain (Optional)

### 🎯 Objective

Understand DNS routing

### 🧪 Tasks

1. Create hosted zone
2. Add A record

---

---

# 🟦 SECTION 8: MONITORING LABS

## 📘 Chapter 35 Lab: CloudWatch Metrics

![Image](https://images.openai.com/static-rsc-4/iTAoo8mQLwi4D5BLUz_w0afDKlLHE33E7bK0VbjcooM0CNixFq6vEk0u4Jq_ClCyhtQ8QcAdQO6XAp4ZDy_eC8x9_rk1iy-GW2pHgIWXs-X1JqqAXxDcAHzvbu-7wMTDh6F7W2ifjVQRxdhKBhtgbRP1vpzGUhYRUx3MIW-tPsfLQnnzeRRcMf7zrD27ALV0?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/06N9x8sw5mF6X_ACgFpDQHKUjr4gIsVF1JPP-LaypHLGxtmTw7AHaio8tdnob356gOTxpRaEMD9s_f0gqB612oQ-f4WQopiN_pISZXtv0Moq26JnItwdCNeuGdUlBe2lPc9yTmwMRTtyP2k-ePe_V34g73E2MQXlZc4ucLvhl9Fz-gcaMjB4e50HD1F9Trgm?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/dvMtfKTBt1ehRgySeRG3QMP6xX65BWUUJajcMuJl8Y6gT7jLctVA7j3RLMpKFURzv8jAvdlqB1IP8sKXAEofJN_AM0LzqhKmFCkB0dn_bxBRQ30-OeEF2z872heEtspjUWGmfBVYz0eW6RoHVbpyPtxedh5y60gtEOt_vF07xURzinJ8J6Q9lRCxsnmyuMwm?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/_n9qJHIftVd-ASK-n6MneRAoiUQD5Tg--kMxUDPZi_WsaRjeQzXqYY7iZpOUiWcdYWO63LYsBzFEzp9WU0x3kyLEP4MVNsuUphYrj40Gw3nPSXPYCmmiS2zlZARPkHa1joVcV4DeSjp84fyhR0zIO7lW4puERgcDxbeo6IfF4J4bIOZ5LcMba-qj-M8pLA7I?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/kY1IHlNTDa-RmRg_Wh4KKMTJ3SLk6jVlVvyNKCAtAOsoRX0JsytZ1IR9JJM_o6Q6HkNeC2-bZcGECt5BMbH5XFaaJiQYixlNdSmDkeZm3ljNAsnBtZTODNQq9mcErOMFhiimiDZL1_xyztLoxEn6aUFNw_zLpnqGhBFblN5PrPl-z0I6L35gkWaNhqd79PqU?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/4E7ZDjOv_Ya9yHzRCS0hEuUEE7Hj4l08803-9v-t6ZyxDBiSWr9IyplF4M_CPtmAOpdPjsFhG8B7Ly65rp02qvpFj7U_Ow46euhQlHpxdxFexQZVbfdcDg2VxC38ZDg4mEKL4xywkx7VyGdnEDkE7jBbTONxTs_xxarmjgpNKsZV5eXKADPJ6Y6eisfkLJ8p?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/ZUo4SCnPoVoTS6jfp_PXI35G9fT688rBKr7NZu_A_Q4g3xHUnNO4VI7GzGmT9BJNABTBe7YyskQyn3urRXy7l-60Swy4Y52pE4Z6-4Y0ELo9E5HEIVRJTlpVzUMv_VRf_EhxBEN_370i-Rn14NSlEk-24coeMMh0LEY9fRcQSetnmQ-aQbXtyFoZCqMuhbBr?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/JeBiICenOZ3_U6zLN84K4odpBXgDb6vnxzynNHq3AjPAUBy1ccCKimKHbcOkkT4sXwk2ORGrbk5R2_8Az68b-X86tSwRPSb1tySWlPb_fgIRsf4oVAC7AIk_oIVDBjykOXUsdqtSiTqoRHlIXeELzu1mvB6QTUUDulPknSFa5GNPghpBgo-RAfa446kji_Dv?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/Il23oJ9AkijVmegc9ifahh8Bc4UzgMOBa9DjFw_SGAJocvXngDPwxX9Mtwi6UKTjrB9LqVCfglTs3WaxySsYsAL3GB6c0w9DlyoOquzAoTYHRss0-QNYmoD3pvMQx2mIlcjPm05cX9p8MZgW6QaZL7L5SapFkJ1rjhQsC1HT064r4yVWVxM5wZ7wqvyz2Zfw?purpose=fullsize)

### 🎯 Objective

Monitor resources

### 🧪 Tasks

1. Open CloudWatch
2. Select EC2 metrics
3. Create alarm

---

### ✅ Validation

* Alarm triggers

---

### 🎯 Outcome

* Learn monitoring

---

---

## 📘 Chapter 36 Lab: CloudTrail Logging

### 🎯 Objective

Track user activity

### 🧪 Tasks

1. Enable CloudTrail
2. Perform action (create EC2)
3. Check logs

---

### ✅ Validation

* Logs captured

---

---

# 🟨 SECTION 9: BILLING LABS

## 📘 Chapter 40 Lab: Budget Setup

![Image](https://images.openai.com/static-rsc-4/6iUepggvhK4KUBuEozas0DQO9Mz2zTA-cezsZNSlEG4QQGRVwYUDrIgMKPTcrQLfZ9rhxc85eFpLpThSWhrruUdr5gaypfAWCiqAg4SMggt9YIywryDFPlvABx9gpupdl4D9dXcg4A1oj9o3Hb_8OqFqMz8t0R7bJjzaTRe4NQTIUQ0rWgZ4mCWkFwLoE1uL?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/4kOnZ-KfCfK0nWckhvlwm1jaUPpDgb1KoiALF42MINkyjFY2cnEA3_HA7yGU3ut56LUiHcXXttVqtl7NlS9qrcYnIl7CidZ2QCRtN_xCzSkuIRiOgC8KuSfujEIL2PUBxhTAykDWrOZwS05wSNPkR8Jaf40ywONjE9UGzlhCn3ZIOqTrnKEq-ZGWUQngccvG?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/dKeS24adJ8HqPwgwE1XkFB68sxcYwp0tM2_Vwml-n0OcpcK-Fok3AHsJRr2tfJ8EDKtZT6P8hFKBERM_GObUmhmrxqo9KV1hRq3px0Rh66vkbMypG9Fa019GL2pkwQTcEbM0unG7WhYAGsUzwkfLVsQjaxmDI2_CD2mwVIjOGlQTleJ08iUUgHOjpVBZaESM?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/ViwaSS1n6ZycN41l11jx5S6jaTByRJ0ar62SpbdLBe6qFFwcbg0Baz2ap3pixIkM8EzQ5TWCr5ocw86tl3Hpzpgm_MOCrRCvNXtW_WYfGN5ZpGwl-1vlLNwlDV2lBzwtD56ISfohHcXjUDbWJkoieTfK4gAxH2ljlMMZeVZZywq0eAXIp0lzs2gSn7sJF_e0?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/_9c9MufRIZxu5zaEffKUB_cqWAmZpqPTOseM1rDgNAIGNB6vwMScv7CC_EFcZY5Xon3nnrXvJRdUpu2X_71DK66bwpm_HPJifIKOZv95s4YX-S5fcvTaBn39TnZqBvGOAOK59PpYXrGHBW1sXU_rbs62Yec492gTDkzvwBSx14rmtDUwvxD9gKJUKRkjuvYu?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/kIqrgx_58o5lzZ3u93YzJHNCnNMBZokskzxOuFIOPsb3t0MT28ezCq-JrsijbdI8L7nemetWn9Igr27vxP-Nj4nHVWEwptlbNMMpMIKdREdcXYeZCU8AeTnuthoUsLoiqk1VCGc0YEGv40Kkza95XIegfvf6Y0ITswJqX_CHmzu7eAVe1Lrwc9zHWgMcpXIt?purpose=fullsize)

### 🎯 Objective

Control cost

### 🧪 Tasks

1. Go to Billing → Budgets
2. Create budget:

   * $5 limit
3. Add email alert

---

### ✅ Validation

* Alert configured

---

### 🎯 Outcome

* Prevent bill shock

---

---

# 🧪 SECTION 11: FINAL PROJECT LAB

## 📘 Chapter 46 Lab: Deploy Web App

![Image](https://images.openai.com/static-rsc-4/lnW1FYaU30h-SheLziTwgB4k_4chwjHoUdAaBhyJ8yppQmWAEj4DHOWahcJQd-p1VG8EFnPuirvMg8nE9oSUjrgcugLo_LsviXETxfowqBDxFo64QW7K4VWbRtkoJJDDT1nxUb0CkEZEPnX6NxacnHtEKgRLCZ_lkYxok3MvUAwSHYRQvifZHVLsGUAxpKsh?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/07vzwjgVF-RluSS3htwHaG_iSXi__f1UOHmKvl69DgXijf_JY7j9jraZ34i8nrH__3-4ejrsOMCBvdyAv9zKQUecbiBywI48e7SCD6MzmSujDIdRdf5eTsTigZuRpL9V1PY2MEz4GR9uDKpRbZ8GLb0K-FhSC3OdyztR__4H2-43wGnOO8LwlHc-ZroRsNII?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/Vt6Uafjy6CDDnAYpCyexaGwbue8qkHECf6KCoFTy0E6Tr4TXHmBlMMXvdkoskIFwunD414MRZLUYFPopM-84dzRS7wyxDCPBtymPcY9rKpo_HJ5B-pFUDplJQklHk0HJDG0Fh8MXWB810eBvMq_qeV0f8rBey2d7S_uKzehUSOtJAduVdSO4MGrzPMaXdAU9?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/UWbDIY8U1iGV7BrZnpVYf94Sx3tgxGMKqMFpFmM-x_gPmMX3BOpqdp6RYG1owuZJfLoINYOappcg4-KEsKUvQhi3eUbLSeg_e06d8Zjs14mjRosNMUOpLdnVrfjo2qkhgr4cer5Lkb0BdlURSuH18jJ5cm6JzNFMmysJ05VlDz3n6WrdssqBx9dF6SFjO1-o?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/I3HmMANJTpUinPdQUEuSDhi5NqtAseJBv1UsrYhpIxvN39jwXciXJ1ZGydPPWSFiT1t70n_9m4OFfsUCUNVuQqFpCEqFLX9vWaHTl8rTWgs57CgSziV-LIp-bOb-h3yGxLshyIJsyDntzJlxagnejXhAN-61vbmYqPz7lwayxFaxD2pcaiY5X_1s5QqfXMV2?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/KCMBlKBnwdfqMYb4QnPVrjR5EdBk-NwxIvnP5BS0o2c0hMpWgaon8SftvteM83fKo8V41P-twBQqcgUZgV0asFeY07Ps8K5l6EInytdmEd6mqYGbFnTC0Y1O3BvZPsh3hY5TUTkgMrNSEWysvKtV0Vm6yqmnwUbf1De54CWuy40Dq2J60bsHcVNBzXdEh8bo?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/gf_kk1aK7djg7sSD2ZYESqT1zw3vwk_u8wdeJa8l4Ceh1TB6py6kEIj1ct9sCQO-g73Ivl-c9PGYCw-n4FNPaP4PSrfY4VFBewNrEv2AW_0r2DuMGvlSs1nrTQ-N5p7OHk1lqXh6-r9D_jONkHiRZ4-px3jzGZPJQ5gY2RYHy4MOgcR6ljOfhDaLfPN5P5OA?purpose=fullsize)

### 🎯 Objective

End-to-end deployment

### 🧪 Tasks

1. Launch EC2
2. Install Apache
3. Host HTML page
4. Upload assets to S3
5. Monitor via CloudWatch

---

### ✅ Validation

* Website accessible

---

### 🎯 Outcome

* Real-world architecture

---

# 🔥 What You Now Have

👉 Chapter-aligned labs
👉 Corporate-ready format
👉 Hands-on coverage

---

# 🚀 Next Step

I can now:

* Convert this into **PDF lab manual (student version)**
* Create **trainer guide (answers + troubleshooting)**
* Add **assessment questions per lab**

Just tell me 👍

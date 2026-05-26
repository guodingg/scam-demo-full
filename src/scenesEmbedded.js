// Auto-generated from data/scenes.json - do not edit manually
export const EMBEDDED_SCENES = [
  {
    "id": "S01",
    "name": "经典垫付单",
    "category": "经典诈骗",
    "description": "诈骗分子通过小额返利获取信任，随后诱导大额垫付后拉黑",
    "difficulty": 3,
    "estimated_time": 10,
    "stages": [
      {
        "id": "S01-01",
        "name": "诱饵投放",
        "type": "chat",
        "duration": 2,
        "messages": [
          {
            "who": "scammer",
            "text": "👋 亲，在吗？我们这边招兼职刷单啦~一单5-10分钟，佣金20-50元，一单一结，无需押金！",
            "time": "14:32"
          },
          {
            "who": "scammer",
            "text": "主要是帮电商平台的商家刷好评，操作简单，手机就能做，有兴趣的话加我V：xiaomei2025，方便给你发任务~",
            "time": "14:32"
          }
        ],
        "choices": [
          {
            "id": "A",
            "text": "直接加微信了解",
            "type": "danger",
            "score": 0,
            "tags": [
              "轻信陌生人"
            ],
            "next": "S01-02"
          },
          {
            "id": "B",
            "text": "谢谢，不需要（直接忽略）",
            "type": "safe",
            "score": 100,
            "tags": [
              "识别诱饵"
            ],
            "next": "S01-end-safe"
          },
          {
            "id": "C",
            "text": "先网上搜搜这家平台靠不靠谱",
            "type": "neutral",
            "score": 60,
            "tags": [
              "主动核实"
            ],
            "next": "S01-01-b"
          }
        ],
        "riskPoints": [
          {
            "keyword": "日赚300",
            "explanation": "利用'轻松赚钱'欲望，降低心理防线，高薪必有诈"
          },
          {
            "keyword": "无需押金",
            "explanation": "降低警惕性话术，让人觉得零成本入场"
          }
        ]
      },
      {
        "id": "S01-01-b",
        "name": "诱饵投放-核实",
        "type": "chat",
        "duration": 1,
        "messages": [
          {
            "who": "scammer",
            "text": "好的呀！我们是正规平台，做了5年了，资质齐全，你可以先看看~",
            "time": "14:33"
          },
          {
            "who": "scammer",
            "text": "[图片：伪造的营业执照] [图片：他人收款截图]",
            "time": "14:33"
          }
        ],
        "choices": [
          {
            "id": "A",
            "text": "好的，看起来靠谱，先做一单试试",
            "type": "danger",
            "score": 10,
            "tags": [
              "伪造证件迷惑"
            ],
            "next": "S01-02"
          },
          {
            "id": "B",
            "text": "这些截图可以伪造，算了不做了",
            "type": "safe",
            "score": 90,
            "tags": [
              "识破伪造"
            ],
            "next": "S01-end-safe"
          },
          {
            "id": "C",
            "text": "能视频验证一下吗？",
            "type": "neutral",
            "score": 50,
            "tags": [
              "要求验证"
            ],
            "next": "S01-02"
          }
        ],
        "riskPoints": [
          {
            "keyword": "营业执照",
            "explanation": "骗子最爱借用大平台名头，证书可以伪造，搜'平台名+诈骗'查证"
          }
        ]
      },
      {
        "id": "S01-02",
        "name": "建立信任",
        "type": "chat",
        "duration": 2,
        "messages": [
          {
            "who": "scammer",
            "text": "太好了！先帮你注册账号，这是你的工号：88826。请设置一个登录密码，我来帮你操作第一单~",
            "time": "14:35"
          },
          {
            "who": "scammer",
            "text": "📋【任务派发】\n商品：时尚运动鞋\n平台：某宝旗舰店\n垫付金额：100元\n佣金：8元\n预计完成时间：5分钟",
            "time": "14:36"
          },
          {
            "who": "scammer",
            "text": "⚠️ 注意：这是商家内部隐藏优惠券，只针对刷单员，你自己是无法领取的。直接用微信扫码付100元就行~",
            "time": "14:36"
          }
        ],
        "choices": [
          {
            "id": "A",
            "text": "好的，马上扫码付款！",
            "type": "danger",
            "score": 0,
            "tags": [
              "首次垫付"
            ],
            "next": "S01-02-b"
          },
          {
            "id": "B",
            "text": "等等，为什么要我垫付？正规平台不是直接结算吗？",
            "type": "safe",
            "score": 80,
            "tags": [
              "质疑垫付"
            ],
            "next": "S01-02-b"
          },
          {
            "id": "C",
            "text": "我不确定，再考虑考虑",
            "type": "neutral",
            "score": 40,
            "tags": [
              "犹豫不决"
            ],
            "next": "S01-02-c"
          }
        ],
        "riskPoints": [
          {
            "keyword": "内部优惠券",
            "explanation": "这是骗子的经典话术，垫付本身就是把钱直接转给骗子"
          }
        ]
      },
      {
        "id": "S01-02-b",
        "name": "建立信任-小额返利",
        "type": "chat",
        "duration": 2,
        "messages": [
          {
            "who": "scammer",
            "text": "✅ 你的首单任务已完成！本金100元 + 佣金8元已返到你的账户，请查收~",
            "time": "14:42"
          },
          {
            "who": "scammer",
            "text": "🎉 佣金马上到账微信零钱！感觉怎么样？要不要再来几单？第二单佣金更高哦~",
            "time": "14:42"
          }
        ],
        "choices": [
          {
            "id": "A",
            "text": "好的，来一单200元的试试",
            "type": "danger",
            "score": 5,
            "tags": [
              "接受复购"
            ],
            "next": "S01-03"
          },
          {
            "id": "B",
            "text": "先把8元佣金提现到账看看",
            "type": "neutral",
            "score": 30,
            "tags": [
              "试探性提现"
            ],
            "next": "S01-02-c"
          },
          {
            "id": "C",
            "text": "今天先不做了，赚了8块也行",
            "type": "safe",
            "score": 70,
            "tags": [
              "见好就收"
            ],
            "next": "S01-end-safe"
          }
        ],
        "riskPoints": [
          {
            "keyword": "小额返利",
            "explanation": "用你的钱建立对你的信任，前几单返利是诱饵，不是保障"
          }
        ]
      },
      {
        "id": "S01-02-c",
        "name": "建立信任-提现试探",
        "type": "chat",
        "duration": 2,
        "messages": [
          {
            "who": "scammer",
            "text": "当然可以提现！不过现在系统维护中，17点后就能到账了~你先做完第2单，一起提现更方便",
            "time": "14:45"
          },
          {
            "who": "scammer",
            "text": "📋【第2单任务】\n商品：品牌背包\n垫付金额：500元\n佣金：38元\n限时10分钟，超时扣除本金！",
            "time": "14:46"
          }
        ],
        "choices": [
          {
            "id": "A",
            "text": "好的，做完这单一起提现",
            "type": "danger",
            "score": 0,
            "tags": [
              "继续垫付"
            ],
            "next": "S01-03"
          },
          {
            "id": "B",
            "text": "不做了，要求现在提现8元",
            "type": "safe",
            "score": 80,
            "tags": [
              "坚持提现"
            ],
            "next": "S01-02-d"
          },
          {
            "id": "C",
            "text": "为什么不能马上到账？这不对劲吧",
            "type": "neutral",
            "score": 50,
            "tags": [
              "质疑规则"
            ],
            "next": "S01-03"
          }
        ],
        "riskPoints": [
          {
            "keyword": "系统维护",
            "explanation": "延迟提现是套路，让你无法验证资金是否真实到账"
          }
        ]
      },
      {
        "id": "S01-02-d",
        "name": "建立信任-坚持提现",
        "type": "chat",
        "duration": 1,
        "messages": [
          {
            "who": "scammer",
            "text": "😢 你这样让我很难做啊，公司规定必须完成3单才能结算佣金的……",
            "time": "14:48"
          },
          {
            "who": "scammer",
            "text": "而且你这样的话会影响你的信誉分，下次任务佣金率会降低哦……",
            "time": "14:48"
          }
        ],
        "choices": [
          {
            "id": "A",
            "text": "好吧，那再做一单500的",
            "type": "danger",
            "score": 0,
            "tags": [
              "被威胁影响"
            ],
            "next": "S01-03"
          },
          {
            "id": "B",
            "text": "什么信誉分？你这不就是骗子吗！",
            "type": "safe",
            "score": 100,
            "tags": [
              "识破套路"
            ],
            "next": "S01-end-safe"
          },
          {
            "id": "C",
            "text": "算了算了，那我不做了",
            "type": "neutral",
            "score": 50,
            "tags": [
              "主动退出"
            ],
            "next": "S01-end-safe"
          }
        ],
        "riskPoints": [
          {
            "keyword": "信誉分威胁",
            "explanation": "用虚构的'信誉分'制造焦虑，逼你继续配合，是典型心理操控"
          }
        ]
      },
      {
        "id": "S01-03",
        "name": "收割陷阱",
        "type": "chat",
        "duration": 3,
        "messages": [
          {
            "who": "scammer",
            "text": "✅ 第2单完成！本金500元+佣金38元已到账~",
            "time": "14:55"
          },
          {
            "who": "scammer",
            "text": "📋【第3单任务（连单）】\n商品：轻奢手表\n垫付金额：3000元\n佣金：268元\n⚠️ 提示：这是连单任务，需要连续完成3单才能统一提现哦~",
            "time": "14:56"
          },
          {
            "who": "scammer",
            "text": "⏰ 财务特别通知：今日任务即将截止，再不完成就过期了！且明天佣金上调20%，今天做更划算！",
            "time": "14:56"
          }
        ],
        "choices": [
          {
            "id": "A",
            "text": "好，马上做，付3000元",
            "type": "danger",
            "score": -10,
            "tags": [
              "大额垫付"
            ],
            "next": "S01-04"
          },
          {
            "id": "B",
            "text": "等等，为什么要做3单才能提现？",
            "type": "neutral",
            "score": 30,
            "tags": [
              "质疑规则"
            ],
            "next": "S01-03-b"
          },
          {
            "id": "C",
            "text": "不做了，把之前608元还给我",
            "type": "safe",
            "score": 70,
            "tags": [
              "要求退款"
            ],
            "next": "S01-03-b"
          }
        ],
        "riskPoints": [
          {
            "keyword": "连单任务",
            "explanation": "这是'套牢三连'的核心手法，金额从500跳到3000，10倍暴增"
          },
          {
            "keyword": "时间紧迫",
            "explanation": "骗子利用紧迫感让你没时间思考，正规兼职不会限时限量"
          }
        ]
      },
      {
        "id": "S01-03-b",
        "name": "收割陷阱-质疑",
        "type": "chat",
        "duration": 2,
        "messages": [
          {
            "who": "scammer",
            "text": "因为这是平台的刷单规则呀，3单一起提交给商家，商家才认可~单做的话无法通过审核的",
            "time": "14:58"
          },
          {
            "who": "scammer",
            "text": "而且你都做了2单了，再做一单就能全部提现了呀！前面投了608元，不做完的话……你也知道的",
            "time": "14:58"
          }
        ],
        "choices": [
          {
            "id": "A",
            "text": "好吧，再做一单3000的",
            "type": "danger",
            "score": -20,
            "tags": [
              "沉没成本"
            ],
            "next": "S01-04"
          },
          {
            "id": "B",
            "text": "这不是诈骗吗？刷单本来就不合规！",
            "type": "safe",
            "score": 80,
            "tags": [
              "识破本质"
            ],
            "next": "S01-end-safe"
          },
          {
            "id": "C",
            "text": "那我不做了，你们退款",
            "type": "neutral",
            "score": 40,
            "tags": [
              "要求退款"
            ],
            "next": "S01-04"
          }
        ],
        "riskPoints": [
          {
            "keyword": "沉没成本",
            "explanation": "'来都来了'心理是骗子最常利用的，已投的钱不是继续投的理由"
          }
        ]
      },
      {
        "id": "S01-04",
        "name": "深度套牢",
        "type": "chat",
        "duration": 3,
        "messages": [
          {
            "who": "scammer",
            "text": "⚠️【系统提示】您的账户因频繁操作被风控系统拦截，需要充值'风控保证金'解冻后才能提现",
            "time": "15:05"
          },
          {
            "who": "scammer",
            "text": "💰 需要解冻金：5000元\n解冻后本金+佣金+解冻金会一起返到您的账户（约7500元）",
            "time": "15:05"
          },
          {
            "who": "scammer",
            "text": "📞 客服温馨提示：否则您的账户将永久冻结，前面投入的3608元也无法退回哦~",
            "time": "15:05"
          }
        ],
        "choices": [
          {
            "id": "A",
            "text": "为了拿回钱，再充5000",
            "type": "danger",
            "score": -30,
            "tags": [
              "继续转账"
            ],
            "next": "S01-04-b"
          },
          {
            "id": "B",
            "text": "我不充了，直接报警",
            "type": "safe",
            "score": 90,
            "tags": [
              "正确报警"
            ],
            "next": "S01-end-report"
          },
          {
            "id": "C",
            "text": "我去贷款来充值",
            "type": "danger",
            "score": -40,
            "tags": [
              "借贷转账"
            ],
            "next": "S01-04-b"
          }
        ],
        "riskPoints": [
          {
            "keyword": "账户冻结",
            "explanation": "正规机构不会因提现而收费，'解冻费''保证金'全是诈骗借口"
          },
          {
            "keyword": "借钱转账",
            "explanation": "透支借贷也是诈骗的一环，骗子利用你的绝望继续榨取"
          }
        ]
      },
      {
        "id": "S01-04-b",
        "name": "深度套牢-再次收割",
        "type": "chat",
        "duration": 2,
        "messages": [
          {
            "who": "scammer",
            "text": "✅ 解冻金已收到！财务正在处理中……",
            "time": "15:12"
          },
          {
            "who": "scammer",
            "text": "😱 不好！系统检测到您的账户存在【恶意操作】，需要再缴纳10000元'数据修复费'，否则所有资金将被清空！",
            "time": "15:13"
          }
        ],
        "choices": [
          {
            "id": "A",
            "text": "崩溃了，再转10000",
            "type": "danger",
            "score": -50,
            "tags": [
              "深度套牢"
            ],
            "next": "S01-end-lose"
          },
          {
            "id": "B",
            "text": "这明显是个无底洞！立刻报警",
            "type": "safe",
            "score": 80,
            "tags": [
              "止损觉醒"
            ],
            "next": "S01-end-report"
          },
          {
            "id": "C",
            "text": "我已经没钱了，怎么办？",
            "type": "neutral",
            "score": 20,
            "tags": [
              "陷入困境"
            ],
            "next": "S01-end-lose"
          }
        ],
        "riskPoints": [
          {
            "keyword": "无底洞",
            "explanation": "骗子会无限叠加费用，直到你再也拿不出钱为止，永远不要继续转账"
          }
        ]
      },
      {
        "id": "S01-end-safe",
        "name": "场景结束-安全退出",
        "type": "education",
        "summary": {
          "score": 100,
          "level": "优秀",
          "message": "你成功识别了诈骗分子的诱饵，没有落入陷阱！",
          "keyLessons": [
            "高薪'日赚300'是经典诱饵，正规兼职不会这么宣传",
            "让你先垫付的任务，99%是诈骗",
            "识破伪造证件，不被'资质齐全'迷惑",
            "见好就收，不贪心是防骗的核心"
          ]
        }
      },
      {
        "id": "S01-end-report",
        "name": "场景结束-正确报案",
        "type": "education",
        "summary": {
          "score": 60,
          "level": "及格",
          "message": "你在关键时刻选择了正确的处置方式——报警！但前期已经损失了资金。",
          "keyLessons": [
            "止损原则：已投入的钱不是继续投入的理由",
            "发现被骗后，第一时间停止转账，保留证据，报警",
            "不要试图'扳本'，骗子正是利用这种心理继续套牢你"
          ]
        }
      },
      {
        "id": "S01-end-lose",
        "name": "场景结束-血本无归",
        "type": "education",
        "summary": {
          "score": 0,
          "level": "危险",
          "message": "你陷入了层层套路，最终血本无归。这类诈骗的追回率极低，重在预防！",
          "keyLessons": [
            "任何'解冻费''保证金'都是诈骗，正规机构不会收取",
            "'连单必须做完才能提现'是套牢三连，死循环",
            "止损原则：发现不对，及时退出，已投的钱不要试图'捞回来'",
            "发现被骗后立即报警，不要继续转账哪怕只有一丝'回本'的希望"
          ]
        }
      }
    ]
  },
  {
    "id": "S02",
    "name": "连单陷阱",
    "category": "连单诈骗",
    "description": "完成第一单后要求'连续完成3单才能提现'，逐步套牢",
    "difficulty": 4,
    "estimated_time": 12,
    "stages": [
      {
        "id": "S02-01",
        "name": "撒网-招聘转刷单",
        "type": "chat",
        "duration": 2,
        "messages": [
          {
            "who": "scammer",
            "text": "您好，我们正在招聘手机兼职人员，工作内容简单：给商家作品牌推广（刷好评），时薪80-300元，日结，请问你感兴趣吗？",
            "time": "10:00"
          }
        ],
        "choices": [
          {
            "id": "A",
            "text": "感兴趣，怎么做？",
            "type": "danger",
            "score": 0,
            "tags": [
              "轻信招聘"
            ],
            "next": "S02-02"
          },
          {
            "id": "B",
            "text": "先了解下平台背景和资质",
            "type": "neutral",
            "score": 40,
            "tags": [
              "核实信息"
            ],
            "next": "S02-01-b"
          },
          {
            "id": "C",
            "text": "刷好评是违法的，不做了",
            "type": "safe",
            "score": 100,
            "tags": [
              "识破本质"
            ],
            "next": "S02-end-safe"
          }
        ],
        "riskPoints": [
          {
            "keyword": "招聘转刷单",
            "explanation": "以招聘名义引人上钩，入职后再诱导刷单，伪装性强"
          }
        ]
      },
      {
        "id": "S02-01-b",
        "name": "撒网-核实",
        "type": "chat",
        "duration": 1,
        "messages": [
          {
            "who": "scammer",
            "text": "我们叫'创想科技'，工商备案的，可以查的~ [图片：伪造营业执照]",
            "time": "10:02"
          },
          {
            "who": "scammer",
            "text": "公司做了3年了，不然早被查了，对吧？我们跟某宝某东都有合作的~",
            "time": "10:02"
          }
        ],
        "choices": [
          {
            "id": "A",
            "text": "好的，先做一单试试",
            "type": "danger",
            "score": 10,
            "tags": [
              "接受任务"
            ],
            "next": "S02-02"
          },
          {
            "id": "B",
            "text": "网上查不到这家公司的信息",
            "type": "safe",
            "score": 90,
            "tags": [
              "查证识破"
            ],
            "next": "S02-end-safe"
          },
          {
            "id": "C",
            "text": "问问朋友意见再说",
            "type": "neutral",
            "score": 30,
            "tags": [
              "犹豫"
            ],
            "next": "S02-02"
          }
        ],
        "riskPoints": [
          {
            "keyword": "工商备案",
            "explanation": "骗子可以伪造营业执照，应通过官方渠道核实，不要轻信对方提供的证据"
          }
        ]
      },
      {
        "id": "S02-02",
        "name": "首单成功",
        "type": "chat",
        "duration": 2,
        "messages": [
          {
            "who": "scammer",
            "text": "好的，请打开这个链接下载我们的工作App：[bit.ly/xxx]，注册后我给你发第一单任务~",
            "time": "10:05"
          },
          {
            "who": "scammer",
            "text": "📋【第1单】商品：数码配件，垫付200元，佣金15元，5分钟完成",
            "time": "10:06"
          },
          {
            "who": "scammer",
            "text": "✅ 第1单完成！本金200+佣金15元已到账，请查收微信零钱~",
            "time": "10:12"
          }
        ],
        "choices": [
          {
            "id": "A",
            "text": "好的，来一单500元的",
            "type": "danger",
            "score": 0,
            "tags": [
              "接受复购"
            ],
            "next": "S02-03"
          },
          {
            "id": "B",
            "text": "先把215元提现看看",
            "type": "neutral",
            "score": 30,
            "tags": [
              "试探提现"
            ],
            "next": "S02-02-b"
          },
          {
            "id": "C",
            "text": "今天先到这里，赚了15块也不错",
            "type": "safe",
            "score": 80,
            "tags": [
              "见好就收"
            ],
            "next": "S02-end-safe"
          }
        ],
        "riskPoints": [
          {
            "keyword": "下载非官方App",
            "explanation": "骗子要求下载非官方App是盗取信息的前奏，应从应用商店下载官方应用"
          }
        ]
      },
      {
        "id": "S02-02-b",
        "name": "首单-提现试探",
        "type": "chat",
        "duration": 1,
        "messages": [
          {
            "who": "scammer",
            "text": "提现系统今日维护中，要下午4点才恢复~你先做完今天的任务量，一起结算更方便哦",
            "time": "10:15"
          },
          {
            "who": "scammer",
            "text": "今天任务很充足，做完3单能赚200多块呢，比上班还划算！赶紧的吧~",
            "time": "10:15"
          }
        ],
        "choices": [
          {
            "id": "A",
            "text": "好，继续做第2单",
            "type": "danger",
            "score": 0,
            "tags": [
              "继续任务"
            ],
            "next": "S02-03"
          },
          {
            "id": "B",
            "text": "不行，我现在就要提现215元",
            "type": "neutral",
            "score": 50,
            "tags": [
              "坚持提现"
            ],
            "next": "S02-03"
          },
          {
            "id": "C",
            "text": "这不是正规平台的做法，算了不做了",
            "type": "safe",
            "score": 90,
            "tags": [
              "识破套路"
            ],
            "next": "S02-end-safe"
          }
        ],
        "riskPoints": [
          {
            "keyword": "系统维护",
            "explanation": "骗子用'系统维护'阻止你提现，让你无法验证资金是否真实到账"
          }
        ]
      },
      {
        "id": "S02-03",
        "name": "连单开始",
        "type": "chat",
        "duration": 3,
        "messages": [
          {
            "who": "scammer",
            "text": "📋【第2单任务】\n商品：轻奢女包\n垫付金额：1500元\n佣金：128元\n⏰ 限时8分钟",
            "time": "10:20"
          },
          {
            "who": "scammer",
            "text": "⚠️ 重要提醒：今日任务已升级为【连单模式】，需完成全部3单才能统一结算佣金，中途退出只返还50%本金哦~",
            "time": "10:21"
          }
        ],
        "choices": [
          {
            "id": "A",
            "text": "没问题，马上付1500",
            "type": "danger",
            "score": -10,
            "tags": [
              "继续垫付"
            ],
            "next": "S02-04"
          },
          {
            "id": "B",
            "text": "为什么要做3单才能提现？",
            "type": "neutral",
            "score": 30,
            "tags": [
              "质疑规则"
            ],
            "next": "S02-03-b"
          },
          {
            "id": "C",
            "text": "不做了，我要退出并退款",
            "type": "safe",
            "score": 70,
            "tags": [
              "要求退出"
            ],
            "next": "S02-03-b"
          }
        ],
        "riskPoints": [
          {
            "keyword": "连单模式",
            "explanation": "这是连单陷阱的核心特征，中途退出只返50%本金，迫你继续"
          }
        ]
      },
      {
        "id": "S02-03-b",
        "name": "连单开始-质疑",
        "type": "chat",
        "duration": 2,
        "messages": [
          {
            "who": "scammer",
            "text": "这是平台的统一规定呀，3单一起提交给商家结算，单做的话商家的任务就散了，没法结~",
            "time": "10:23"
          },
          {
            "who": "scammer",
            "text": "而且你都做了一单了，再做两单就能全部结算，加起来有300多块的收益，不做的话太可惜了吧~",
            "time": "10:23"
          },
          {
            "who": "scammer",
            "text": "💡 提示：如果你现在不做第2单，第1单投入的200元只退100元哦，要考虑清楚~",
            "time": "10:23"
          }
        ],
        "choices": [
          {
            "id": "A",
            "text": "好吧，继续做第2单",
            "type": "danger",
            "score": -15,
            "tags": [
              "被迫继续"
            ],
            "next": "S02-04"
          },
          {
            "id": "B",
            "text": "这明显是套路！刷单违法我不做了",
            "type": "safe",
            "score": 90,
            "tags": [
              "识破套路"
            ],
            "next": "S02-end-safe"
          },
          {
            "id": "C",
            "text": "那我只拿回100元退出",
            "type": "neutral",
            "score": 40,
            "tags": [
              "止损退出"
            ],
            "next": "S02-04"
          }
        ],
        "riskPoints": [
          {
            "keyword": "只退50%",
            "explanation": "骗子用'只退50%本金'制造恐惧，让你觉得继续做才划算，这是典型的'沉没成本'陷阱"
          }
        ]
      },
      {
        "id": "S02-04",
        "name": "连环套-第3单",
        "type": "chat",
        "duration": 3,
        "messages": [
          {
            "who": "scammer",
            "text": "✅ 第2单完成！本金1500+佣金128元已到账~",
            "time": "10:30"
          },
          {
            "who": "scammer",
            "text": "🎉 最后一单来了！📋【第3单任务】\n商品：进口保健品\n垫付金额：6800元\n佣金：580元\n⏰ 限时5分钟！再不付款就要重新排队了！",
            "time": "10:31"
          },
          {
            "who": "scammer",
            "text": "做完这单立即结算全部本金+佣金，共7428元！财务11点下班，现在不做今天就白干了！",
            "time": "10:31"
          }
        ],
        "choices": [
          {
            "id": "A",
            "text": "好，马上付6800元！",
            "type": "danger",
            "score": -30,
            "tags": [
              "大额垫付"
            ],
            "next": "S02-05"
          },
          {
            "id": "B",
            "text": "等等，为什么第3单突然变成6800了？",
            "type": "neutral",
            "score": 40,
            "tags": [
              "质疑金额"
            ],
            "next": "S02-05"
          },
          {
            "id": "C",
            "text": "我不做了，把之前的1700还给我",
            "type": "safe",
            "score": 70,
            "tags": [
              "要求退款"
            ],
            "next": "S02-05"
          }
        ],
        "riskPoints": [
          {
            "keyword": "金额暴增",
            "explanation": "从1500跳到6800，4.5倍！骗子在最后一单榨取最大金额，此时你已经深度套牢"
          },
          {
            "keyword": "时间压力",
            "explanation": "'财务下班''今天白干'是经典紧迫感话术，正规兼职不会限时限量逼你转账"
          }
        ]
      },
      {
        "id": "S02-05",
        "name": "连环套-提现失败",
        "type": "chat",
        "duration": 3,
        "messages": [
          {
            "who": "scammer",
            "text": "✅ 第3单完成！正在提交财务结算……",
            "time": "10:35"
          },
          {
            "who": "scammer",
            "text": "⚠️【系统提示】您的账户存在【风控违规】，需先充值8999元'风控保证金'解除风险，5分钟内不处理将永久冻结！",
            "time": "10:36"
          },
          {
            "who": "scammer",
            "text": "💡 提示：缴纳后可直接提现全部余额83127元。您的爱人/同事也在我们平台兼职哦~（暗示知道你个人信息）",
            "time": "10:36"
          }
        ],
        "choices": [
          {
            "id": "A",
            "text": "为了拿回钱，再充8999",
            "type": "danger",
            "score": -40,
            "tags": [
              "继续转账"
            ],
            "next": "S02-06"
          },
          {
            "id": "B",
            "text": "你们怎么知道我爱人的信息？！",
            "type": "neutral",
            "score": 20,
            "tags": [
              "恐慌反应"
            ],
            "next": "S02-06"
          },
          {
            "id": "C",
            "text": "这是无底洞，立刻报警",
            "type": "safe",
            "score": 90,
            "tags": [
              "止损报警"
            ],
            "next": "S02-end-report"
          }
        ],
        "riskPoints": [
          {
            "keyword": "风控保证金",
            "explanation": "任何'保证金''解冻金'都是诈骗，正规机构永不会因提现而收费"
          },
          {
            "keyword": "个人信息威胁",
            "explanation": "骗子掌握你的个人信息是'精准诈骗'，用隐私威胁是心理操控手段"
          }
        ]
      },
      {
        "id": "S02-06",
        "name": "连环套-崩溃边缘",
        "type": "chat",
        "duration": 2,
        "messages": [
          {
            "who": "scammer",
            "text": "😱 不好！系统检测到您的账户已被多地警方关注，需要再缴纳15000元'安全验证金'，否则将冻结全部资金并追究法律责任！",
            "time": "10:40"
          },
          {
            "who": "scammer",
            "text": "⚠️ 这是最后一次机会！再缴一次就能全部提现，否则前面的1700+6800+8999=17508元全部清零！",
            "time": "10:40"
          }
        ],
        "choices": [
          {
            "id": "A",
            "text": "贷款也要继续充钱，不能让前面的钱打水漂",
            "type": "danger",
            "score": -60,
            "tags": [
              "贷款转账"
            ],
            "next": "S02-end-lose"
          },
          {
            "id": "B",
            "text": "你们是诈骗！我要报警！",
            "type": "neutral",
            "score": 40,
            "tags": [
              "意识到被骗"
            ],
            "next": "S02-end-report"
          },
          {
            "id": "C",
            "text": "算了，不要了，就当花钱买个教训",
            "type": "neutral",
            "score": 20,
            "tags": [
              "放弃止损"
            ],
            "next": "S02-end-lose"
          }
        ],
        "riskPoints": [
          {
            "keyword": "贷款转账",
            "explanation": "借贷转账是深度套牢的标志，骗子利用你的绝望和无助继续榨取，永远不要借贷转账"
          }
        ]
      },
      {
        "id": "S02-end-safe",
        "name": "场景结束-安全退出",
        "type": "education",
        "summary": {
          "score": 100,
          "level": "优秀",
          "message": "你完全识破了连单陷阱的套路，选择了安全退出！为你的防骗能力点赞！",
          "keyLessons": [
            "刷单本身就是违法行为，不管骗子怎么包装",
            "连单任务是套牢三连的标准化手法，金额逐级暴增",
            "'只退50%本金'是心理操控，让你觉得'不做更亏'",
            "见好就收，不贪心是防骗的核心原则"
          ]
        }
      },
      {
        "id": "S02-end-report",
        "name": "场景结束-正确报案",
        "type": "education",
        "summary": {
          "score": 55,
          "level": "及格",
          "message": "你在关键时刻选择了报警！但早期有机会识破而没有，损失已经很大。",
          "keyLessons": [
            "连单任务一旦开始，就已经落入陷阱，及时止损是关键",
            "发现被骗后应立即报警，停止转账，保留证据",
            "永远不要借贷转账来'扳本'，那是无底洞",
            "'系统故障''风控'全是套路，正规机构不会因提现收费"
          ]
        }
      },
      {
        "id": "S02-end-lose",
        "name": "场景结束-血本无归",
        "type": "education",
        "summary": {
          "score": 0,
          "level": "极度危险",
          "message": "你经历了完整的连单诈骗陷阱，血本无归。这类诈骗的追回率不足10%，重在预防！",
          "keyLessons": [
            "连单任务是无限循环，一旦开始就被套牢，永不'做完就能提现'",
            "任何'保证金''解冻金''安全验证金'都是诈骗的无限收费借口",
            "贷款转账是深度套牢的信号，此时应及时止损，而不是继续借贷",
            "最重要原则：发现被骗后立即止损报警，不要试图'扳本'"
          ]
        }
      }
    ]
  },
  {
    "id": "S03",
    "name": "虚假招聘平台",
    "category": "招聘诈骗",
    "description": "诈骗分子在招聘平台发布高薪职位，以\"投递简历\"为名收集信息，再诱导下载非法App、充值会员，逐步榨干受害者",
    "difficulty": 4,
    "estimated_time": 12,
    "stages": [
      {
        "id": "S03-01",
        "messages": [
          {
            "who": "bot",
            "text": "📋【高薪兼职 - 急招】在家办公，日赚500+，经验不限！岗位：数据录入员，专门给电商平台补单薪资：日结300-800元要求：手机操作，时间自由有意者请加客服Vx：jx8886",
            "time": "10:02"
          }
        ],
        "choices": [
          {
            "text": "A 这薪资也太好了吧！加微信了解一下",
            "score": 0,
            "next": "S03-02",
            "tags": [
              "冲动报名",
              "轻信招聘"
            ]
          },
          {
            "text": "B 先上网查查这个公司靠不靠谱",
            "score": 90,
            "next": "S03-01-b",
            "tags": [
              "核实信息",
              "识破套路"
            ]
          },
          {
            "text": "C 这么高的工资肯定有诈，不理会",
            "score": 95,
            "next": "S03-end-safe",
            "tags": [
              "识破套路",
              "理性判断"
            ]
          }
        ],
        "riskPoints": [
          {
            "flag": "\"日赚500+\"",
            "explain": "正规招聘不会用\"日赚\"这种说法，薪资范围巨大必有问题"
          },
          {
            "flag": "加Vx联系",
            "explain": "正规招聘不会通过个人微信，都是公司邮箱或招聘平台官方渠道"
          }
        ]
      },
      {
        "id": "S03-01-b",
        "messages": [
          {
            "who": "bot",
            "text": "您已选择核实信息，请先提交简历以便匹配岗位",
            "time": "10:02"
          },
          {
            "who": "bot",
            "text": "客服-小陈：您好！很高兴您对我们岗位有兴趣。请提供姓名、手机号，我帮您注册账号",
            "time": "10:03"
          }
        ],
        "choices": [
          {
            "text": "A 好的，这是我的信息：姓名+手机号",
            "score": 10,
            "next": "S03-02",
            "tags": [
              "填写敏感信息",
              "冲动报名"
            ]
          },
          {
            "text": "B 请问贵公司叫什么名字？我先查一下",
            "score": 80,
            "next": "S03-02",
            "tags": [
              "核实信息",
              "识破套路"
            ]
          },
          {
            "text": "C 不需要了，谢谢，提醒您这是诈骗平台",
            "score": 95,
            "next": "S03-end-safe",
            "tags": [
              "识破套路",
              "理性判断"
            ]
          }
        ],
        "riskPoints": [
          {
            "flag": "提交手机号注册",
            "explain": "收集手机号是为后续精准诈骗或出售个人信息"
          }
        ]
      },
      {
        "id": "S03-02",
        "messages": [
          {
            "who": "bot",
            "text": "客服-小陈：您的简历已收录，现在给您分配任务。【新手任务】为电商平台商品刷好评，操作简单：1.点开指定商品链接2.收藏并加购物车3.截图提交佣金：30元/单",
            "time": "10:08"
          }
        ],
        "choices": [
          {
            "text": "A 好的，马上做！第一个任务是什么？",
            "score": 0,
            "next": "S03-02-b",
            "tags": [
              "冲动报名",
              "接受任务"
            ]
          },
          {
            "text": "B 这个流程跟刷单一样，是违法行为吧？",
            "score": 85,
            "next": "S03-02-b",
            "tags": [
              "质疑垫付",
              "识破套路"
            ]
          },
          {
            "text": "C 先查查这个兼职是不是合法的",
            "score": 90,
            "next": "S03-end-safe",
            "tags": [
              "核实信息",
              "识破套路"
            ]
          }
        ],
        "riskPoints": [
          {
            "flag": "\"刷好评\"",
            "explain": "刷单炒信是违法行为，正规兼职不会明目张胆这样做"
          },
          {
            "flag": "30元/单佣金",
            "explain": "以小金额任务建立信任，为后续大额垫付做铺垫"
          }
        ]
      },
      {
        "id": "S03-02-b",
        "messages": [
          {
            "who": "bot",
            "text": "客服-小陈：很好！您已完成第一单，佣金已存入您的账户！但为了确保您是真实用户，需要先充值99元开通【黄金会员】，成为会员后任务佣金提升至80元/单，且提现秒到账！",
            "time": "10:15"
          }
        ],
        "choices": [
          {
            "text": "A 99元也不多，开了吧！马上充值",
            "score": -20,
            "next": "S03-03",
            "tags": [
              "冲动垫付",
              "继续垫付"
            ]
          },
          {
            "text": "B 等等，为什么要做任务还要先交钱？",
            "score": 85,
            "next": "S03-03",
            "tags": [
              "质疑垫付",
              "识破套路"
            ]
          },
          {
            "text": "C 不充了，我把佣金提出来不做了",
            "score": 80,
            "next": "S03-end-report",
            "tags": [
              "止损意识",
              "要求退款"
            ]
          }
        ],
        "riskPoints": [
          {
            "flag": "充值99元开通会员",
            "explain": "正规兼职不会收取任何费用，一旦交钱就会套牢"
          },
          {
            "flag": "\"佣金翻倍\"",
            "explain": "用收益前景诱导转账，利用沉没成本心理"
          }
        ]
      },
      {
        "id": "S03-03",
        "messages": [
          {
            "who": "bot",
            "text": "【黄金会员已开通】恭喜！您的佣金为80元/单。【正式任务】商品：精品女装，垫付金额：500元，佣金：80元⚠️系统检测您是新用户，需要连续完成3单才能提现",
            "time": "10:22"
          }
        ],
        "choices": [
          {
            "text": "A 500元换80元佣金，感觉不太划算...",
            "score": 60,
            "next": "S03-03-b",
            "tags": [
              "质疑金额",
              "识破异常"
            ]
          },
          {
            "text": "B 好的，做！500元马上转账",
            "score": -10,
            "next": "S03-04",
            "tags": [
              "冲动垫付",
              "继续垫付"
            ]
          },
          {
            "text": "C 请问这个提现规则是哪来的？我要投诉",
            "score": 90,
            "next": "S03-end-report",
            "tags": [
              "质疑规则",
              "止损报警"
            ]
          }
        ],
        "riskPoints": [
          {
            "flag": "\"连续完成3单才能提现\"",
            "explain": "诈骗核心套路！每完成一单后规则会越收越紧"
          },
          {
            "flag": "垫付500元",
            "explain": "相比30元小任务，金额开始大幅攀升"
          }
        ]
      },
      {
        "id": "S03-03-b",
        "messages": [
          {
            "who": "bot",
            "text": "客服-小陈：亲，这个任务百分百赚钱的！而且这个任务特别抢手，名额只剩3个了！错过今天就要等下周了",
            "time": "10:25"
          }
        ],
        "choices": [
          {
            "text": "A 好吧，既然这么多人做，我也试试",
            "score": -10,
            "next": "S03-04",
            "tags": [
              "冲动垫付",
              "贪心"
            ]
          },
          {
            "text": "B 所谓\"其他人\"能给我看看吗？",
            "score": 85,
            "next": "S03-04",
            "tags": [
              "核实信息",
              "识破本质"
            ]
          },
          {
            "text": "C 不对劲，正常的兼职不应该先交钱或垫付",
            "score": 95,
            "next": "S03-end-safe",
            "tags": [
              "识破套路",
              "理性判断"
            ]
          }
        ],
        "riskPoints": [
          {
            "flag": "\"名额只剩3个\"",
            "explain": "利用紧迫感让你不做思考直接转账，是诈骗分子常用手段"
          }
        ]
      },
      {
        "id": "S03-04",
        "messages": [
          {
            "who": "bot",
            "text": "✅ 第一单完成！佣金80元已到账，继续第2单。【第2单】商品：手机充值卡，垫付金额：2000元，佣金：400元⚠️联单任务，必须一次性完成",
            "time": "10:30"
          }
        ],
        "choices": [
          {
            "text": "A 2000元有点多，但我已经做了第一单了...",
            "score": 40,
            "next": "S03-04-b",
            "tags": [
              "沉没成本",
              "质疑金额"
            ]
          },
          {
            "text": "B 佣金400元！这单我做了！",
            "score": -20,
            "next": "S03-04-b",
            "tags": [
              "冲动垫付",
              "贪心"
            ]
          },
          {
            "text": "C 从200元跳到2000元？这不对劲，停止！",
            "score": 90,
            "next": "S03-end-report",
            "tags": [
              "质疑异常",
              "止损报警"
            ]
          }
        ],
        "riskPoints": [
          {
            "flag": "金额从500跳到2000（4倍）",
            "explain": "逐步放大金额，利用\"已投入\"心理继续套牢"
          }
        ]
      },
      {
        "id": "S03-04-b",
        "messages": [
          {
            "who": "bot",
            "text": "✅ 第2单完成！佣金400元已到账，最后一单！【第3单（最后一单）】商品：奢侈品，垫付金额：5000元，佣金：1500元⚠️系统检测到您的账户存在风险，需要再完成一笔风控验证",
            "time": "10:35"
          }
        ],
        "choices": [
          {
            "text": "A 5000元...已经投了这么多了，再做一笔吧",
            "score": -30,
            "next": "S03-05",
            "tags": [
              "沉没成本",
              "继续垫付"
            ]
          },
          {
            "text": "B 风控验证是什么意思？要再充钱吗？",
            "score": 70,
            "next": "S03-05",
            "tags": [
              "质疑异常",
              "识破套路"
            ]
          },
          {
            "text": "C 我要提现！把之前赚的佣金给我！",
            "score": 85,
            "next": "S03-end-report",
            "tags": [
              "坚持提现",
              "止损报警"
            ]
          }
        ],
        "riskPoints": [
          {
            "flag": "\"风控验证\"",
            "explain": "以虚假风控为借口继续榨取，一旦配合就会继续加码"
          }
        ]
      },
      {
        "id": "S03-05",
        "messages": [
          {
            "who": "bot",
            "text": "客服-小陈：风控验证需要您再充值3000元作为【账户解冻金】，充值后秒退还！⚠️若不完成验证，您的账户将被永久冻结，所有佣金无法提现",
            "time": "10:40"
          }
        ],
        "choices": [
          {
            "text": "A 3000元不算多，充了就能全部提现了！",
            "score": -50,
            "next": "S03-end-lose",
            "tags": [
              "冲动垫付",
              "沉没成本"
            ]
          },
          {
            "text": "B 账户冻结？那我之前赚的佣金呢？能先提出来吗？",
            "score": 80,
            "next": "S03-end-lose",
            "tags": [
              "质疑垫付",
              "识破套路"
            ]
          },
          {
            "text": "C 这是诈骗！我要报警！",
            "score": 95,
            "next": "S03-end-report",
            "tags": [
              "止损报警",
              "正确报警"
            ]
          }
        ],
        "riskPoints": [
          {
            "flag": "\"充值后退还\"",
            "explain": "永远不会有任何退款，只会有更多借口要求继续转账"
          }
        ]
      },
      {
        "id": "S03-end-safe",
        "messages": [
          {
            "who": "bot",
            "text": "🎓 恭喜您安全退出！您成功识别了虚假招聘的套路，没有落入陷阱。",
            "time": ""
          }
        ],
        "choices": [],
        "riskPoints": [],
        "summary": {
          "message": "您在【虚假招聘平台】场景中获得满分评价！面对高薪诱惑，您选择了核实信息、冷静判断，成功避开了所有诈骗陷阱！",
          "keyLessons": [
            "正规招聘不会收取任何费用（押金、保证金、会员费）",
            "高薪低门槛是典型诈骗特征",
            "不要绕过正规招聘平台私下加微信联系",
            "永远不要先垫付任何款项，真正的兼职是完成后收款而非付款",
            "遭遇诈骗请立即报警"
          ]
        }
      },
      {
        "id": "S03-end-report",
        "messages": [
          {
            "who": "bot",
            "text": "🚨 您选择了止损报警！您付出了初步代价但及时醒悟并报警处理。",
            "time": ""
          }
        ],
        "choices": [],
        "riskPoints": [],
        "summary": {
          "message": "您蒙受了一定损失，但您做出了明智的决定——停止转账并选择报警。诈骗分子正是利用\"不甘心\"心理让受害者越陷越深。",
          "keyLessons": [
            "一旦发现需要垫付，立刻停止是最优策略",
            "报警是正确的选择",
            "保留所有聊天记录和转账凭证",
            "不要尝试自己去联系对方\"讲道理\"",
            "心理上的\"不甘心\"是诈骗利用的核心"
          ]
        }
      },
      {
        "id": "S03-end-lose",
        "messages": [
          {
            "who": "bot",
            "text": "💸 您经历了完整的虚假招聘诈骗陷阱，资金全部损失。",
            "time": ""
          }
        ],
        "choices": [],
        "riskPoints": [],
        "summary": {
          "message": "您经历了从【报名→充值会员→做任务→联单套牢→解冻金】的完整诈骗流程。高薪诱惑→小利获信任→逐步加大投入→无限收割。",
          "keyLessons": [
            "所有先收钱后做任务的模式都是诈骗，没有例外",
            "刷单本身就是违法行为",
            "诈骗平台会修改规则持续榨取",
            "发现被骗后第一时间报警，不要联系对方或继续转账"
          ]
        }
      }
    ]
  },
  {
    "id": "S04",
    "name": "高佣返利单",
    "category": "高佣诈骗",
    "description": "宣称30%-50%佣金诱导大额投入，前几单返利后突然消失",
    "difficulty": 4,
    "estimated_time": 8,
    "stages": [
      {
        "id": "S04-01",
        "name": "撒网-高佣诱惑",
        "type": "chat",
        "duration": 2,
        "messages": [
          {
            "who": "scammer",
            "text": "🔥 【紧急招募】唯品会商家联盟刷单员！\n佣金比例：订单金额的30%-50%！\n日赚500-3000元，名额有限！",
            "time": "09:15"
          },
          {
            "who": "scammer",
            "text": "无需经验，手机操作，一单3-15分钟，佣金立返！感兴趣的赶紧报名，名额仅剩12个！",
            "time": "09:15"
          }
        ],
        "choices": [
          {
            "id": "A",
            "text": "佣金50%？这么高！赶紧报名！",
            "type": "danger",
            "score": 0,
            "tags": [
              "贪心"
            ],
            "next": "S04-02"
          },
          {
            "id": "B",
            "text": "先查查这个平台有没有负面信息",
            "type": "neutral",
            "score": 50,
            "tags": [
              "核实"
            ],
            "next": "S04-01-b"
          },
          {
            "id": "C",
            "text": "50%佣金不可能，这不是诈骗吧？",
            "type": "safe",
            "score": 90,
            "tags": [
              "识破本质"
            ],
            "next": "S04-end-safe"
          }
        ],
        "riskPoints": [
          {
            "keyword": "30%-50%佣金",
            "explanation": "超高佣金是典型诱饵，正常电商刷单佣金只有3%-8%，超过这个比例必有诈"
          },
          {
            "keyword": "名额有限",
            "explanation": "利用稀缺感制造紧迫，让你快速决策不思考"
          }
        ]
      },
      {
        "id": "S04-01-b",
        "name": "核实阶段",
        "type": "chat",
        "duration": 1,
        "messages": [
          {
            "who": "scammer",
            "text": "我们和唯品会、京东、拼多多都有合作的，官方授权！[图片：伪造合作证书]",
            "time": "09:17"
          },
          {
            "who": "scammer",
            "text": "而且现在是平台周年庆，佣金比例翻倍！错过就没有了！你还要犹豫吗？",
            "time": "09:17"
          }
        ],
        "choices": [
          {
            "id": "A",
            "text": "好的，名额有限，我先报名！",
            "type": "danger",
            "score": 10,
            "tags": [
              "冲动报名"
            ],
            "next": "S04-02"
          },
          {
            "id": "B",
            "text": "合作证书可以伪造，官方查不到，算了",
            "type": "safe",
            "score": 95,
            "tags": [
              "识破伪造"
            ],
            "next": "S04-end-safe"
          },
          {
            "id": "C",
            "text": "50%佣金太高了，不合理，我不做了",
            "type": "safe",
            "score": 90,
            "tags": [
              "理性判断"
            ],
            "next": "S04-end-safe"
          }
        ],
        "riskPoints": [
          {
            "keyword": "周年庆翻倍",
            "explanation": "骗子爱用节日噱头制造虚假紧迫感，让受害者来不及思考"
          }
        ]
      },
      {
        "id": "S04-02",
        "name": "首单试用",
        "type": "chat",
        "duration": 2,
        "messages": [
          {
            "who": "scammer",
            "text": "✅ 恭喜报名成功！你的首单任务来了~\n📋【试单任务】\n商品：轻奢女包\n垫付金额：500元\n佣金：250元（50%）\n完成后本金+佣金立即返现！",
            "time": "09:20"
          },
          {
            "who": "scammer",
            "text": "⚠️ 首单佣金由公司补贴，限时30分钟！超过时间任务会自动取消哦~",
            "time": "09:20"
          }
        ],
        "choices": [
          {
            "id": "A",
            "text": "这么高佣金！马上下单！",
            "type": "danger",
            "score": 0,
            "tags": [
              "冲动垫付"
            ],
            "next": "S04-02-b"
          },
          {
            "id": "B",
            "text": "等等，为什么佣金比本金还高？",
            "type": "neutral",
            "score": 60,
            "tags": [
              "质疑异常"
            ],
            "next": "S04-02-b"
          },
          {
            "id": "C",
            "text": "佣金250元？这比本金还高，不合理！",
            "type": "safe",
            "score": 90,
            "tags": [
              "识破异常"
            ],
            "next": "S04-end-safe"
          }
        ],
        "riskPoints": [
          {
            "keyword": "佣金比本金高",
            "explanation": "佣金250元比垫付本金500元还高出一半，正常商业逻辑不可能，100%是诈骗"
          }
        ]
      },
      {
        "id": "S04-02-b",
        "name": "首单返利",
        "type": "chat",
        "duration": 2,
        "messages": [
          {
            "who": "scammer",
            "text": "✅ 试单完成！本金500元+佣金250元已返到你的账户，请查收！💰",
            "time": "09:25"
          },
          {
            "who": "scammer",
            "text": "🎉 感觉怎么样？这只是首单优惠！接下来正式任务佣金更炸裂，30%-50%日结！",
            "time": "09:25"
          }
        ],
        "choices": [
          {
            "id": "A",
            "text": "好的，来一单2000元的试试！",
            "type": "danger",
            "score": -10,
            "tags": [
              "加大投入"
            ],
            "next": "S04-03"
          },
          {
            "id": "B",
            "text": "先把750元提现到账看看",
            "type": "neutral",
            "score": 30,
            "tags": [
              "试探"
            ],
            "next": "S04-02-c"
          },
          {
            "id": "C",
            "text": "赚钱了！见好就收，今天不做了",
            "type": "safe",
            "score": 85,
            "tags": [
              "见好就收"
            ],
            "next": "S04-end-safe"
          }
        ],
        "riskPoints": [
          {
            "keyword": "首单返利",
            "explanation": "骗子用你的750元建立信任，为后续大额诈骗铺路，小利是诱饵"
          }
        ]
      },
      {
        "id": "S04-02-c",
        "name": "提现试探",
        "type": "chat",
        "duration": 1,
        "messages": [
          {
            "who": "scammer",
            "text": "提现系统升级中，明早10点恢复~\n今天的任务特别多，再做两单佣金能到4000+元哦！",
            "time": "09:28"
          }
        ],
        "choices": [
          {
            "id": "A",
            "text": "好，那继续做2000元的任务",
            "type": "danger",
            "score": -5,
            "tags": [
              "继续垫付"
            ],
            "next": "S04-03"
          },
          {
            "id": "B",
            "text": "为什么不能马上到账？这不正常",
            "type": "safe",
            "score": 80,
            "tags": [
              "识破套路"
            ],
            "next": "S04-end-safe"
          },
          {
            "id": "C",
            "text": "算了，先不做了，等明天到账再说",
            "type": "neutral",
            "score": 40,
            "tags": [
              "等待观望"
            ],
            "next": "S04-03"
          }
        ],
        "riskPoints": [
          {
            "keyword": "系统升级",
            "explanation": "骗子用系统升级阻止提现，目的是让你无法验证资金是否真实到账"
          }
        ]
      },
      {
        "id": "S04-03",
        "name": "正式套牢",
        "type": "chat",
        "duration": 3,
        "messages": [
          {
            "who": "scammer",
            "text": "📋【正式任务】\n商品：高档名表\n垫付金额：8000元\n佣金：4000元（50%）\n⚠️ 系统检测到你是VIP用户，额外奖励800元！",
            "time": "09:35"
          },
          {
            "who": "scammer",
            "text": "⏰ 限时20分钟！财务那边名额紧张，再不付款就要等下周了！",
            "time": "09:35"
          }
        ],
        "choices": [
          {
            "id": "A",
            "text": "8000元换4000佣金？太划算了！马上付！",
            "type": "danger",
            "score": -20,
            "tags": [
              "大额垫付"
            ],
            "next": "S04-04"
          },
          {
            "id": "B",
            "text": "等等，为什么突然变成8000元了？",
            "type": "neutral",
            "score": 40,
            "tags": [
              "质疑金额"
            ],
            "next": "S04-04"
          },
          {
            "id": "C",
            "text": "这不对！佣金4000比本金的一半还多！",
            "type": "safe",
            "score": 85,
            "tags": [
              "识破异常"
            ],
            "next": "S04-end-safe"
          }
        ],
        "riskPoints": [
          {
            "keyword": "金额暴增",
            "explanation": "从500元跳到8000元，16倍！最后一单榨取最大金额是标准收割手法"
          },
          {
            "keyword": "VIP额外奖励",
            "explanation": "骗子用虚假身份（VIP）制造特殊感，让你觉得自己被选中，增加信任和投入"
          }
        ]
      },
      {
        "id": "S04-04",
        "name": "收割开始",
        "type": "chat",
        "duration": 2,
        "messages": [
          {
            "who": "scammer",
            "text": "✅ 任务完成！正在处理佣金结算……",
            "time": "09:42"
          },
          {
            "who": "scammer",
            "text": "⚠️【风控提示】系统检测到你的账户存在异常操作，需要补缴20%'风控保证金'（1600元）才能激活提现！",
            "time": "09:43"
          },
          {
            "who": "scammer",
            "text": "💡 提示：缴纳后一次性到账12400元（本金8000+佣金4000+保证金1600）",
            "time": "09:43"
          }
        ],
        "choices": [
          {
            "id": "A",
            "text": "为了拿回钱，再充1600元",
            "type": "danger",
            "score": -30,
            "tags": [
              "继续转账"
            ],
            "next": "S04-05"
          },
          {
            "id": "B",
            "text": "这明显是连环套！不充了，报警！",
            "type": "safe",
            "score": 85,
            "tags": [
              "止损报警"
            ],
            "next": "S04-end-report"
          },
          {
            "id": "C",
            "text": "佣金8000加本金才4800，你们怎么算的？",
            "type": "neutral",
            "score": 40,
            "tags": [
              "质疑计算"
            ],
            "next": "S04-05"
          }
        ],
        "riskPoints": [
          {
            "keyword": "风控保证金",
            "explanation": "任何以风控名义收取的保证金都是诈骗，正规平台不会因提现而收费"
          }
        ]
      },
      {
        "id": "S04-05",
        "name": "收割继续",
        "type": "chat",
        "duration": 2,
        "messages": [
          {
            "who": "scammer",
            "text": "😱 系统检测到你的账户已被多个商家同时访问，涉嫌套现！\n需要再充值10000元'数据修复费'，否则全部资金冻结！",
            "time": "09:48"
          },
          {
            "who": "scammer",
            "text": "⚠️ 再缴一次就能全部解冻提现！如果不处理，前面投入的9600元全部清零！",
            "time": "09:48"
          }
        ],
        "choices": [
          {
            "id": "A",
            "text": "借钱也要继续充，不能让前面的钱打水漂",
            "type": "danger",
            "score": -50,
            "tags": [
              "贷款转账"
            ],
            "next": "S04-end-lose"
          },
          {
            "id": "B",
            "text": "这完全是无底洞！立刻报警！",
            "type": "safe",
            "score": 80,
            "tags": [
              "止损觉醒"
            ],
            "next": "S04-end-report"
          },
          {
            "id": "C",
            "text": "算了不要了，当花钱买教训",
            "type": "neutral",
            "score": 20,
            "tags": [
              "放弃止损"
            ],
            "next": "S04-end-lose"
          }
        ],
        "riskPoints": [
          {
            "keyword": "无底洞",
            "explanation": "骗子会无限叠加费用，直到你拿不出钱，永远不要借贷转账"
          }
        ]
      },
      {
        "id": "S04-end-safe",
        "name": "场景结束-安全退出",
        "type": "education",
        "summary": {
          "score": 100,
          "level": "优秀",
          "message": "你成功识别了高佣返利诈骗的套路，没有被超高佣金迷惑！",
          "keyLessons": [
            "佣金超过10%的刷单任务必有诈，正常刷单佣金只有3%-8%",
            "佣金比本金还高的订单100%是诈骗，没有商业逻辑支撑",
            "骗子用首单小利建立信任后，在正式任务中大额收割",
            "发现任何'风控''保证金'都是诈骗的明确信号"
          ]
        }
      },
      {
        "id": "S04-end-report",
        "name": "场景结束-正确报案",
        "type": "education",
        "summary": {
          "score": 55,
          "level": "及格",
          "message": "你在关键时刻选择了报警止损！但前期已经投入了资金。",
          "keyLessons": [
            "发现被骗后应立即止损报警，不要试图用更多的钱'扳本'",
            "任何要求追加费用才能提现的都是诈骗套路",
            "保留聊天记录和转账凭证，是报案的必要材料"
          ]
        }
      },
      {
        "id": "S04-end-lose",
        "name": "场景结束-血本无归",
        "type": "education",
        "summary": {
          "score": 0,
          "level": "极度危险",
          "message": "你经历了完整的高佣返利诈骗陷阱，血本无归。高佣金是最大的诱饵，也是最危险的信号！",
          "keyLessons": [
            "超过10%佣金的刷单任务100%是诈骗",
            "首单返利是小利，用来建立信任才是骗子的真正目的",
            "任何'保证金''风控金''解冻费'都是诈骗的无底洞",
            "发现被骗后立即止损报警，借贷转账只会让损失更大"
          ]
        }
      }
    ]
  },
  {
    "id": "S05",
    "name": "扫码认证单",
    "category": "扫码诈骗",
    "description": "要求扫码认证身份实为盗刷，或诱导下载非法App盗取信息",
    "difficulty": 5,
    "estimated_time": 7,
    "stages": [
      {
        "id": "S05-01",
        "name": "撒网-快递丢失",
        "type": "chat",
        "duration": 2,
        "messages": [
          {
            "who": "scammer",
            "text": "📦 【物流通知】您的快递单号SF12345678在运输中丢失，商家赔偿199元，点击链接填写信息领取：\n[bit.ly/ems_auth]",
            "time": "11:22"
          }
        ],
        "choices": [
          {
            "id": "A",
            "text": "快递丢了正好，还有赔偿，点链接看看",
            "type": "danger",
            "score": 0,
            "tags": [
              "轻信短信"
            ],
            "next": "S05-02"
          },
          {
            "id": "B",
            "text": "先查查快递单号是不是真的",
            "type": "neutral",
            "score": 50,
            "tags": [
              "核实单号"
            ],
            "next": "S05-01-b"
          },
          {
            "id": "C",
            "text": "陌生链接不点，直接去电商平台查物流",
            "type": "safe",
            "score": 100,
            "tags": [
              "主动核实"
            ],
            "next": "S05-end-safe"
          }
        ],
        "riskPoints": [
          {
            "keyword": "陌生链接",
            "explanation": "陌生短信中的链接是经典钓鱼手法，快递信息应以官方平台查询为准"
          },
          {
            "keyword": "赔偿诱惑",
            "explanation": "利用赔偿诱惑降低警惕，让你在急切中点击钓鱼链接"
          }
        ]
      },
      {
        "id": "S05-01-b",
        "name": "核实阶段",
        "type": "chat",
        "duration": 1,
        "messages": [
          {
            "who": "scammer",
            "text": "亲，链接已经发给你了呀，点击就能领取，很简单的！几分钟就搞定~",
            "time": "11:24"
          },
          {
            "who": "scammer",
            "text": "而且赔偿限时48小时，过期就作废了！你快点哦~",
            "time": "11:24"
          }
        ],
        "choices": [
          {
            "id": "A",
            "text": "好吧，那我点开看看",
            "type": "danger",
            "score": 10,
            "tags": [
              "冲动点击"
            ],
            "next": "S05-02"
          },
          {
            "id": "B",
            "text": "快递单号都能说出来，为什么要我点陌生链接？",
            "type": "safe",
            "score": 90,
            "tags": [
              "识破话术"
            ],
            "next": "S05-end-safe"
          },
          {
            "id": "C",
            "text": "去快递公司官网查了，没有丢件，算了",
            "type": "safe",
            "score": 95,
            "tags": [
              "主动核实"
            ],
            "next": "S05-end-safe"
          }
        ],
        "riskPoints": [
          {
            "keyword": "限时48小时",
            "explanation": "骗子制造时间紧迫感，让你没有思考时间就做出决定"
          }
        ]
      },
      {
        "id": "S05-02",
        "name": "钓鱼页面",
        "type": "chat",
        "duration": 2,
        "messages": [
          {
            "who": "scammer",
            "text": "🔗 【电商理赔中心】\n尊敬的用户您好，您的快递丢失已核实，请点击下方链接完成身份认证，领取199元赔偿金\n[bit.ly/ems_auth]",
            "time": "11:26"
          },
          {
            "who": "scammer",
            "text": "📋 需要填写的信息：\n① 姓名\n② 身份证号\n③ 银行卡号\n④ 手机号码\n⑤ 验证码（用于验证身份）",
            "time": "11:26"
          }
        ],
        "choices": [
          {
            "id": "A",
            "text": "好的，赔偿金嘛，填信息领钱",
            "type": "danger",
            "score": 0,
            "tags": [
              "填写敏感信息"
            ],
            "next": "S05-03"
          },
          {
            "id": "B",
            "text": "为什么要银行卡号和验证码？太可疑了",
            "type": "safe",
            "score": 90,
            "tags": [
              "质疑权限"
            ],
            "next": "S05-end-safe"
          },
          {
            "id": "C",
            "text": "验证码只能自己收到，你们不会登录我的账户吧？",
            "type": "neutral",
            "score": 60,
            "tags": [
              "质疑安全"
            ],
            "next": "S05-03"
          }
        ],
        "riskPoints": [
          {
            "keyword": "身份证号",
            "explanation": "收集身份证号是精准诈骗和个人信息倒卖的前奏，正规赔偿不需要身份证"
          },
          {
            "keyword": "验证码",
            "explanation": "验证码等于授权！骗子要验证码就是要登录你的账户转账，绝对不能给"
          }
        ]
      },
      {
        "id": "S05-03",
        "name": "信息提交",
        "type": "chat",
        "duration": 2,
        "messages": [
          {
            "who": "scammer",
            "text": "✅ 身份认证成功！赔偿金199元已发送到您的账户，请提供验证码确认开卡，稍后到账~",
            "time": "11:30"
          },
          {
            "who": "scammer",
            "text": "⚠️ 验证码：658942，有效期5分钟，请勿泄露！",
            "time": "11:30"
          }
        ],
        "choices": [
          {
            "id": "A",
            "text": "好的，验证码是658942",
            "type": "danger",
            "score": 0,
            "tags": [
              "泄露验证码"
            ],
            "next": "S05-04"
          },
          {
            "id": "B",
            "text": "等等！你们怎么知道我的手机号发送验证码？",
            "type": "safe",
            "score": 80,
            "tags": [
              "识破操作"
            ],
            "next": "S05-04"
          },
          {
            "id": "C",
            "text": "我从来没在任何地方提供过手机号，怎么回事？",
            "type": "neutral",
            "score": 40,
            "tags": [
              "质疑来源"
            ],
            "next": "S05-04"
          }
        ],
        "riskPoints": [
          {
            "keyword": "验证码",
            "explanation": "骗子用你的信息自己注册账户，验证码是用来绑定银行卡授权转账的，绝对不能给"
          }
        ]
      },
      {
        "id": "S05-04",
        "name": "盗刷发生",
        "type": "chat",
        "duration": 2,
        "messages": [
          {
            "who": "scammer",
            "text": "😱 不好！系统检测到您的账户涉嫌'羊毛党'，已自动绑定银行卡为【消费通道】！",
            "time": "11:35"
          },
          {
            "who": "scammer",
            "text": "💰 需要5000元'风控验证金'解除绑定，否则名下的银行卡将被自动扣款1999元×12期！\n⏰ 5分钟内不处理，名下所有银行卡将被冻结！",
            "time": "11:35"
          }
        ],
        "choices": [
          {
            "id": "A",
            "text": "为了银行卡安全，先充5000元'验证金'",
            "type": "danger",
            "score": -40,
            "tags": [
              "继续转账"
            ],
            "next": "S05-05"
          },
          {
            "id": "B",
            "text": "这是诈骗！我银行卡里没有钱，验证码给你们也没用！",
            "type": "safe",
            "score": 85,
            "tags": [
              "识破套路"
            ],
            "next": "S05-end-safe"
          },
          {
            "id": "C",
            "text": "立刻报警！",
            "type": "safe",
            "score": 90,
            "tags": [
              "止损报警"
            ],
            "next": "S05-end-report"
          }
        ],
        "riskPoints": [
          {
            "keyword": "验证码泄露",
            "explanation": "泄露验证码后，骗子可以控制你的账户，绑卡、转账、改密码全部可以操作"
          },
          {
            "keyword": "自动扣款威胁",
            "explanation": "骗子用虚假自动扣款威胁制造恐惧，逼你转账，永远不要被恐吓支配"
          }
        ]
      },
      {
        "id": "S05-05",
        "name": "连环套",
        "type": "chat",
        "duration": 2,
        "messages": [
          {
            "who": "scammer",
            "text": "✅ 验证金已收到！正在处理解除绑定……",
            "time": "11:40"
          },
          {
            "who": "scammer",
            "text": "😱 不好！系统检测到你的账户被【多个风控网点】同时标记，需要再充值20000元'数据修复费'，否则所有绑定账户将被强制扣款！",
            "time": "11:41"
          }
        ],
        "choices": [
          {
            "id": "A",
            "text": "贷款借钱也要继续充！不能让前面的钱打水漂",
            "type": "danger",
            "score": -60,
            "tags": [
              "贷款转账"
            ],
            "next": "S05-end-lose"
          },
          {
            "id": "B",
            "text": "这是无底洞！我已经报警了！",
            "type": "safe",
            "score": 80,
            "tags": [
              "止损觉醒"
            ],
            "next": "S05-end-report"
          },
          {
            "id": "C",
            "text": "不要再继续了，我就当花钱买教训",
            "type": "neutral",
            "score": 20,
            "tags": [
              "放弃止损"
            ],
            "next": "S05-end-lose"
          }
        ],
        "riskPoints": [
          {
            "keyword": "无底洞",
            "explanation": "骗子会无限叠加'修复费''保证金'，直到你再也拿不出钱，借贷只会让损失更大"
          }
        ]
      },
      {
        "id": "S05-end-safe",
        "name": "场景结束-安全退出",
        "type": "education",
        "summary": {
          "score": 100,
          "level": "优秀",
          "message": "你成功识破了扫码认证诈骗的所有套路，没有泄露任何敏感信息！",
          "keyLessons": [
            "陌生链接不点击，快递信息以官方平台查询为准",
            "身份证号、银行卡号、验证码是最高敏感信息，绝对不能透露给陌生人",
            "验证码等于授权，等于把钱交给骗子",
            "快递赔偿、平台退款不需要提供敏感信息，正规流程在官方平台操作"
          ]
        }
      },
      {
        "id": "S05-end-report",
        "name": "场景结束-正确报案",
        "type": "education",
        "summary": {
          "score": 50,
          "level": "需加强",
          "message": "你在关键时刻选择了报警！但已经泄露了重要信息。",
          "keyLessons": [
            "验证码一旦泄露，账户就可能被控制，应立即致电银行冻结卡片",
            "发现被骗后应立即联系银行冻结账户，阻止进一步转账",
            "报警+银行冻结双管齐下，才能最大限度减少损失"
          ]
        }
      },
      {
        "id": "S05-end-lose",
        "name": "场景结束-血本无归",
        "type": "education",
        "summary": {
          "score": 0,
          "level": "极度危险",
          "message": "你经历了完整的扫码认证诈骗陷阱，信息泄露+资金被盗。这类诈骗追回率极低，重在预防！",
          "keyLessons": [
            "陌生链接不点、验证码不给、敏感信息不透露是防骗的三条铁律",
            "验证码=授权=钱被盗，绝对不能给任何人",
            "发现信息泄露后应立即冻结银行卡，而不只是报警",
            "诈骗让你转账的每一分钱都可能是无底洞的入口"
          ]
        }
      }
    ]
  },
  {
    "id": "S06",
    "name": "假冒熟人诈骗",
    "category": "冒充诈骗",
    "description": "诈骗分子盗取熟人社交账号或直接拨打电话，冒充亲友遇险借钱，利用信任和紧急情况施压，诱导转账",
    "difficulty": 5,
    "estimated_time": 10,
    "stages": [
      {
        "id": "S06-01",
        "messages": [
          {
            "who": "bot",
            "text": "📱 微信消息 - 老同学张明：在吗？有点急事想找你帮忙，能借我500块钱吗？明天还你，真的很急！",
            "time": "14:23"
          }
        ],
        "choices": [
          {
            "text": "A 张明？！怎么了？出什么事了？马上转！",
            "score": 0,
            "next": "S06-02",
            "tags": [
              "轻信熟人",
              "冲动转账"
            ]
          },
          {
            "text": "B 什么问题？你先说清楚我看看",
            "score": 50,
            "next": "S06-02",
            "tags": [
              "核实身份",
              "试探"
            ]
          },
          {
            "text": "C 这是你本人吗？打个语音确认一下",
            "score": 90,
            "next": "S06-01-b",
            "tags": [
              "核实身份",
              "识破伪装"
            ]
          }
        ],
        "riskPoints": [
          {
            "flag": "\"急事\"+\"借钱\"",
            "explain": "诈骗分子利用熟人的信任关系和紧急感，跳过核实直接索要金钱"
          }
        ]
      },
      {
        "id": "S06-01-b",
        "messages": [
          {
            "who": "bot",
            "text": "📱 微信消息 - 老同学张明：啊，我现在不太方便接语音...你知道男人的面子问题，我不想让我老婆知道",
            "time": "14:24"
          },
          {
            "who": "bot",
            "text": "真的就500，先转我一下，我明天ATM直接转你，不用微信也行",
            "time": "14:24"
          }
        ],
        "choices": [
          {
            "text": "A 好吧...虽然感觉怪怪的，但还是转给你吧",
            "score": -10,
            "next": "S06-02",
            "tags": [
              "轻信熟人",
              "冲动转账"
            ]
          },
          {
            "text": "B 我还是给你打电话确认一下吧，安全第一",
            "score": 95,
            "next": "S06-end-safe",
            "tags": [
              "核实身份",
              "理性判断"
            ]
          },
          {
            "text": "C 我直接去你家找你，当面说",
            "score": 90,
            "next": "S06-end-safe",
            "tags": [
              "核实身份",
              "理性判断"
            ]
          }
        ],
        "riskPoints": [
          {
            "flag": "\"不方便接语音\"",
            "explain": "诈骗分子找借口拒绝视频/语音验证，因为声音和视频会暴露身份"
          },
          {
            "flag": "\"不用微信也行\"",
            "explain": "引导绕过有转账记录的平台，改用无法追踪的方式汇款"
          }
        ]
      },
      {
        "id": "S06-02",
        "messages": [
          {
            "who": "bot",
            "text": "📱 微信消息 - 老同学张明：谢谢你！收到了，我明天一定还你！对了，还有件事...我手机被偷了，这个是我新号，旧号暂时用不了，你存一下",
            "time": "14:26"
          }
        ],
        "choices": [
          {
            "text": "A 好的，已转500，注意查收",
            "score": -5,
            "next": "S06-03",
            "tags": [
              "冲动转账",
              "继续垫付"
            ]
          },
          {
            "text": "B 等一下，旧号为什么用不了？出了什么事？",
            "score": 40,
            "next": "S06-03",
            "tags": [
              "核实身份",
              "质疑异常"
            ]
          },
          {
            "text": "C 不对，你刚说急事，现在又说手机被偷，到底怎么了？",
            "score": 80,
            "next": "S06-03",
            "tags": [
              "识破伪装",
              "理性判断"
            ]
          }
        ],
        "riskPoints": [
          {
            "flag": "\"手机被偷\"+\"新号\"",
            "explain": "诈骗分子常用\"手机坏了/被偷\"作为借口解释无法通过原号联系，同时诱导存新号方便后续联系"
          }
        ]
      },
      {
        "id": "S06-03",
        "messages": [
          {
            "who": "bot",
            "text": "📱 微信消息 - 老同学张明：其实...我遇到点麻烦...我在陪人打牌，被摄像头拍到了，他们要告我诈骗，要私了就要5000块，否则就报警",
            "time": "14:30"
          },
          {
            "who": "bot",
            "text": "我不想让家里人知道，你能不能再借我4500，帮我度过这关？求你了，明天一起还你",
            "time": "14:30"
          }
        ],
        "choices": [
          {
            "text": "A 天哪...你先别慌，我马上转！不要报警",
            "score": -30,
            "next": "S06-04",
            "tags": [
              "轻信熟人",
              "冲动转账",
              "恐慌反应"
            ]
          },
          {
            "text": "B 打牌被抓？这是违法的事，你为什么不报警？",
            "score": 70,
            "next": "S06-04",
            "tags": [
              "质疑异常",
              "识破伪装"
            ]
          },
          {
            "text": "C 我现在就给你原号打电话，确认是你本人",
            "score": 90,
            "next": "S06-end-report",
            "tags": [
              "核实身份",
              "止损意识"
            ]
          }
        ],
        "riskPoints": [
          {
            "flag": "\"打牌被抓\"+\"私了5000元\"",
            "explain": "典型的\"仙人跳\"变种，利用熟人的羞耻感施压，一次比一次金额大"
          },
          {
            "flag": "\"不要报警\"",
            "explain": "骗子会让你产生犯罪感或恐惧，让你不愿报警，这是控制手段"
          }
        ]
      },
      {
        "id": "S06-04",
        "messages": [
          {
            "who": "bot",
            "text": "📱 微信消息 - 老同学张明：真的谢谢你！你是我的救星！（你转账了4500元）",
            "time": "14:35"
          },
          {
            "who": "bot",
            "text": "📱 微信消息 - 老同学张明：收到了！太感谢你了！你放心，我明天绝对还你！",
            "time": "14:36"
          }
        ],
        "choices": [
          {
            "text": "A 人没事就好，钱不急，你慢慢还",
            "score": -30,
            "next": "S06-05",
            "tags": [
              "冲动转账",
              "沉没成本"
            ]
          },
          {
            "text": "B 你到底遇到了什么事？要不要我帮你报警？",
            "score": 60,
            "next": "S06-05",
            "tags": [
              "质疑异常",
              "止损意识"
            ]
          },
          {
            "text": "C 我觉得哪里不对...我要给你原号打电话了",
            "score": 90,
            "next": "S06-end-report",
            "tags": [
              "核实身份",
              "止损意识"
            ]
          }
        ],
        "riskPoints": [
          {
            "flag": "第二笔转账",
            "explain": "骗子会在第一笔成功后继续联系，用各种借口二次索要"
          }
        ]
      },
      {
        "id": "S06-05",
        "messages": [
          {
            "who": "bot",
            "text": "📱 微信消息 - 老同学张明：兄弟...还有一件事，我老婆发现了...她说要查我账，需要再转8000给她才能平息，否则她要查我所有转账记录",
            "time": "15:02"
          },
          {
            "who": "bot",
            "text": "求你了最后一次，以后再也不借了，8000我后天一定还你！",
            "time": "15:02"
          }
        ],
        "choices": [
          {
            "text": "A 8000？我手头紧，先给你4000吧...",
            "score": -40,
            "next": "S06-end-lose",
            "tags": [
              "冲动转账",
              "沉没成本",
              "继续垫付"
            ]
          },
          {
            "text": "B 我已经借了你5000了，你自己去贷款吧",
            "score": 85,
            "next": "S06-end-report",
            "tags": [
              "止损意识",
              "质疑规则"
            ]
          },
          {
            "text": "C 这肯定有问题，我现在就联系你家人确认！",
            "score": 95,
            "next": "S06-end-report",
            "tags": [
              "核实身份",
              "止损意识",
              "正确报警"
            ]
          }
        ],
        "riskPoints": [
          {
            "flag": "8000元第三笔",
            "explain": "典型的\"逐级加码\"诈骗，每借一笔就用新的\"危机\"要求更多"
          },
          {
            "flag": "\"最后一次\"",
            "explain": "骗子永远会说\"最后一次\"，但实际上只要受害者还愿意转，就不会有结束"
          }
        ]
      },
      {
        "id": "S06-end-safe",
        "messages": [
          {
            "who": "bot",
            "text": "🎓 恭喜您识破了假冒熟人诈骗！没有转账，成功保护了资金安全！",
            "time": ""
          }
        ],
        "choices": [],
        "riskPoints": [],
        "summary": {
          "message": "在【假冒熟人】场景中，您采取了正确的防范措施——通过电话或当面核实身份，没有被\"紧急\"借口蒙蔽！",
          "keyLessons": [
            "任何紧急借钱要求，必须通过原号电话或视频核实对方身份",
            "盗号诈骗高发，社交账号不代表本人",
            "正规熟人不会拒绝核实身份，拒绝验证本身就是重大危险信号",
            "不要被\"紧急情况\"冲昏头脑，冷静核实是防骗第一步"
          ]
        }
      },
      {
        "id": "S06-end-report",
        "messages": [
          {
            "who": "bot",
            "text": "🚨 您选择了核实身份并止损报警，成功挽回了部分损失！",
            "time": ""
          }
        ],
        "choices": [],
        "riskPoints": [],
        "summary": {
          "message": "您虽然付出了一定代价，但及时醒悟并通过正确途径止损报警。假冒熟人诈骗的关键在于\"利用信任+制造紧急\"。",
          "keyLessons": [
            "发现异常后立即通过原有联系方式联系真实本人",
            "第一时间报警并提供聊天记录和转账凭证",
            "不要试图自己\"追回\"资金，这往往导致更多损失",
            "保留完整的聊天记录截图，是报警的重要证据"
          ]
        }
      },
      {
        "id": "S06-end-lose",
        "messages": [
          {
            "who": "bot",
            "text": "💸 您经历了完整的假冒熟人诈骗陷阱，损失严重。",
            "time": ""
          }
        ],
        "choices": [],
        "riskPoints": [],
        "summary": {
          "message": "从500元到4500元再到8000元，诈骗分子利用您的信任和同情心步步紧逼，最终骗取了大量资金。",
          "keyLessons": [
            "社交账号可以被盗用，不代表对方是本人",
            "任何时候核实身份都是第一位",
            "紧急借钱是最高危场景，宁可核实后被抱怨，也不要冲动转账",
            "诈骗分子会用\"最后一次\"反复索取",
            "发现自己情绪激动时不要做转账决定"
          ]
        }
      }
    ]
  },
  {
    "id": "S07",
    "name": "虚假中奖诈骗",
    "category": "中奖诈骗",
    "description": "诈骗分子冒充知名节目或平台，谎称受害者中奖，以缴纳税费、保证金等名义骗取钱财",
    "difficulty": 3,
    "estimated_time": 8,
    "stages": [
      {
        "id": "S07-01",
        "name": "撒网-中奖通知",
        "type": "chat",
        "duration": 2,
        "messages": [
          {
            "who": "scammer",
            "text": "🎉 恭喜您！您的手机号码被《奔跑吧兄弟》综艺节目抽中为场外幸运观众！",
            "time": "09:00"
          },
          {
            "who": "scammer",
            "text": "您获得了【特等奖】现金88800元 + 苹果笔记本电脑一台！兑奖码：AB8888",
            "time": "09:00"
          },
          {
            "who": "scammer",
            "text": "请在24小时内联系我们领奖，逾期视为自动放弃！热线：400-888-9999",
            "time": "09:00"
          }
        ],
        "choices": [
          {
            "id": "A",
            "text": "真的吗？！我运气这么好！马上联系你们！",
            "type": "danger",
            "score": 0,
            "tags": [
              "贪心",
              "轻信"
            ],
            "next": "S07-02"
          },
          {
            "id": "B",
            "text": "先上网查查这个节目有没有这个抽奖活动",
            "type": "neutral",
            "score": 60,
            "tags": [
              "核实"
            ],
            "next": "S07-01-b"
          },
          {
            "id": "C",
            "text": "我没参加过任何抽奖，这是诈骗吧？",
            "type": "safe",
            "score": 95,
            "tags": [
              "识破套路"
            ],
            "next": "S07-end-safe"
          }
        ],
        "riskPoints": [
          {
            "keyword": "陌生中奖",
            "explain": "正规抽奖不会主动联系个人，更不会用短信通知"
          },
          {
            "keyword": "场外观众",
            "explain": "综艺节目场外抽奖是经典诈骗题材，利用知名度制造可信度"
          }
        ]
      },
      {
        "id": "S07-01-b",
        "name": "核实阶段",
        "type": "chat",
        "duration": 1,
        "messages": [
          {
            "who": "scammer",
            "text": "您好，这里是《奔跑吧兄弟》节目组兑奖中心！请问您是机主本人吗？",
            "time": "09:05"
          },
          {
            "who": "scammer",
            "text": "您的兑奖码AB8888已确认！请您提供身份证号码和银行卡号，我们为您办理领奖手续~",
            "time": "09:05"
          }
        ],
        "choices": [
          {
            "id": "A",
            "text": "好的，我的身份证号是...银行卡是...",
            "type": "danger",
            "score": 0,
            "tags": [
              "填写敏感信息"
            ],
            "next": "S07-02"
          },
          {
            "id": "B",
            "text": "为什么要身份证和银行卡？你们不会自己转账给我吗？",
            "type": "neutral",
            "score": 50,
            "tags": [
              "质疑异常"
            ],
            "next": "S07-02"
          },
          {
            "id": "C",
            "text": "正规兑奖不会要这些信息，这是诈骗！",
            "type": "safe",
            "score": 95,
            "tags": [
              "识破套路"
            ],
            "next": "S07-end-safe"
          }
        ],
        "riskPoints": [
          {
            "keyword": "身份证+银行卡",
            "explain": "收集这些信息是为了盗刷或精准诈骗，正规兑奖只需核对身份"
          }
        ]
      },
      {
        "id": "S07-02",
        "name": "领奖手续费",
        "type": "chat",
        "duration": 2,
        "messages": [
          {
            "who": "scammer",
            "text": "✅ 信息已登记！您已获得88800元现金奖励！",
            "time": "09:10"
          },
          {
            "who": "scammer",
            "text": "💰 但根据规定，需要先缴纳【个人所得税】8880元（奖金的10%），这是国家对大额奖金的要求",
            "time": "09:10"
          },
          {
            "who": "scammer",
            "text": "缴纳后，剩余80000元会一次性转到您的卡上！您可以通过微信/支付宝转账",
            "time": "09:10"
          }
        ],
        "choices": [
          {
            "id": "A",
            "text": "8880也不多，付了就能拿88800了，马上转！",
            "type": "danger",
            "score": -10,
            "tags": [
              "冲动垫付"
            ],
            "next": "S07-03"
          },
          {
            "id": "B",
            "text": "个人所得税不是应该你们代扣代缴吗？为什么要我先付？",
            "type": "neutral",
            "score": 70,
            "tags": [
              "质疑异常"
            ],
            "next": "S07-03"
          },
          {
            "id": "C",
            "text": "我没钱，这奖不兑了",
            "type": "safe",
            "score": 90,
            "tags": [
              "识破套路"
            ],
            "next": "S07-end-safe"
          }
        ],
        "riskPoints": [
          {
            "keyword": "代缴个人所得税",
            "explain": "正规机构代扣代缴不会要求个人先转账，这是最常见的中奖诈骗手法"
          }
        ]
      },
      {
        "id": "S07-03",
        "name": "保证金连环套",
        "type": "chat",
        "duration": 2,
        "messages": [
          {
            "who": "scammer",
            "text": "✅ 税费已收到！财务正在处理转账...等等！",
            "time": "09:15"
          },
          {
            "who": "scammer",
            "text": "⚠️【系统提示】您的账户存在【信息填写不完整】，需要再缴纳5000元【保证金】才能激活提现功能",
            "time": "09:16"
          },
          {
            "who": "scammer",
            "text": "💡 保证金会在到账后自动退还，这是领取大奖的必要步骤！",
            "time": "09:16"
          }
        ],
        "choices": [
          {
            "id": "A",
            "text": "5000换80000很划算！马上转！",
            "type": "danger",
            "score": -20,
            "tags": [
              "继续垫付",
              "贪心"
            ],
            "next": "S07-04"
          },
          {
            "id": "B",
            "text": "保证金还要交？正规活动不是这样运作的吧？",
            "type": "neutral",
            "score": 60,
            "tags": [
              "质疑异常"
            ],
            "next": "S07-04"
          },
          {
            "id": "C",
            "text": "这是连环套！我要报警！",
            "type": "safe",
            "score": 85,
            "tags": [
              "止损报警"
            ],
            "next": "S07-end-report"
          }
        ],
        "riskPoints": [
          {
            "keyword": "保证金",
            "explain": "任何以保证金、激活费等名义要求先交钱的都是诈骗，正规活动不会收费"
          }
        ]
      },
      {
        "id": "S07-04",
        "name": "收割继续",
        "type": "chat",
        "duration": 2,
        "messages": [
          {
            "who": "scammer",
            "text": "✅ 保证金已收到！正在处理最终转账流程...",
            "time": "09:20"
          },
          {
            "who": "scammer",
            "text": "😱 不好！系统检测到您的账户已被【银监会】标记，需要再缴纳15000元'解冻手续费'，否则账户将被永久冻结！",
            "time": "09:21"
          },
          {
            "who": "scammer",
            "text": "⚠️ 这是最后一次缴费！缴完后立即到账88800元！",
            "time": "09:21"
          }
        ],
        "choices": [
          {
            "id": "A",
            "text": "借钱也要转！不能让前面的钱打水漂！",
            "type": "danger",
            "score": -50,
            "tags": [
              "贷款转账",
              "沉没成本"
            ],
            "next": "S07-end-lose"
          },
          {
            "id": "B",
            "text": "你们到底是哪个机构的？银监会我知道不会这样！",
            "type": "neutral",
            "score": 40,
            "tags": [
              "质疑异常"
            ],
            "next": "S07-end-report"
          },
          {
            "id": "C",
            "text": "这是无底洞！我报警了！",
            "type": "safe",
            "score": 85,
            "tags": [
              "止损报警"
            ],
            "next": "S07-end-report"
          }
        ],
        "riskPoints": [
          {
            "keyword": "银监会",
            "explain": "骗子冒充官方机构施压，让你觉得问题很严重必须配合"
          },
          {
            "keyword": "无底洞",
            "explain": "骗子会无限叠加费用，直到你再也拿不出钱，永不停止"
          }
        ]
      },
      {
        "id": "S07-end-safe",
        "name": "场景结束-安全退出",
        "type": "education",
        "summary": {
          "score": 100,
          "level": "优秀",
          "message": "你成功识破了虚假中奖诈骗的所有套路！没有泄露任何信息，没有转账一分钱！",
          "keyLessons": [
            "正规抽奖不会主动联系个人，中奖信息应以官方公告为准",
            "领取中奖不需要缴纳任何费用（税费由机构代扣代缴）",
            "任何保证金、激活费、解冻费都是诈骗的明确信号",
            "天下没有免费的午餐，高额奖金必有诈"
          ]
        }
      },
      {
        "id": "S07-end-report",
        "name": "场景结束-正确报案",
        "type": "education",
        "summary": {
          "score": 55,
          "level": "及格",
          "message": "你在关键时刻选择了报警止损！但已经付出了一定代价。",
          "keyLessons": [
            "发现被骗后应立即停止转账并报警",
            "不要试图用更多的钱'扳本'，那是无底洞",
            "保留所有聊天记录和转账凭证"
          ]
        }
      },
      {
        "id": "S07-end-lose",
        "name": "场景结束-血本无归",
        "type": "education",
        "summary": {
          "score": 0,
          "level": "极度危险",
          "message": "你经历了完整的虚假中奖诈骗陷阱，损失严重。这类诈骗追回率极低，重在预防！",
          "keyLessons": [
            "任何要求先交钱的中奖都是诈骗，没有例外",
            "正规抽奖不会收取任何费用",
            "骗子会叠加各种费用，直到你再也拿不出钱",
            "发现自己贪心时及时止损，不要被高额奖金迷惑"
          ]
        }
      }
    ]
  },
  {
    "id": "S08",
    "name": "投资理财诈骗",
    "category": "投资诈骗",
    "description": "诈骗分子冒充投资老师，先诱导小赚建立信任，随后要求大额入金操作，随即爆仓亏损",
    "difficulty": 5,
    "estimated_time": 12,
    "stages": [
      {
        "id": "S08-01",
        "name": "撒网-投资社群",
        "type": "chat",
        "duration": 2,
        "messages": [
          {
            "who": "scammer",
            "text": "📈【牛老师投资俱乐部】限额开放！真实带单，收益可观！",
            "time": "14:00"
          },
          {
            "who": "scammer",
            "text": "扫码入群可领取【免费荐股】，每日3只涨停板！客户盈利截图镇楼！[图片：虚假盈利截图]",
            "time": "14:00"
          },
          {
            "who": "scammer",
            "text": "想要改变命运？加入我们，实现财富自由！名额有限，先到先得！",
            "time": "14:00"
          }
        ],
        "choices": [
          {
            "id": "A",
            "text": "3只涨停板？！这么厉害！马上入群！",
            "type": "danger",
            "score": 0,
            "tags": [
              "贪心",
              "冲动报名"
            ],
            "next": "S08-02"
          },
          {
            "id": "B",
            "text": "先查查这个牛老师是什么来历",
            "type": "neutral",
            "score": 50,
            "tags": [
              "核实信息"
            ],
            "next": "S08-01-b"
          },
          {
            "id": "C",
            "text": "这种群99%是骗人的，不加入",
            "type": "safe",
            "score": 95,
            "tags": [
              "识破套路"
            ],
            "next": "S08-end-safe"
          }
        ],
        "riskPoints": [
          {
            "keyword": "涨停板",
            "explain": "声称能准确预测涨停板本身就是诈骗，正常投资不可能保证收益"
          },
          {
            "keyword": "盈利截图",
            "explain": "盈利截图可以伪造，这是骗子博取信任的常用手段"
          }
        ]
      },
      {
        "id": "S08-01-b",
        "name": "核实阶段",
        "type": "chat",
        "duration": 1,
        "messages": [
          {
            "who": "scammer",
            "text": "📞 牛老师：感谢关注！我做投资12年了，专攻A股和数字货币，曾在私募基金任职！",
            "time": "14:02"
          },
          {
            "who": "scammer",
            "text": "[图片：伪造的从业证书] [图片：与巴菲特的虚假合影]",
            "time": "14:02"
          },
          {
            "who": "scammer",
            "text": "我的客户平均月收益30%+，跟着我操作，稳赚不赔！先关注群里的免费荐股试试水~",
            "time": "14:02"
          }
        ],
        "choices": [
          {
            "id": "A",
            "text": "证书看起来很专业，先跟着试试",
            "type": "danger",
            "score": 10,
            "tags": [
              "轻信权威"
            ],
            "next": "S08-02"
          },
          {
            "id": "B",
            "text": "巴菲特那张合影是PS的吧？",
            "type": "neutral",
            "score": 70,
            "tags": [
              "质疑异常"
            ],
            "next": "S08-02"
          },
          {
            "id": "C",
            "text": "稳赚不赔？正规投资不可能这样承诺！",
            "type": "safe",
            "score": 95,
            "tags": [
              "识破本质"
            ],
            "next": "S08-end-safe"
          }
        ],
        "riskPoints": [
          {
            "keyword": "稳赚不赔",
            "explain": "任何投资都存在风险，'稳赚不赔'是诈骗的典型话术"
          },
          {
            "keyword": "伪造证书/合影",
            "explain": "骗子可以伪造任何证书和照片来增加可信度"
          }
        ]
      },
      {
        "id": "S08-02",
        "name": "小利建立信任",
        "type": "chat",
        "duration": 2,
        "messages": [
          {
            "who": "scammer",
            "text": "📈【今日荐股】代码000XXX，建议现价买入，目标涨幅15%，止损8%",
            "time": "10:00"
          },
          {
            "who": "scammer",
            "text": "✅ 昨日荐股已止盈！客户李先生跟单赚了38000元！[图片：虚假转账截图]",
            "time": "10:30"
          },
          {
            "who": "scammer",
            "text": "🎉 牛老师粉丝专属福利！开即送888元体验金！亏损包赔！",
            "time": "10:30"
          }
        ],
        "choices": [
          {
            "id": "A",
            "text": "888元体验金！怎么领取？",
            "type": "danger",
            "score": 0,
            "tags": [
              "贪心"
            ],
            "next": "S08-02-b"
          },
          {
            "id": "B",
            "text": "先观望一下，看看是不是真的能赚钱",
            "type": "neutral",
            "score": 40,
            "tags": [
              "观望"
            ],
            "next": "S08-02-b"
          },
          {
            "id": "C",
            "text": "亏损包赔？这不符合逻辑，不相信",
            "type": "safe",
            "score": 90,
            "tags": [
              "识破套路"
            ],
            "next": "S08-end-safe"
          }
        ],
        "riskPoints": [
          {
            "keyword": "亏损包赔",
            "explain": "正规投资不会承诺亏损包赔，这是不可能的商业逻辑"
          },
          {
            "keyword": "体验金",
            "explain": "用体验金让你尝甜头，为后续大额入金做铺垫"
          }
        ]
      },
      {
        "id": "S08-02-b",
        "name": "诱导首次入金",
        "type": "chat",
        "duration": 2,
        "messages": [
          {
            "who": "scammer",
            "text": "📲 客服：您好！领取体验金需要先注册账户，并首次入金5000元激活VIP服务~",
            "time": "11:00"
          },
          {
            "who": "scammer",
            "text": "💰 入金5000元后，我们会有专属老师一对一带单服务，日收益可达5000+元！",
            "time": "11:00"
          },
          {
            "who": "scammer",
            "text": "⏰ 今日限额30个VIP名额，已满28个！再不加入就要等下周了！",
            "time": "11:00"
          }
        ],
        "choices": [
          {
            "id": "A",
            "text": "5000换5000收益，很划算！马上入金！",
            "type": "danger",
            "score": -10,
            "tags": [
              "冲动垫付"
            ],
            "next": "S08-03"
          },
          {
            "id": "B",
            "text": "等等，为什么要先交钱才能获得服务？",
            "type": "neutral",
            "score": 50,
            "tags": [
              "质疑异常"
            ],
            "next": "S08-03"
          },
          {
            "id": "C",
            "text": "正规证券公司不收这种服务费，你们是诈骗！",
            "type": "safe",
            "score": 90,
            "tags": [
              "识破套路"
            ],
            "next": "S08-end-safe"
          }
        ],
        "riskPoints": [
          {
            "keyword": "名额有限",
            "explain": "制造紧迫感让你快速决策不思考，是诈骗分子的常用手段"
          },
          {
            "keyword": "先入金",
            "explain": "任何要求先入金的操作都可能是诈骗，正规平台不会这样"
          }
        ]
      },
      {
        "id": "S08-03",
        "name": "首次实战",
        "type": "chat",
        "duration": 2,
        "messages": [
          {
            "who": "scammer",
            "text": "✅ 恭喜您已完成首次入金5000元！VIP服务已激活！",
            "time": "11:05"
          },
          {
            "who": "scammer",
            "text": "📈 牛老师带单：建议全仓买入BTC-USDT永续合约多单，10倍杠杆，预计收益50%+",
            "time": "11:10"
          },
          {
            "who": "scammer",
            "text": "⚠️ 提示：合约交易有风险，但跟着老师操作稳赚！名额紧张，30分钟内必须入场！",
            "time": "11:10"
          }
        ],
        "choices": [
          {
            "id": "A",
            "text": "10倍杠杆！50%收益！全仓杀入！",
            "type": "danger",
            "score": -20,
            "tags": [
              "杠杆交易",
              "激进操作"
            ],
            "next": "S08-03-b"
          },
          {
            "id": "B",
            "text": "为什么这么着急？正规交易不是这样操作的",
            "type": "neutral",
            "score": 40,
            "tags": [
              "质疑异常"
            ],
            "next": "S08-03-b"
          },
          {
            "id": "C",
            "text": "合约交易+10倍杠杆，这不是送钱吗？",
            "type": "safe",
            "score": 85,
            "tags": [
              "识破风险"
            ],
            "next": "S08-end-safe"
          }
        ],
        "riskPoints": [
          {
            "keyword": "10倍杠杆",
            "explain": "合约杠杆是高风险交易，10倍杠杆可能快速爆仓，骗子正是利用高风险快速收割"
          },
          {
            "keyword": "30分钟入场",
            "explain": "催促入场是不给你思考时间，正规交易不会限时催命"
          }
        ]
      },
      {
        "id": "S08-03-b",
        "name": "小赚诱饵",
        "type": "chat",
        "duration": 2,
        "messages": [
          {
            "who": "scammer",
            "text": "🎉 恭喜！BTC多单已成交！目前盈利中！",
            "time": "11:30"
          },
          {
            "who": "scammer",
            "text": "✅ 客户王女士跟单赚取了25000元！[图片：虚假盈利截图]",
            "time": "11:32"
          },
          {
            "who": "scammer",
            "text": "📈 牛老师：行情大好！建议加仓20万，继续持有！跟上这波行情，利润翻倍！",
            "time": "11:35"
          }
        ],
        "choices": [
          {
            "id": "A",
            "text": "25000！这么赚！加仓20万！",
            "type": "danger",
            "score": -30,
            "tags": [
              "加大投入",
              "贪心"
            ],
            "next": "S08-04"
          },
          {
            "id": "B",
            "text": "先提现25000看看是不是真的能拿到钱",
            "type": "neutral",
            "score": 30,
            "tags": [
              "试探提现"
            ],
            "next": "S08-04"
          },
          {
            "id": "C",
            "text": "这盈利截图能伪造，不能信！",
            "type": "safe",
            "score": 85,
            "tags": [
              "识破伪造"
            ],
            "next": "S08-end-safe"
          }
        ],
        "riskPoints": [
          {
            "keyword": "加仓",
            "explain": "骗子会在你小赚时诱导加大投入，用收益截图制造FOMO情绪"
          },
          {
            "keyword": "虚假盈利截图",
            "explain": "所有盈利截图都可以伪造，不能作为投资依据"
          }
        ]
      },
      {
        "id": "S08-04",
        "name": "诱导大额入金",
        "type": "chat",
        "duration": 2,
        "messages": [
          {
            "who": "scammer",
            "text": "📈 牛老师：重大消息！下周一有一波超级行情，老师已布局100万做庄！",
            "time": "14:00"
          },
          {
            "who": "scammer",
            "text": "💰 为了感谢VIP客户，跟上布局的会员需要最低入金50万，老师会带大家一波肥！",
            "time": "14:00"
          },
          {
            "who": "scammer",
            "text": "⏰ 名额只限10位，已有8位会员预约！再不入金就赶不上这波财富自由的机会了！",
            "time": "14:00"
          }
        ],
        "choices": [
          {
            "id": "A",
            "text": "100万做庄！这波跟着老师吃肉！入金50万！",
            "type": "danger",
            "score": -40,
            "tags": [
              "大额入金",
              "贪心"
            ],
            "next": "S08-05"
          },
          {
            "id": "B",
            "text": "等等，为什么突然要50万？之前不是说5000就行吗？",
            "type": "neutral",
            "score": 40,
            "tags": [
              "质疑异常"
            ],
            "next": "S08-05"
          },
          {
            "id": "C",
            "text": "我从没听说过私人能'做庄'，这是骗局！",
            "type": "safe",
            "score": 90,
            "tags": [
              "识破本质"
            ],
            "next": "S08-end-report"
          }
        ],
        "riskPoints": [
          {
            "keyword": "做庄",
            "explain": "声称私人能操纵市场是违法的，正规投资不可能这样宣传"
          },
          {
            "keyword": "名额紧张",
            "explain": "制造紧迫感是诈骗分子的标准手法，让你没时间思考"
          }
        ]
      },
      {
        "id": "S08-05",
        "name": "爆仓收割",
        "type": "chat",
        "duration": 2,
        "messages": [
          {
            "who": "scammer",
            "text": "✅ 入金成功！50万已到账！牛老师正在布局中...",
            "time": "14:30"
          },
          {
            "who": "scammer",
            "text": "😱 紧急！BTC遭遇瀑布式下跌！10倍杠杆已被强平！账户直接归零！",
            "time": "14:35"
          },
          {
            "who": "scammer",
            "text": "💔 50万已全部亏损！老师也没想到市场会这样...但别灰心，还有机会！",
            "time": "14:35"
          }
        ],
        "choices": [
          {
            "id": "A",
            "text": "50万没了？！老师还能带我回本吗？",
            "type": "danger",
            "score": -30,
            "tags": [
              "不甘心",
              "继续信任"
            ],
            "next": "S08-05-b"
          },
          {
            "id": "B",
            "text": "这是你们平台操控的！我要报警！",
            "type": "neutral",
            "score": 40,
            "tags": [
              "质疑异常"
            ],
            "next": "S08-end-report"
          },
          {
            "id": "C",
            "text": "这是诈骗！我的50万！报警！",
            "type": "safe",
            "score": 85,
            "tags": [
              "止损报警"
            ],
            "next": "S08-end-report"
          }
        ],
        "riskPoints": [
          {
            "keyword": "强平归零",
            "explain": "合约交易确实会爆仓，但这正是骗子想要的——用你的本金快速收割"
          },
          {
            "keyword": "继续信任",
            "explain": "亏损后继续信任是深度套牢的标志，骗子会用'回本'引诱你继续入金"
          }
        ]
      },
      {
        "id": "S08-05-b",
        "name": "二次收割",
        "type": "chat",
        "duration": 2,
        "messages": [
          {
            "who": "scammer",
            "text": "牛老师：别慌！我还有办法！但需要再入金30万，我带你做下一波行情，百分百回本！",
            "time": "14:40"
          },
          {
            "who": "scammer",
            "text": "💡 如果不跟上，下一波行情就跟你无关了，前面50万就真的打水漂了！",
            "time": "14:40"
          },
          {
            "who": "scammer",
            "text": "⏰ 限时2小时！再不入金就取消VIP资格！",
            "time": "14:40"
          }
        ],
        "choices": [
          {
            "id": "A",
            "text": "贷款30万跟上！一定要回本！",
            "type": "danger",
            "score": -60,
            "tags": [
              "贷款转账",
              "沉没成本"
            ],
            "next": "S08-end-lose"
          },
          {
            "id": "B",
            "text": "你们根本就是诈骗！报警！",
            "type": "safe",
            "score": 80,
            "tags": [
              "止损报警"
            ],
            "next": "S08-end-report"
          },
          {
            "id": "C",
            "text": "算了，不要了，50万就当买教训",
            "type": "neutral",
            "score": 30,
            "tags": [
              "放弃止损"
            ],
            "next": "S08-end-lose"
          }
        ],
        "riskPoints": [
          {
            "keyword": "沉没成本",
            "explain": "已经亏损50万不是继续入金的理由，骗子正是利用'不甘心'心理继续收割"
          },
          {
            "keyword": "贷款转账",
            "explain": "借贷转账是深度套牢的标志，会让你背负巨额债务"
          }
        ]
      },
      {
        "id": "S08-end-safe",
        "name": "场景结束-安全退出",
        "type": "education",
        "summary": {
          "score": 100,
          "level": "优秀",
          "message": "你成功识破了投资理财诈骗的所有套路！没有入金，没有转账，保住了自己的资金安全！",
          "keyLessons": [
            "任何'稳赚不赔'、'亏损包赔'都是诈骗，正规投资存在风险",
            "盈利截图可以伪造，不能作为投资依据",
            "私人'做庄'、'带单'都是违规行为，正规投资不会这样",
            "合约杠杆是高风险风险投资，10倍杠杆可能快速归零"
          ]
        }
      },
      {
        "id": "S08-end-report",
        "name": "场景结束-正确报案",
        "type": "education",
        "summary": {
          "score": 50,
          "level": "需加强",
          "message": "你在关键时刻选择了报警止损！但早期有机会识破而没有，损失已经很大。",
          "keyLessons": [
            "发现被骗后应立即报警，停止转账",
            "不要试图'扳本'，那是无底洞",
            "保留所有聊天记录和转账凭证",
            "任何投资都存在风险，不可能保证收益"
          ]
        }
      },
      {
        "id": "S08-end-lose",
        "name": "场景结束-血本无归",
        "type": "education",
        "summary": {
          "score": 0,
          "level": "极度危险",
          "message": "你经历了完整的投资理财诈骗陷阱，损失惨重。这类诈骗追回率不足5%，重在预防！",
          "keyLessons": [
            "投资诈骗的核心是让你先小赚建立信任，然后诱导大额入金后收割",
            "任何私人带单、稳赚不赔都是诈骗",
            "合约杠杆是高风险，10倍杠杆可以让你快速归零",
            "亏损后继续入金'扳本'是深度套牢的标志，永远不要借贷转账"
          ]
        }
      }
    ]
  },
  {
    "id": "S09",
    "name": "机票/旅行诈骗",
    "category": "旅行诈骗",
    "description": "诈骗分子在二手平台或朋友圈发布廉价机票/旅行团，诱导转账后消失，或以改签退票名义盗取信息",
    "difficulty": 4,
    "estimated_time": 8,
    "stages": [
      {
        "id": "S09-01",
        "name": "撒网-廉价机票",
        "type": "chat",
        "duration": 2,
        "messages": [
          {
            "who": "scammer",
            "text": "📢【特价机票】各大航司内部价，低于市场价30%-50%！",
            "time": "16:00"
          },
          {
            "who": "scammer",
            "text": "北京-上海 头等舱 仅需680元！北京-广州 经济舱 仅需299元！位置有限！",
            "time": "16:00"
          },
          {
            "who": "scammer",
            "text": "需要的加我V：airticket168，备注'特价机票'优先通过~",
            "time": "16:00"
          }
        ],
        "choices": [
          {
            "id": "A",
            "text": "便宜这么多！马上加微信！",
            "type": "danger",
            "score": 0,
            "tags": [
              "贪心",
              "冲动"
            ],
            "next": "S09-02"
          },
          {
            "id": "B",
            "text": "先查查这个卖家靠不靠谱",
            "type": "neutral",
            "score": 50,
            "tags": [
              "核实信息"
            ],
            "next": "S09-01-b"
          },
          {
            "id": "C",
            "text": "这么便宜肯定有问题，正规机票不会这么卖",
            "type": "safe",
            "score": 95,
            "tags": [
              "识破套路"
            ],
            "next": "S09-end-safe"
          }
        ],
        "riskPoints": [
          {
            "keyword": "低于市场价50%",
            "explain": "价格远低于正常水平的机票是诈骗的典型特征"
          },
          {
            "keyword": "内部价",
            "explain": "声称有内部渠道是诈骗分子常用话术，正规渠道不会这样销售"
          }
        ]
      },
      {
        "id": "S09-01-b",
        "name": "核实阶段",
        "type": "chat",
        "duration": 1,
        "messages": [
          {
            "who": "scammer",
            "text": "📲 客服-小林：您好！我们的机票是从航空公司内部渠道获取的，员工折扣，所以价格低~",
            "time": "16:05"
          },
          {
            "who": "scammer",
            "text": "[图片：航空公司的工牌] [图片：机票行程单]",
            "time": "16:05"
          },
          {
            "who": "scammer",
            "text": "我们做了5年了，已帮助3000+客户出行！可以先看评价~",
            "time": "16:05"
          }
        ],
        "choices": [
          {
            "id": "A",
            "text": "看起来挺正规的，先订一张试试",
            "type": "danger",
            "score": 10,
            "tags": [
              "轻信"
            ],
            "next": "S09-02"
          },
          {
            "id": "B",
            "text": "工牌能伪造，你怎么证明是真的？",
            "type": "neutral",
            "score": 70,
            "tags": [
              "质疑异常"
            ],
            "next": "S09-02"
          },
          {
            "id": "C",
            "text": "正规订票要去官网，这种渠道不靠谱",
            "type": "safe",
            "score": 95,
            "tags": [
              "识破套路"
            ],
            "next": "S09-end-safe"
          }
        ],
        "riskPoints": [
          {
            "keyword": "工牌/行程单",
            "explain": "这些都是可以伪造的，不能作为信任依据"
          },
          {
            "keyword": "内部渠道",
            "explain": "正规航空公司不会在非官方渠道销售折扣机票"
          }
        ]
      },
      {
        "id": "S09-02",
        "name": "购票下单",
        "type": "chat",
        "duration": 2,
        "messages": [
          {
            "who": "scammer",
            "text": "📋【订单确认】\n航班：CA1234 北京-上海\n日期：6月15日\n舱位：头等舱\n票价：680元\n乘客：您本人",
            "time": "16:10"
          },
          {
            "who": "scammer",
            "text": "⚠️ 付款方式：微信/支付宝直接转账，不接受平台交易（机票紧张）",
            "time": "16:10"
          },
          {
            "who": "scammer",
            "text": "转账后5分钟内出票！名额有限，转账后不能退款！",
            "time": "16:10"
          }
        ],
        "choices": [
          {
            "id": "A",
            "text": "680元头等舱太划算了！马上转账！",
            "type": "danger",
            "score": 0,
            "tags": [
              "冲动垫付"
            ],
            "next": "S09-03"
          },
          {
            "id": "B",
            "text": "为什么不走平台？正规商家应该支持担保交易",
            "type": "neutral",
            "score": 60,
            "tags": [
              "质疑异常"
            ],
            "next": "S09-03"
          },
          {
            "id": "C",
            "text": "不走平台无法保障，不买了",
            "type": "safe",
            "score": 90,
            "tags": [
              "识破套路"
            ],
            "next": "S09-end-safe"
          }
        ],
        "riskPoints": [
          {
            "keyword": "不走平台",
            "explain": "拒绝平台交易是诈骗的典型特征，因为平台有担保机制"
          },
          {
            "keyword": "不能退款",
            "explain": "正规机票除特别注明外，一般都支持退改，'不能退款'是危险信号"
          }
        ]
      },
      {
        "id": "S09-03",
        "name": "转账后消失或再收费",
        "type": "chat",
        "duration": 2,
        "messages": [
          {
            "who": "scammer",
            "text": "✅ 转账680元已收到！正在出票中...",
            "time": "16:15"
          },
          {
            "who": "scammer",
            "text": "😱 不好！系统检测到您的机票【风控拦截】，需要再缴纳2000元'风控保证金'解除限制才能出票",
            "time": "16:18"
          },
          {
            "who": "scammer",
            "text": "💡 保证金会在出行后24小时内自动退还，这是航空公司的规定~",
            "time": "16:18"
          }
        ],
        "choices": [
          {
            "id": "A",
            "text": "2000换680的机票？这不对劲吧？",
            "type": "neutral",
            "score": 40,
            "tags": [
              "质疑异常"
            ],
            "next": "S09-04"
          },
          {
            "id": "B",
            "text": "我已经付了680，为什么还要再付钱？这是诈骗！",
            "type": "safe",
            "score": 80,
            "tags": [
              "识破套路"
            ],
            "next": "S09-end-report"
          },
          {
            "id": "C",
            "text": "好吧，为了能出行，再转2000",
            "type": "danger",
            "score": -30,
            "tags": [
              "继续垫付"
            ],
            "next": "S09-04"
          }
        ],
        "riskPoints": [
          {
            "keyword": "风控保证金",
            "explain": "航空公司不会收取风控保证金，这是诈骗分子的新借口"
          },
          {
            "keyword": "自动退还",
            "explain": "骗子声称会退还但永远不会，这是连环套的开始"
          }
        ]
      },
      {
        "id": "S09-04",
        "name": "连环套-航班改签诈骗",
        "type": "chat",
        "duration": 2,
        "messages": [
          {
            "who": "scammer",
            "text": "✅ 保证金2000元已收到！正在处理出票...",
            "time": "16:25"
          },
          {
            "who": "scammer",
            "text": "📞 航空公司客服：您好！检测到您的航班因机械故障取消，现在为您改签至下一班，需要再缴纳180元'改签费'",
            "time": "16:26"
          },
          {
            "who": "scammer",
            "text": "⚠️ 改签费必须现在支付，否则航班作废且不退票款！",
            "time": "16:26"
          }
        ],
        "choices": [
          {
            "id": "A",
            "text": "航班取消？什么时候的事？那快点改签！",
            "type": "danger",
            "score": -10,
            "tags": [
              "恐慌反应"
            ],
            "next": "S09-04-b"
          },
          {
            "id": "B",
            "text": "为什么退票还要手续费？你们的规定太离谱了",
            "type": "neutral",
            "score": 50,
            "tags": [
              "质疑异常"
            ],
            "next": "S09-04-b"
          },
          {
            "id": "C",
            "text": "这完全是连环套！我要报警并联系航空公司核实！",
            "type": "safe",
            "score": 90,
            "tags": [
              "止损报警"
            ],
            "next": "S09-end-report"
          }
        ],
        "riskPoints": [
          {
            "keyword": "航班取消改签",
            "explain": "骗子冒充航空公司客服，以改签名义继续索要费用"
          },
          {
            "keyword": "不退票款威胁",
            "explain": "用'不退票款'制造恐惧，逼你继续配合转账"
          }
        ]
      },
      {
        "id": "S09-04-b",
        "name": "彻底收割",
        "type": "chat",
        "duration": 2,
        "messages": [
          {
            "who": "scammer",
            "text": "✅ 改签费180元已收到！出票中...",
            "time": "16:30"
          },
          {
            "who": "scammer",
            "text": "😱 最后一步！系统检测到您的【会员等级不足】，需要再缴纳5000元'会员升级费'才能完成出票！",
            "time": "16:32"
          },
          {
            "who": "scammer",
            "text": "💡 缴纳升级后您将成为永久金卡会员，下次订票享受5折优惠！",
            "time": "16:32"
          }
        ],
        "choices": [
          {
            "id": "A",
            "text": "贷款也要转！机票都订了不能取消！",
            "type": "danger",
            "score": -50,
            "tags": [
              "贷款转账",
              "沉没成本"
            ],
            "next": "S09-end-lose"
          },
          {
            "id": "B",
            "text": "我直接联系航空公司客服核实情况！",
            "type": "safe",
            "score": 80,
            "tags": [
              "核实身份"
            ],
            "next": "S09-end-report"
          },
          {
            "id": "C",
            "text": "这明显是无底洞！不要了，680就当买教训",
            "type": "neutral",
            "score": 30,
            "tags": [
              "放弃止损"
            ],
            "next": "S09-end-lose"
          }
        ],
        "riskPoints": [
          {
            "keyword": "会员升级费",
            "explain": "任何要求升级会员才能出票的都是诈骗，正规航空公司不会这样"
          },
          {
            "keyword": "沉没成本",
            "explain": "已经付了钱不是继续转账的理由，骗子正是利用这种心理"
          }
        ]
      },
      {
        "id": "S09-end-safe",
        "name": "场景结束-安全退出",
        "type": "education",
        "summary": {
          "score": 100,
          "level": "优秀",
          "message": "你成功识破了机票诈骗的所有套路！没有转账，保护了自己的资金安全！",
          "keyLessons": [
            "机票必须通过官方渠道（官网、APP、柜台）购买",
            "拒绝平台担保交易的卖家都是诈骗",
            "航空公司不会收取任何额外保证金、升级费",
            "价格远低于市场价的机票必有问题"
          ]
        }
      },
      {
        "id": "S09-end-report",
        "name": "场景结束-正确报案",
        "type": "education",
        "summary": {
          "score": 55,
          "level": "及格",
          "message": "你在关键时刻选择了报警止损！但已经付出了一定代价。",
          "keyLessons": [
            "发现被骗后应立即报警，并联系银行冻结账户",
            "保留所有聊天记录和转账凭证",
            "不要试图用更多的钱'扳本'，那是无底洞",
            "购票应选择官方渠道，不要贪图便宜"
          ]
        }
      },
      {
        "id": "S09-end-lose",
        "name": "场景结束-血本无归",
        "type": "education",
        "summary": {
          "score": 0,
          "level": "极度危险",
          "message": "你经历了完整的机票诈骗陷阱，损失严重。机票诈骗追回率极低，重在预防！",
          "keyLessons": [
            "所有拒绝平台担保的机票销售都是诈骗",
            "航空公司不会收取任何额外费用（保证金、升级费等）",
            "价格远低于市场价的机票100%是诈骗",
            "发现被骗后立即报警，不要继续转账"
          ]
        }
      }
    ]
  },
  {
    "id": "S10",
    "name": "网上恋爱诈骗",
    "category": "杀猪盘",
    "description": "诈骗分子通过社交平台建立感情关系（养猪），待信任建立后诱导参与投资或转账（杀猪），一次比一次金额大",
    "difficulty": 5,
    "estimated_time": 14,
    "stages": [
      {
        "id": "S10-01",
        "name": "撒网-社交平台认识",
        "type": "chat",
        "duration": 2,
        "messages": [
          {
            "who": "scammer",
            "text": "💕【缘来是你】亲，你在平台上填写的理想型和我好像哦~可以认识一下吗？",
            "time": "20:00"
          },
          {
            "who": "scammer",
            "text": "我叫林诗涵，92年的，身高165，兴趣爱好是旅行和做饭，喜欢小动物~你呢？",
            "time": "20:00"
          },
          {
            "who": "scammer",
            "text": "[图片：网络盗用的美女照片]",
            "time": "20:00"
          }
        ],
        "choices": [
          {
            "id": "A",
            "text": "你好！照片好漂亮，很高兴认识你！",
            "type": "danger",
            "score": 0,
            "tags": [
              "轻信"
            ],
            "next": "S10-02"
          },
          {
            "id": "B",
            "text": "先看看对方的动态和资料是不是真的",
            "type": "neutral",
            "score": 50,
            "tags": [
              "核实"
            ],
            "next": "S10-01-b"
          },
          {
            "id": "C",
            "text": "网络认识的人不知道真假，保持警惕",
            "type": "safe",
            "score": 80,
            "tags": [
              "谨慎"
            ],
            "next": "S10-end-safe"
          }
        ],
        "riskPoints": [
          {
            "keyword": "盗用照片",
            "explain": "网络照片可以是任何人，诈骗分子盗用他人照片伪装身份"
          },
          {
            "keyword": "主动搭讪",
            "explain": "骗子会主动在社交平台寻找目标，利用孤独感和情感需求"
          }
        ]
      },
      {
        "id": "S10-01-b",
        "name": "建立感情",
        "type": "chat",
        "duration": 1,
        "messages": [
          {
            "who": "scammer",
            "text": "💕 亲，你真的很特别！我平时很少遇到能聊得来的人~",
            "time": "20:15"
          },
          {
            "who": "scammer",
            "text": "对了，我最近在帮亲戚打理一个投资收益平台，收益还不错~你想了解一下吗？",
            "time": "20:15"
          }
        ],
        "choices": [
          {
            "id": "A",
            "text": "是吗？什么平台这么赚钱？",
            "type": "danger",
            "score": 10,
            "tags": [
              "好奇"
            ],
            "next": "S10-02"
          },
          {
            "id": "B",
            "text": "我们才刚认识，为什么聊投资？",
            "type": "neutral",
            "score": 60,
            "tags": [
              "质疑"
            ],
            "next": "S10-02"
          },
          {
            "id": "C",
            "text": "认识第一天就聊投资？这不对劲",
            "type": "safe",
            "score": 90,
            "tags": [
              "识破套路"
            ],
            "next": "S10-end-safe"
          }
        ],
        "riskPoints": [
          {
            "keyword": "感情+投资",
            "explain": "杀猪盘的标志是先建立感情，再引入投资，是'养猪'到'杀猪'的过渡"
          }
        ]
      },
      {
        "id": "S10-02",
        "name": "养猪-甜蜜互动",
        "type": "chat",
        "duration": 3,
        "messages": [
          {
            "who": "scammer",
            "text": "💕 亲爱的，今天工作累不累？我给你做了晚餐的照片，想看看吗~",
            "time": "19:00"
          },
          {
            "who": "scammer",
            "text": "[图片：西式晚餐照片，实际上是网络盗图]",
            "time": "19:00"
          },
          {
            "who": "scammer",
            "text": "对了，我今天在平台赚了888元！这是我上周的收益截图~[图片：虚假收益截图]",
            "time": "19:30"
          }
        ],
        "choices": [
          {
            "id": "A",
            "text": "太棒了！你带我一起做可以吗？",
            "type": "danger",
            "score": -10,
            "tags": [
              "信任",
              "跟投"
            ],
            "next": "S10-03"
          },
          {
            "id": "B",
            "text": "这个收益截图能伪造的，不能信",
            "type": "neutral",
            "score": 50,
            "tags": [
              "质疑"
            ],
            "next": "S10-03"
          },
          {
            "id": "C",
            "text": "我们才认识几天，不太适合聊投资",
            "type": "safe",
            "score": 80,
            "tags": [
              "保持距离"
            ],
            "next": "S10-end-safe"
          }
        ],
        "riskPoints": [
          {
            "keyword": "感情升温+收益截图",
            "explain": "用感情做掩护，让你放松警惕，同时用收益截图制造赚钱假象"
          }
        ]
      },
      {
        "id": "S10-03",
        "name": "养猪-诱导开户",
        "type": "chat",
        "duration": 2,
        "messages": [
          {
            "who": "scammer",
            "text": "💕 亲爱的，我帮你开了个账户，我带你操作，保证赚钱！",
            "time": "10:00"
          },
          {
            "who": "scammer",
            "text": "你先充值5000元试试，我亲自带你操作，保证一周赚30%！",
            "time": "10:00"
          },
          {
            "who": "scammer",
            "text": "这是我帮你准备的【专属链接】：bit.ly/xxx，支持微信充值~",
            "time": "10:00"
          }
        ],
        "choices": [
          {
            "id": "A",
            "text": "有你在我就放心了！马上充值5000！",
            "type": "danger",
            "score": -20,
            "tags": [
              "冲动垫付"
            ],
            "next": "S10-03-b"
          },
          {
            "id": "B",
            "text": "等等，为什么要用专属链接？正规平台不是这样操作的",
            "type": "neutral",
            "score": 60,
            "tags": [
              "质疑"
            ],
            "next": "S10-03-b"
          },
          {
            "id": "C",
            "text": "我不想投资，我们还是做普通朋友吧",
            "type": "safe",
            "score": 90,
            "tags": [
              "止损退出"
            ],
            "next": "S10-end-safe"
          }
        ],
        "riskPoints": [
          {
            "keyword": "专属链接",
            "explain": "诈骗分子会提供伪造的交易平台，本质是模拟盘，充值后钱直接进入骗子口袋"
          },
          {
            "keyword": "保证赚钱",
            "explain": "任何投资都不可能'保证赚钱'，'保证'二字本身就是诈骗"
          }
        ]
      },
      {
        "id": "S10-03-b",
        "name": "小额盈利",
        "type": "chat",
        "duration": 2,
        "messages": [
          {
            "who": "scammer",
            "text": "✅ 充值成功！5000元已到账~现在开始跟老师操作！",
            "time": "10:15"
          },
          {
            "who": "scammer",
            "text": "💰 跟着我买入！买入后等待上涨...恭喜！你已盈利1500元！[图片：虚假账户截图]",
            "time": "10:45"
          },
          {
            "who": "scammer",
            "text": "💕 亲爱的感觉怎么样？老师带我操作赚钱了！要不要加大投入？我这里有个VIP会员名额，专门带我赚钱的~",
            "time": "11:00"
          }
        ],
        "choices": [
          {
            "id": "A",
            "text": "1500元！这么赚！VIP会员要多少钱？",
            "type": "danger",
            "score": -30,
            "tags": [
              "贪心"
            ],
            "next": "S10-04"
          },
          {
            "id": "B",
            "text": "先试试提现1500元看看能不能到账",
            "type": "neutral",
            "score": 30,
            "tags": [
              "试探"
            ],
            "next": "S10-04"
          },
          {
            "id": "C",
            "text": "账户截图能伪造，不能信！",
            "type": "safe",
            "score": 85,
            "tags": [
              "识破伪造"
            ],
            "next": "S10-end-safe"
          }
        ],
        "riskPoints": [
          {
            "keyword": "虚假账户截图",
            "explain": "模拟盘可以显示任何数字，你看到的是骗子想让你的数字，不是真实交易"
          },
          {
            "keyword": "VIP会员",
            "explain": "骗子会用各种名义让你继续入金，VIP是常见话术"
          }
        ]
      },
      {
        "id": "S10-04",
        "name": "杀猪-诱导大额入金",
        "type": "chat",
        "duration": 3,
        "messages": [
          {
            "who": "scammer",
            "text": "💕 亲爱的，我跟平台申请了一个特殊名额，针对我男朋友的专属福利！",
            "time": "14:00"
          },
          {
            "who": "scammer",
            "text": "💰 只需要入金30万成为VIP，就能解锁【内幕消息】，一周能赚10万+！",
            "time": "14:00"
          },
          {
            "who": "scammer",
            "text": "我已经帮你报名了，名额有限，你把钱打过来，我帮你操作~",
            "time": "14:00"
          }
        ],
        "choices": [
          {
            "id": "A",
            "text": "30万换10万收益！太划算了！马上转账！",
            "type": "danger",
            "score": -40,
            "tags": [
              "大额转账",
              "贪心"
            ],
            "next": "S10-05"
          },
          {
            "id": "B",
            "text": "等等，我们的感情还没到这一步...",
            "type": "neutral",
            "score": 50,
            "tags": [
              "犹豫"
            ],
            "next": "S10-05"
          },
          {
            "id": "C",
            "text": "这是诈骗！我要报警！",
            "type": "safe",
            "score": 90,
            "tags": [
              "止损报警"
            ],
            "next": "S10-end-report"
          }
        ],
        "riskPoints": [
          {
            "keyword": "感情+金钱",
            "explain": "杀猪盘的核心是利用感情关系诱导转账，此时你已成为'猪'"
          },
          {
            "keyword": "内幕消息",
            "explain": "声称有内幕消息是违法的，正常投资不会这样宣传"
          }
        ]
      },
      {
        "id": "S10-05",
        "name": "杀猪-无法提现",
        "type": "chat",
        "duration": 2,
        "messages": [
          {
            "who": "scammer",
            "text": "✅ 30万已到账！VIP会员已激活！正在操作中...",
            "time": "14:30"
          },
          {
            "who": "scammer",
            "text": "💰 恭喜！账户显示已盈利15万！请查收~",
            "time": "15:00"
          },
          {
            "who": "scammer",
            "text": "📞 客服：您好！由于您是VIP会员，需要先缴纳10%的'个人所得税'才能提现，共计4.5万元",
            "time": "15:05"
          }
        ],
        "choices": [
          {
            "id": "A",
            "text": "4.5万换15万，很划算！马上转！",
            "type": "danger",
            "score": -30,
            "tags": [
              "继续转账"
            ],
            "next": "S10-05-b"
          },
          {
            "id": "B",
            "text": "我朋友说这是杀猪盘！你到底是谁？",
            "type": "neutral",
            "score": 60,
            "tags": [
              "质疑"
            ],
            "next": "S10-05-b"
          },
          {
            "id": "C",
            "text": "这是连环套！我报警了！",
            "type": "safe",
            "score": 85,
            "tags": [
              "止损报警"
            ],
            "next": "S10-end-report"
          }
        ],
        "riskPoints": [
          {
            "keyword": "杀猪盘",
            "explain": "杀猪盘的核心是先用感情建立信任，再诱导投资转账，然后以各种名义继续索要"
          },
          {
            "keyword": "个人所得税",
            "explain": "骗子用税务名义继续索要，是收割的常用手段"
          }
        ]
      },
      {
        "id": "S10-05-b",
        "name": "收割完成",
        "type": "chat",
        "duration": 2,
        "messages": [
          {
            "who": "scammer",
            "text": "✅ 个税已收到！正在处理提现...",
            "time": "15:15"
          },
          {
            "who": "scammer",
            "text": "😱 系统检测到您的账户存在【违规操作】，已被冻结！需要再缴纳8万'解冻金'才能提现！",
            "time": "15:20"
          },
          {
            "who": "scammer",
            "text": "💔 如果不缴纳，前面投入的34.5万全部清零！亲爱的，相信我最后一次...💕",
            "time": "15:20"
          }
        ],
        "choices": [
          {
            "id": "A",
            "text": "贷款也要转！不能让前面的钱打水漂！",
            "type": "danger",
            "score": -60,
            "tags": [
              "贷款转账",
              "沉没成本"
            ],
            "next": "S10-end-lose"
          },
          {
            "id": "B",
            "text": "你说的'亲爱的'，你到底是男是女？！",
            "type": "neutral",
            "score": 30,
            "tags": [
              "质疑"
            ],
            "next": "S10-end-report"
          },
          {
            "id": "C",
            "text": "我已经被骗了！报警！",
            "type": "safe",
            "score": 80,
            "tags": [
              "止损报警"
            ],
            "next": "S10-end-report"
          }
        ],
        "riskPoints": [
          {
            "keyword": "最后最后一次",
            "explain": "骗子永远会说'最后一次'，但永远不会停止，直到你再也拿不出钱"
          },
          {
            "keyword": "清零威胁",
            "explain": "用清零威胁制造恐惧，是心理操控的最后手段"
          }
        ]
      },
      {
        "id": "S10-end-safe",
        "name": "场景结束-安全退出",
        "type": "education",
        "summary": {
          "score": 100,
          "level": "优秀",
          "message": "你成功识破了杀猪盘诈骗的所有套路！保护了自己的感情和资金安全！",
          "keyLessons": [
            "网上恋爱必须保持警惕，核实对方真实身份",
            "任何投资都要通过正规渠道，不轻信'内幕消息'",
            "认识不久就聊投资是杀猪盘的典型特征",
            "网络照片不等于真人，可能被盗用"
          ]
        }
      },
      {
        "id": "S10-end-report",
        "name": "场景结束-正确报案",
        "type": "education",
        "summary": {
          "score": 45,
          "level": "需加强",
          "message": "你付出了惨重代价，但最终选择了报警止损。杀猪盘的伤害是双重的——感情和金钱。",
          "keyLessons": [
            "发现被骗后应立即报警，停止转账",
            "保留所有聊天记录和转账凭证",
            "不要试图自己'追回'资金，这往往导致更多损失",
            "杀猪盘的伤害不仅是金钱，还有感情，要及时寻求心理支持"
          ]
        }
      },
      {
        "id": "S10-end-lose",
        "name": "场景结束-血本无归",
        "type": "education",
        "summary": {
          "score": 0,
          "level": "极度危险",
          "message": "你经历了完整的杀猪盘诈骗陷阱，损失惨重。杀猪盘追回率不足3%，重在预防！",
          "keyLessons": [
            "杀猪盘的核心：养猪（感情建立）→杀猪（诱导转账）",
            "任何网上恋爱涉及金钱的都是诈骗",
            "虚假交易平台可以显示任意数字，你看到的盈利是假的",
            "发现被骗后立即报警，不要继续转账哪怕对方说'最后一次'"
          ]
        }
      }
    ]
  },
  {
    "id": "S11",
    "name": "假冒客服诈骗",
    "category": "客服诈骗",
    "description": "诈骗分子冒充电商/银行/平台客服，以退款、理赔、注销账户等名义盗取信息或诱导转账",
    "difficulty": 4,
    "estimated_time": 9,
    "stages": [
      {
        "id": "S11-01",
        "name": "撒网-客服来电",
        "type": "chat",
        "duration": 2,
        "messages": [
          {
            "who": "scammer",
            "text": "📞【电商平台客服】您好，这里是某宝客服中心，工号6688，请问您是李女士吗？",
            "time": "14:00"
          },
          {
            "who": "scammer",
            "text": "我们检测到您在平台购买的【品牌连衣裙】存在质量问题，商家需要紧急召回，并向您进行双倍退款！",
            "time": "14:00"
          },
          {
            "who": "scammer",
            "text": "请问您尾号6228的银行卡还在正常使用吗？我们需要为您办理退款...",
            "time": "14:00"
          }
        ],
        "choices": [
          {
            "id": "A",
            "text": "双倍退款？这么好！请帮我办理！",
            "type": "danger",
            "score": 0,
            "tags": [
              "贪心"
            ],
            "next": "S11-02"
          },
          {
            "id": "B",
            "text": "先核实一下这笔订单是否真的存在质量问题",
            "type": "neutral",
            "score": 50,
            "tags": [
              "核实"
            ],
            "next": "S11-01-b"
          },
          {
            "id": "C",
            "text": "正常平台不会主动联系退款，这是诈骗！",
            "type": "safe",
            "score": 95,
            "tags": [
              "识破套路"
            ],
            "next": "S11-end-safe"
          }
        ],
        "riskPoints": [
          {
            "keyword": "主动客服",
            "explain": "正规平台不会主动联系客户办理退款，这是诈骗分子常用的'客服'话术"
          },
          {
            "keyword": "双倍退款",
            "explain": "用高额退款制造诱惑，降低你的警惕性"
          }
        ]
      },
      {
        "id": "S11-01-b",
        "name": "核实阶段",
        "type": "chat",
        "duration": 1,
        "messages": [
          {
            "who": "scammer",
            "text": "📞 客服：您放心，我们是平台官方客服，您可以挂断后拨打官方客服热线核实~",
            "time": "14:02"
          },
          {
            "who": "scammer",
            "text": "但请您抓紧时间，退款通道将在30分钟后关闭！超时将无法办理！",
            "time": "14:02"
          },
          {
            "who": "scammer",
            "text": "💰 退款金额：裙子原价298元，双倍赔付596元，款项将直接转入您的银行卡",
            "time": "14:02"
          }
        ],
        "choices": [
          {
            "id": "A",
            "text": "596元！马上帮我办理！",
            "type": "danger",
            "score": 10,
            "tags": [
              "贪心",
              "冲动"
            ],
            "next": "S11-02"
          },
          {
            "id": "B",
            "text": "你们说官方客服，为什么要用个人手机号联系我？",
            "type": "neutral",
            "score": 70,
            "tags": [
              "质疑"
            ],
            "next": "S11-02"
          },
          {
            "id": "C",
            "text": "正常退款流程是原路返回，不需要填写银行卡信息",
            "type": "safe",
            "score": 95,
            "tags": [
              "识破套路"
            ],
            "next": "S11-end-safe"
          }
        ],
        "riskPoints": [
          {
            "keyword": "30分钟限时",
            "explain": "制造紧迫感让你无法思考就做决定，是诈骗分子常用手段"
          },
          {
            "keyword": "个人手机号",
            "explain": "官方客服会用官方电话，不会用个人手机号联系"
          }
        ]
      },
      {
        "id": "S11-02",
        "name": "钓鱼信息收集",
        "type": "chat",
        "duration": 2,
        "messages": [
          {
            "who": "scammer",
            "text": "📋 客服：好的，现在为您办理退款！请提供以下信息：",
            "time": "14:05"
          },
          {
            "who": "scammer",
            "text": "① 姓名\n② 身份证号码\n③ 银行卡号\n④ 手机号码\n⑤ 验证码（用于验证退款账户）",
            "time": "14:05"
          },
          {
            "who": "scammer",
            "text": "⚠️ 请放心，您的信息受平台保护，不会泄露！",
            "time": "14:05"
          }
        ],
        "choices": [
          {
            "id": "A",
            "text": "好的，信息给你：姓名、身份证、银行卡...",
            "type": "danger",
            "score": -10,
            "tags": [
              "填写敏感信息"
            ],
            "next": "S11-03"
          },
          {
            "id": "B",
            "text": "为什么要身份证和验证码？正常退款不需要这些吧？",
            "type": "neutral",
            "score": 60,
            "tags": [
              "质疑"
            ],
            "next": "S11-03"
          },
          {
            "id": "C",
            "text": "验证码=授权=钱被盗，绝对不能给！",
            "type": "safe",
            "score": 95,
            "tags": [
              "识破本质"
            ],
            "next": "S11-end-safe"
          }
        ],
        "riskPoints": [
          {
            "keyword": "验证码",
            "explain": "验证码等于授权！骗子要验证码就是要登录你的账户转账"
          },
          {
            "keyword": "身份证+银行卡",
            "explain": "收集这些信息是为了盗刷或精准诈骗"
          }
        ]
      },
      {
        "id": "S11-03",
        "name": "信息提交-盗刷发生",
        "type": "chat",
        "duration": 2,
        "messages": [
          {
            "who": "scammer",
            "text": "✅ 信息已收到！退款通道已开启！",
            "time": "14:10"
          },
          {
            "who": "scammer",
            "text": "📱 验证码：823456，请您在5分钟内告知，过期无效！",
            "time": "14:10"
          },
          {
            "who": "scammer",
            "text": "⚠️ 提示：退款金额596元将稍后到账，请保持手机畅通！",
            "time": "14:10"
          }
        ],
        "choices": [
          {
            "id": "A",
            "text": "验证码是823456",
            "type": "danger",
            "score": -30,
            "tags": [
              "泄露验证码"
            ],
            "next": "S11-04"
          },
          {
            "id": "B",
            "text": "等等！你们怎么知道我的手机号发验证码？",
            "type": "neutral",
            "score": 50,
            "tags": [
              "质疑"
            ],
            "next": "S11-04"
          },
          {
            "id": "C",
            "text": "验证码不能给任何人！这是诈骗！",
            "type": "safe",
            "score": 90,
            "tags": [
              "止损报警"
            ],
            "next": "S11-end-safe"
          }
        ],
        "riskPoints": [
          {
            "keyword": "验证码泄露",
            "explain": "骗子用你的信息自己注册账户，验证码是用来绑定银行卡授权转账的"
          },
          {
            "keyword": "5分钟有效期",
            "explain": "制造紧迫感让你没时间思考，催促你提供验证码"
          }
        ]
      },
      {
        "id": "S11-04",
        "name": "盗刷发生",
        "type": "chat",
        "duration": 2,
        "messages": [
          {
            "who": "scammer",
            "text": "✅ 退款办理成功！596元将在24小时内到账~",
            "time": "14:15"
          },
          {
            "who": "scammer",
            "text": "📱 您尾号6228的银行卡刚才有一笔【支出通知】：支出人民币5000元...",
            "time": "14:20"
          },
          {
            "who": "scammer",
            "text": "😱 什么?!我没有转账！你们做了什么？！",
            "time": "14:20"
          }
        ],
        "choices": [
          {
            "id": "A",
            "text": "天哪！5000元！怎么支付的？能追回来吗？",
            "type": "danger",
            "score": -20,
            "tags": [
              "恐慌"
            ],
            "next": "S11-04-b"
          },
          {
            "id": "B",
            "text": "是你们盗刷的！立刻报警！",
            "type": "safe",
            "score": 85,
            "tags": [
              "止损报警"
            ],
            "next": "S11-end-report"
          },
          {
            "id": "C",
            "text": "我马上打电话给银行冻结账户！",
            "type": "safe",
            "score": 90,
            "tags": [
              "止损意识"
            ],
            "next": "S11-end-report"
          }
        ],
        "riskPoints": [
          {
            "keyword": "验证码=授权=钱被盗",
            "explain": "提供验证码后，骗子可以完成转账，这是诈骗的核心环节"
          },
          {
            "keyword": "立刻冻结",
            "explain": "发现被盗刷后第一时间冻结账户是最有效的止损方式"
          }
        ]
      },
      {
        "id": "S11-04-b",
        "name": "连环套-注销账户诈骗",
        "type": "chat",
        "duration": 2,
        "messages": [
          {
            "who": "scammer",
            "text": "📞 客服：您好！我们检测到您的账户已被【盗刷】，需要紧急处理！",
            "time": "14:25"
          },
          {
            "who": "scammer",
            "text": "⚠️【系统提示】您的账户涉嫌【洗钱】风险，需要将余额转移到'安全账户'进行核查！",
            "time": "14:25"
          },
          {
            "who": "scammer",
            "text": "💰 需要转账20000元到'安全账户'，核查后资金将全部退还，否则名下的所有银行卡将被冻结！",
            "time": "14:25"
          }
        ],
        "choices": [
          {
            "id": "A",
            "text": "为了银行卡安全，先转20000元到安全账户",
            "type": "danger",
            "score": -50,
            "tags": [
              "继续转账",
              "恐慌"
            ],
            "next": "S11-end-lose"
          },
          {
            "id": "B",
            "text": "你们根本不是客服！是诈骗！",
            "type": "safe",
            "score": 80,
            "tags": [
              "识破套路"
            ],
            "next": "S11-end-report"
          },
          {
            "id": "C",
            "text": "我已经报警了！不要再骗我！",
            "type": "safe",
            "score": 85,
            "tags": [
              "止损报警"
            ],
            "next": "S11-end-report"
          }
        ],
        "riskPoints": [
          {
            "keyword": "安全账户",
            "explain": "所谓'安全账户'是诈骗分子的账户，正规机构不会这样要求"
          },
          {
            "keyword": "洗钱威胁",
            "explain": "用虚假'洗钱'罪名制造恐惧，让你失去理智配合转账"
          }
        ]
      },
      {
        "id": "S11-end-safe",
        "name": "场景结束-安全退出",
        "type": "education",
        "summary": {
          "score": 100,
          "level": "优秀",
          "message": "你成功识破了假冒客服诈骗的所有套路！没有泄露任何信息，保护了自己的资金安全！",
          "keyLessons": [
            "正规平台不会主动用个人手机号联系办理退款",
            "验证码等于授权，等于钱被盗，绝对不能给任何人",
            "身份证号、银行卡号是最高敏感信息，不能透露给陌生人",
            "发现诈骗后应立即报警并联系银行冻结账户"
          ]
        }
      },
      {
        "id": "S11-end-report",
        "name": "场景结束-正确报案",
        "type": "education",
        "summary": {
          "score": 50,
          "level": "需加强",
          "message": "你及时醒悟并报警止损！但已经泄露了信息并损失了资金。",
          "keyLessons": [
            "验证码一旦泄露，账户就可能被控制，应立即致电银行冻结卡片",
            "发现被骗后应立即联系银行冻结账户，阻止进一步转账",
            "报警+银行冻结双管齐下，才能最大限度减少损失",
            "验证码=授权=钱被盗，是防骗的最高原则"
          ]
        }
      },
      {
        "id": "S11-end-lose",
        "name": "场景结束-血本无归",
        "type": "education",
        "summary": {
          "score": 0,
          "level": "极度危险",
          "message": "你经历了完整的假冒客服诈骗陷阱，信息泄露+资金被盗。这类诈骗追回率极低，重在预防！",
          "keyLessons": [
            "验证码=授权=钱被盗，绝对不能给任何人",
            "正规客服不会用个人手机号联系，不会要求提供验证码",
            "任何'安全账户'、'洗钱核查'都是诈骗",
            "发现信息泄露后应立即冻结银行卡，而不只是报警"
          ]
        }
      }
    ]
  },
  {
    "id": "S12",
    "name": "充值返利诈骗",
    "category": "充值诈骗",
    "description": "诈骗分子在游戏或社交平台发布话费、游戏点卡充值返利活动，先小额返利建立信任，随后大额充值后无法提现",
    "difficulty": 3,
    "estimated_time": 8,
    "stages": [
      {
        "id": "S12-01",
        "name": "撒网-充值返利",
        "type": "chat",
        "duration": 2,
        "messages": [
          {
            "who": "scammer",
            "text": "🎮【限时优惠】手机话费充值8折！充100送50，充200送120！",
            "time": "11:00"
          },
          {
            "who": "scammer",
            "text": "游戏点卡全网最低价！8.5折起！QQ币、抖音币、王者荣耀点券应有尽有！",
            "time": "11:00"
          },
          {
            "who": "scammer",
            "text": "需要的加V：recharge168，备注'充值'优先通过~",
            "time": "11:00"
          }
        ],
        "choices": [
          {
            "id": "A",
            "text": "8折充值太划算了！马上加微信！",
            "type": "danger",
            "score": 0,
            "tags": [
              "贪心"
            ],
            "next": "S12-02"
          },
          {
            "id": "B",
            "text": "先查查这个卖家靠不靠谱",
            "type": "neutral",
            "score": 50,
            "tags": [
              "核实"
            ],
            "next": "S12-01-b"
          },
          {
            "id": "C",
            "text": "官方充值不会这么便宜，这肯定是诈骗",
            "type": "safe",
            "score": 95,
            "tags": [
              "识破套路"
            ],
            "next": "S12-end-safe"
          }
        ],
        "riskPoints": [
          {
            "keyword": "8折话费",
            "explain": "正规充值不会有这么大的折扣，远低于正常价格的充值必有问题"
          },
          {
            "keyword": "点卡折扣",
            "explain": "游戏点卡折扣销售是诈骗分子的常见手法，用于洗钱或诈骗"
          }
        ]
      },
      {
        "id": "S12-01-b",
        "name": "核实阶段",
        "type": "chat",
        "duration": 1,
        "messages": [
          {
            "who": "scammer",
            "text": "📲 客服-小韩：您好！我们是官方授权代理商，折扣来自渠道返点，所以价格低~",
            "time": "11:05"
          },
          {
            "who": "scammer",
            "text": "[图片：伪造的授权书] [图片：大量客户好评截图]",
            "time": "11:05"
          },
          {
            "who": "scammer",
            "text": "我们做了3年了，已服务10000+客户！可以先看评价~",
            "time": "11:05"
          }
        ],
        "choices": [
          {
            "id": "A",
            "text": "好评这么多，应该靠谱，先充100试试",
            "type": "danger",
            "score": 10,
            "tags": [
              "轻信"
            ],
            "next": "S12-02"
          },
          {
            "id": "B",
            "text": "授权书能伪造，这些好评截图也是P的吧？",
            "type": "neutral",
            "score": 70,
            "tags": [
              "质疑"
            ],
            "next": "S12-02"
          },
          {
            "id": "C",
            "text": "正规充值不会用个人微信联系，太可疑了",
            "type": "safe",
            "score": 95,
            "tags": [
              "识破套路"
            ],
            "next": "S12-end-safe"
          }
        ],
        "riskPoints": [
          {
            "keyword": "伪造授权书",
            "explain": "骗子可以伪造任何授权文件增加可信度"
          },
          {
            "keyword": "好评截图",
            "explain": "好评截图可以批量伪造，不能作为信任依据"
          }
        ]
      },
      {
        "id": "S12-02",
        "name": "小额充值-返利成功",
        "type": "chat",
        "duration": 2,
        "messages": [
          {
            "who": "scammer",
            "text": "📋【充值订单】\n商品：话费100元\n支付金额：80元（8折）\n充值账号：138xxxx6228",
            "time": "11:10"
          },
          {
            "who": "scammer",
            "text": "✅ 充值成功！100元已到账！🎉",
            "time": "11:15"
          },
          {
            "who": "scammer",
            "text": "🎁 恭喜！您获得首充奖励！现在参与【充值返利】活动，充100返50，返利立即到账微信零钱！",
            "time": "11:15"
          }
        ],
        "choices": [
          {
            "id": "A",
            "text": "充100返50？！太划算了！马上参加！",
            "type": "danger",
            "score": -10,
            "tags": [
              "贪心"
            ],
            "next": "S12-03"
          },
          {
            "id": "B",
            "text": "等等，这个返利怎么比充值还多？",
            "type": "neutral",
            "score": 60,
            "tags": [
              "质疑"
            ],
            "next": "S12-03"
          },
          {
            "id": "C",
            "text": "充100返50，这不符合商业逻辑，肯定有问题",
            "type": "safe",
            "score": 95,
            "tags": [
              "识破本质"
            ],
            "next": "S12-end-safe"
          }
        ],
        "riskPoints": [
          {
            "keyword": "充值返利比本金高",
            "explain": "充值100返50，相当于你拿回150%，正常商业逻辑不可能，100%是诈骗"
          },
          {
            "keyword": "小额成功",
            "explain": "骗子用你的小额充值建立信任，为后续大额诈骗铺路"
          }
        ]
      },
      {
        "id": "S12-03",
        "name": "诱导大额充值",
        "type": "chat",
        "duration": 2,
        "messages": [
          {
            "who": "scammer",
            "text": "🎁【活动升级】今日特别福利！充500元返300元，充1000元返800元！限时2小时！",
            "time": "11:20"
          },
          {
            "who": "scammer",
            "text": "💰 名额只剩5个！再不充值就要等下周了！而且充值后立即返利到账微信零钱！",
            "time": "11:20"
          },
          {
            "who": "scammer",
            "text": "⚠️ 活动随时可能结束！错过今天再等一个月！",
            "time": "11:20"
          }
        ],
        "choices": [
          {
            "id": "A",
            "text": "1000返800，回报率80%！太划算了！马上充值！",
            "type": "danger",
            "score": -30,
            "tags": [
              "大额充值",
              "贪心"
            ],
            "next": "S12-04"
          },
          {
            "id": "B",
            "text": "为什么突然有这么大的活动？之前没有的",
            "type": "neutral",
            "score": 40,
            "tags": [
              "质疑"
            ],
            "next": "S12-04"
          },
          {
            "id": "C",
            "text": "这返利比充值还多，平台贴钱吗？肯定是诈骗！",
            "type": "safe",
            "score": 90,
            "tags": [
              "识破本质"
            ],
            "next": "S12-end-safe"
          }
        ],
        "riskPoints": [
          {
            "keyword": "限时名额",
            "explain": "制造紧迫感让你快速决策不思考，是诈骗分子常用手段"
          },
          {
            "keyword": "80%返利",
            "explain": "返利80%是正常商业逻辑不可能的，必然是诈骗"
          }
        ]
      },
      {
        "id": "S12-04",
        "name": "大额充值后无法提现",
        "type": "chat",
        "duration": 2,
        "messages": [
          {
            "who": "scammer",
            "text": "✅ 充值1000元已到账！正在处理返利...",
            "time": "11:30"
          },
          {
            "who": "scammer",
            "text": "⚠️【系统提示】您的账户存在【风控违规】，需要先充值2000元'风控保证金'才能提现！",
            "time": "11:32"
          },
          {
            "who": "scammer",
            "text": "💡 缴纳后，您的账户余额将变为2800元（本金1000+返利800+保证金2000），可一次性提现！",
            "time": "11:32"
          }
        ],
        "choices": [
          {
            "id": "A",
            "text": "2000换2800收益，划算！马上转！",
            "type": "danger",
            "score": -30,
            "tags": [
              "继续转账"
            ],
            "next": "S12-05"
          },
          {
            "id": "B",
            "text": "为什么提现还要交保证金？之前没说啊",
            "type": "neutral",
            "score": 50,
            "tags": [
              "质疑"
            ],
            "next": "S12-05"
          },
          {
            "id": "C",
            "text": "这是连环套！我报警了！",
            "type": "safe",
            "score": 85,
            "tags": [
              "止损报警"
            ],
            "next": "S12-end-report"
          }
        ],
        "riskPoints": [
          {
            "keyword": "风控保证金",
            "explain": "任何要求缴纳保证金才能提现的都是诈骗，是连环套的开始"
          },
          {
            "keyword": "连环套",
            "explain": "骗子会不断叠加费用，直到你再也拿不出钱"
          }
        ]
      },
      {
        "id": "S12-05",
        "name": "收割继续",
        "type": "chat",
        "duration": 2,
        "messages": [
          {
            "who": "scammer",
            "text": "✅ 保证金2000元已收到！正在处理提现...",
            "time": "11:40"
          },
          {
            "who": "scammer",
            "text": "😱 系统检测到您的账户已被【税务部门】标记！需要再缴纳3000元'税务证明金'，否则账户全部冻结！",
            "time": "11:41"
          },
          {
            "who": "scammer",
            "text": "⚠️ 这是最后一次！缴完后可一次性提现4800元！否则前面投入的3000元全部清零！",
            "time": "11:41"
          }
        ],
        "choices": [
          {
            "id": "A",
            "text": "贷款也要转！不能让前面的钱打水漂！",
            "type": "danger",
            "score": -50,
            "tags": [
              "贷款转账",
              "沉没成本"
            ],
            "next": "S12-end-lose"
          },
          {
            "id": "B",
            "text": "你们到底是哪个平台的？客服说辞一直在变！",
            "type": "neutral",
            "score": 40,
            "tags": [
              "质疑"
            ],
            "next": "S12-end-report"
          },
          {
            "id": "C",
            "text": "这是无底洞！我报警了！",
            "type": "safe",
            "score": 80,
            "tags": [
              "止损报警"
            ],
            "next": "S12-end-report"
          }
        ],
        "riskPoints": [
          {
            "keyword": "税务证明金",
            "explain": "骗子用虚假税务名义继续索要费用，是收割的最后手段"
          },
          {
            "keyword": "沉没成本",
            "explain": "已经投入的钱不是继续转账的理由，骗子正是利用这种心理"
          }
        ]
      },
      {
        "id": "S12-end-safe",
        "name": "场景结束-安全退出",
        "type": "education",
        "summary": {
          "score": 100,
          "level": "优秀",
          "message": "你成功识破了充值返利诈骗的所有套路！没有大额充值，保护了自己的资金安全！",
          "keyLessons": [
            "充值返利超过充值金额的100%是诈骗，正规渠道不会有这种优惠",
            "话费、点卡等虚拟商品应在官方渠道充值，不要贪图便宜",
            "任何要求缴纳保证金才能提现的都是诈骗",
            "发现任何异常立即停止，是防骗的关键"
          ]
        }
      },
      {
        "id": "S12-end-report",
        "name": "场景结束-正确报案",
        "type": "education",
        "summary": {
          "score": 50,
          "level": "及格",
          "message": "你在关键时刻选择了报警止损！但已经付出了一定代价。",
          "keyLessons": [
            "发现被骗后应立即报警，停止转账",
            "保留所有聊天记录和转账凭证",
            "不要试图用更多的钱'扳本'，那是无底洞",
            "充值应选择官方渠道，不要贪图便宜"
          ]
        }
      },
      {
        "id": "S12-end-lose",
        "name": "场景结束-血本无归",
        "type": "education",
        "summary": {
          "score": 0,
          "level": "极度危险",
          "message": "你经历了完整的充值返利诈骗陷阱，损失严重。这类诈骗追回率极低，重在预防！",
          "keyLessons": [
            "充值返利超过充值金额50%必是诈骗",
            "任何要求先交钱才能提现的都是诈骗",
            "骗子会叠加各种费用，直到你再也拿不出钱",
            "发现被骗后立即止损报警，不要试图'扳本'"
          ]
        }
      }
    ]
  }
];

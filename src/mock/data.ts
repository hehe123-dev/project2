// 轮播图
export const banners = [
  { id: 1, image: 'https://picsum.photos/seed/banner1/750/350', title: '北理工校友上市企业名录' },
  { id: 2, image: 'https://picsum.photos/seed/banner2/750/350', title: '北理工校友投资人及机构名录' },
  { id: 3, image: 'https://picsum.photos/seed/banner3/750/350', title: '北理工领先科技项目名录' },
  { id: 4, image: 'https://picsum.photos/seed/banner4/750/350', title: '平台服务成果年报' }
]

// 最新资讯
export const newsList = [
  { id: 1, title: '北京理工大学2026年校友企业家论坛成功举办', cover: 'https://picsum.photos/seed/news1/400/240', date: '2026-06-08', author: '管理员', summary: '6月5日，北京理工大学2026年校友企业家论坛在中关村校区隆重举行，来自全国各地的200余位校友企业家齐聚一堂，共话创新发展。', content: '<p>6月5日，北京理工大学2026年校友企业家论坛在中关村校区隆重举行，来自全国各地的200余位校友企业家齐聚一堂，共话创新发展。本次论坛以"科技创新与产业升级"为主题，围绕人工智能、新能源、先进制造等前沿领域展开深入研讨。</p><p>论坛开幕式上，学校领导介绍了近年来学校在科研创新、人才培养等方面取得的突出成就。多位优秀校友企业家代表分享了创业经验与行业洞察，引发了与会者的热烈讨论。</p><p>本次论坛还设立了项目路演环节，12个校友创业项目进行了展示，涵盖人工智能、生物医药、新材料等多个领域。现场多家投资机构与项目方达成初步合作意向。</p><p>论坛期间，校友们参观了学校重点实验室和创新中心，深入了解母校最新科研成果。多位校友表示，将进一步加强与母校的合作，推动产学研深度融合。</p>', views: 1256, likes: 89, comments: 23 },
  { id: 2, title: '白石桥七号会员企业走访——走进华为技术有限公司', cover: 'https://picsum.photos/seed/news2/400/240', date: '2026-06-05', author: '管理员', summary: '近日，白石桥七号组织会员企业代表赴华为技术有限公司参观交流，深入了解华为在5G、云计算等领域的创新成果。', content: '<p>近日，白石桥七号组织会员企业代表赴华为技术有限公司参观交流，深入了解华为在5G、云计算、人工智能等领域的创新成果。</p><p>参访团由白石桥七号发起人代表和会员企业家组成，一行30余人参观了华为深圳总部园区、研发中心和展示厅。华为技术专家详细介绍了公司在数字化转型、智能制造、智慧城市等领域的技术方案和应用案例。</p><p>座谈会上，双方就企业数字化转型的关键挑战和解决方案进行了深入交流。华为专家针对参访企业提出的具体问题给予了专业建议。</p>', views: 986, likes: 67, comments: 15 },
  { id: 3, title: '人工智能赋能制造业转型升级专题沙龙圆满落幕', cover: 'https://picsum.photos/seed/news3/400/240', date: '2026-06-01', author: '管理员', summary: '由白石桥七号主办的"AI赋能制造业"专题沙龙在北京成功举办，来自AI领域和制造业的40余位校友进行了深度交流。', content: '<p>由白石桥七号主办的"AI赋能制造业"专题沙龙在北京成功举办，来自AI领域和制造业的40余位校友进行了深度交流。</p><p>活动邀请了3位在人工智能和智能制造领域有丰富实践经验的校友进行了主题分享，内容涵盖工业视觉检测、预测性维护、智能排产等热门话题。</p>', views: 756, likes: 45, comments: 12 },
  { id: 4, title: '关于征集北理工校友企业产品入驻平台的通知', cover: 'https://picsum.photos/seed/news4/400/240', date: '2026-05-28', author: '管理员', summary: '为进一步丰富平台资源，现面向全体校友企业征集优质产品入驻白石桥七号商务平台。', content: '<p>为进一步丰富平台资源，更好地服务广大校友，现面向全体校友企业征集优质产品入驻白石桥七号商务平台。</p><p>征集范围包括但不限于：科技产品、消费品、工业品、专业服务等。入驻产品将获得平台专属展示位和精准推荐机会。</p>', views: 1567, likes: 112, comments: 35 }
]

// 活动
export const activityList = [
  { id: 1, type: '商务活动', reviewStatus: 'approved', title: '北理工校友企业投融资对接会', cover: 'https://picsum.photos/seed/act1/400/240', date: '2026-06-20', location: '北京中关村', status: '报名中', fee: 0, organizer: '张建国', orgAvatar: 'https://picsum.photos/seed/avatar1/100/100', publisher: { name: '张建国', avatar: 'https://picsum.photos/seed/avatar1/100/100', role: '商务会员' }, deadline: '2026-06-18', description: '为促进校友企业融资对接，本次投融资对接会将邀请多家知名投资机构参与，为校友企业提供展示和对接机会。欢迎有融资需求的校友企业报名参加。', registered: 28 },
  { id: 2, type: '校友活动', reviewStatus: 'approved', title: '走进字节跳动——数字化转型与组织创新', cover: 'https://picsum.photos/seed/act2/400/240', date: '2026-07-05', location: '北京海淀', status: '报名中', fee: 200, organizer: '李明远', orgAvatar: 'https://picsum.photos/seed/avatar2/100/100', publisher: { name: '李明远', avatar: 'https://picsum.photos/seed/avatar2/100/100', role: '认证校友' }, deadline: '2026-07-01', description: '参访字节跳动总部，学习其在数字化转型、组织管理创新和企业文化建设方面的先进经验。活动费用包含交通和午餐。', registered: 45 },
  { id: 3, type: '商务活动', reviewStatus: 'approved', title: '2026北理工校友创业项目路演（第二季）', cover: 'https://picsum.photos/seed/act3/400/240', date: '2026-07-15', location: '北京朝阳', status: '报名中', fee: 0, organizer: '王军', orgAvatar: 'https://picsum.photos/seed/avatar3/100/100', publisher: { name: '王军', avatar: 'https://picsum.photos/seed/avatar3/100/100', role: '商务会员' }, deadline: '2026-07-10', description: '为展示校友创业成果、对接产业资源和资本支持，特举办2026年度第二季校友创业项目路演活动。欢迎创业校友报名展示，也欢迎投资人校友参与评审。', registered: 56 },
  { id: 4, type: '校友活动', reviewStatus: 'pending', title: '北理工羽毛球校友联谊赛', cover: 'https://picsum.photos/seed/act4/400/240', date: '2026-07-22', location: '北京理工大学体育馆', status: '报名中', fee: 50, organizer: '赵明辉', orgAvatar: 'https://picsum.photos/seed/m1/100/100', publisher: { name: '赵明辉', avatar: 'https://picsum.photos/seed/m1/100/100', role: '认证校友' }, deadline: '2026-07-20', description: '面向全体北理工校友的羽毛球友谊赛，设有男单、女单、混双三个项目。欢迎各水平的羽毛球爱好者参加，以球会友！', registered: 18 },
  { id: 5, type: '商务活动', reviewStatus: 'pending', title: '校友企业联合招聘会（北京站）', cover: 'https://picsum.photos/seed/act5/400/240', date: '2026-08-10', location: '北京中关村国际人才中心', status: '未开始', fee: 0, organizer: '陈晓华', orgAvatar: 'https://picsum.photos/seed/u2/100/100', publisher: { name: '陈晓华', avatar: 'https://picsum.photos/seed/u2/100/100', role: '商务会员' }, deadline: '2026-08-05', description: '由白石桥七号平台联合20余家校友企业举办的大型线下招聘会，涵盖AI、新能源、生物医药、金融等多个行业。欢迎求职校友前来应聘、欢迎招聘企业报名设展。', registered: 12 },
  { id: 6, type: '平台活动', reviewStatus: 'approved', title: '白石桥七号年度校友大会', cover: 'https://picsum.photos/seed/act6/400/240', date: '2026-09-15', location: '北京国家会议中心', status: '未开始', fee: 0, organizer: '平台运营', orgAvatar: 'https://picsum.photos/seed/admin/100/100', publisher: { name: '平台运营', avatar: 'https://picsum.photos/seed/admin/100/100', role: '平台' }, deadline: '2026-09-10', description: '一年一度的白石桥七号校友大会，将邀请校领导、各行业杰出校友代表发表演讲，回顾平台年度成果，展望未来发展蓝图。欢迎全体校友踊跃报名参加！', registered: 320 }
]

// 校友动态
export const feedList = [
  { id: 1, user: { name: '张建国', avatar: 'https://picsum.photos/seed/u1/100/100', school: '自动化学院', year: '2005级' }, content: '今天参加了母校的校友企业家论坛，见到了许多老同学，感慨万千！母校的发展令人振奋，为是一名北理工人而自豪！', images: ['https://picsum.photos/seed/feed1a/400/300', 'https://picsum.photos/seed/feed1b/400/300'], date: '2026-06-08 14:30', likes: 32, comments: 8, liked: false },
  { id: 2, user: { name: '陈晓华', avatar: 'https://picsum.photos/seed/u2/100/100', school: '计算机学院', year: '2008级' }, content: '我们公司新研发的智能安防系统已经在全国多个城市落地应用，感谢白石桥七号平台对接的合作伙伴，让好产品能被更多人看到！', images: ['https://picsum.photos/seed/feed2a/400/300', 'https://picsum.photos/seed/feed2b/400/300', 'https://picsum.photos/seed/feed2c/400/300'], date: '2026-06-07 10:15', likes: 56, comments: 12, liked: true },
  { id: 3, user: { name: '刘芳', avatar: 'https://picsum.photos/seed/u3/100/100', school: '管理与经济学院', year: '2010级' }, content: '分享一个好消息：我们团队获得了A轮融资5000万！感谢一路支持我的校友们，特别是李明远师兄在关键时刻给予的指导和建议。北理工校友的力量真的很强大！', images: [], date: '2026-06-06 18:45', likes: 128, comments: 35, liked: false }
]

// 校友名片
export const alumniList = [
  { id: 1, name: '张建国', avatar: 'https://picsum.photos/seed/u1/100/100', school: '自动化学院', major: '控制科学与工程', year: '2005级', degree: '硕士', city: '北京', industry: '人工智能', company: '北京智控科技有限公司', title: '创始人兼CEO', tags: ['创业', '人工智能', '智能制造'], intro: '15年自动化与人工智能行业经验，曾任职于西门子、ABB等世界500强企业。2018年创立智控科技，专注于工业智能控制领域。', phone: '138****6789', email: 'zhangjg@example.com', wechat: 'zhangjianguo_bit', exchanged: false },
  { id: 2, name: '李明远', avatar: 'https://picsum.photos/seed/u2/100/100', school: '计算机学院', major: '计算机科学与技术', year: '2008级', degree: '本科', city: '深圳', industry: '互联网', company: '字节跳动', title: '技术总监', tags: ['互联网', '大数据', '技术管理'], intro: '10年互联网行业经验，先后在百度、腾讯担任核心技术岗位。目前负责字节跳动某核心业务线的技术管理工作。', phone: '139****1234', email: 'limy@example.com', wechat: 'limingyuan_bit', exchanged: false },
  { id: 3, name: '王军', avatar: 'https://picsum.photos/seed/u3/100/100', school: '机械与车辆学院', major: '车辆工程', year: '2003级', degree: '博士', city: '上海', industry: '新能源汽车', company: '蔚来汽车', title: '副总裁', tags: ['新能源汽车', '自动驾驶', '研发管理'], intro: '新能源汽车领域资深专家，拥有20余项发明专利。在蔚来汽车负责自动驾驶技术研发团队。', phone: '136****5678', email: 'wangjun@example.com', wechat: 'wangjun_bit', exchanged: true }
]

// 校友社团
export const groupList = [
  { id: 1, name: '北理工人工智能校友会', logo: 'https://picsum.photos/seed/g1/200/200', category: '行业社团', leader: '赵明辉', phone: '138****0001', intro: '汇聚人工智能领域的北理工校友，定期举办技术交流、项目合作和人才对接活动。目前已有成员200余人，涵盖AI算法、芯片、应用等多个细分方向。', memberCount: 218, news: [{ id: 1, title: 'AI校友会春季技术交流会圆满举办' }, { id: 2, title: 'AI校友会赴商汤科技参观学习' }], activities: [
    { id: 1, title: '大模型技术研讨会', date: '2026-06-20', location: '中关村软件园国际会议中心', description: '邀请业界大咖分享大模型最新技术进展与应用实践，设有圆桌讨论和自由交流环节，欢迎校友踊跃参加。' },
    { id: 2, title: 'AI校友会春季户外团建', date: '2026-05-15', location: '奥林匹克森林公园', description: '春季户外团建活动，包含趣味运动、团队协作挑战和BBQ聚餐，增进校友感情。' }
  ], members: [
    { name: '赵明辉', avatar: 'https://picsum.photos/seed/m1/100/100', school: '自动化学院', year: '2005级', joinDate: '2025-03-01' },
    { name: '张建国', avatar: 'https://picsum.photos/seed/u1/100/100', school: '自动化学院', year: '2005级', joinDate: '2025-03-10' },
    { name: '李明远', avatar: 'https://picsum.photos/seed/u2/100/100', school: '计算机学院', year: '2008级', joinDate: '2025-06-15' }
  ] },
  { id: 2, name: '北理工金融投资校友俱乐部', logo: 'https://picsum.photos/seed/g2/200/200', category: '行业社团', leader: '陈立', phone: '139****0002', intro: '由从事金融投资行业的校友发起，旨在搭建校友间的投融资对接平台。成员涵盖VC、PE、证券、银行等金融机构。', memberCount: 156, news: [{ id: 1, title: '2026年投资趋势研讨会成功举行' }], activities: [
    { id: 1, title: '校友企业投融资对接会', date: '2026-07-08', location: '北京市朝阳区国贸三期', description: '为有融资需求的校友企业对接投资机构，提供路演展示和一对一交流机会，助力校友企业发展。' },
    { id: 2, title: '二级市场投资沙龙', date: '2026-06-25', location: '金融街威斯汀酒店', description: '邀请券商首席分析师分享下半年投资策略，涵盖A股、港股和美股市场展望。' }
  ], members: [
    { name: '陈立', avatar: 'https://picsum.photos/seed/m2/100/100', school: '管理与经济学院', year: '2006级', joinDate: '2025-02-20' }
  ] },
  { id: 3, name: '北理工北京校友足球队', logo: 'https://picsum.photos/seed/g3/200/200', category: '兴趣社团', leader: '孙磊', phone: '137****0003', intro: '热爱足球的北理工北京校友聚集地，每周组织训练和友谊赛。以球会友，锻炼身体，增进情谊。', memberCount: 68, news: [], activities: [
    { id: 1, title: '友谊赛 vs 清华校友队', date: '2026-06-28', location: '北京理工大学中关村校区体育场', description: '一年一度的北理 vs 清华校友足球友谊赛，欢迎各位校友前来观赛助威！赛后安排聚餐交流。' },
    { id: 2, title: '每周六常规训练', date: '2026-06-21', location: '奥体中心足球场', description: '每周六下午2-5点的常规训练，欢迎各水平的校友参加。新加入的校友请提前联系负责人。' }
  ], members: [
    { name: '孙磊', avatar: 'https://picsum.photos/seed/m3/100/100', school: '机械与车辆学院', year: '2007级', joinDate: '2024-09-01' },
    { name: '王军', avatar: 'https://picsum.photos/seed/u4/100/100', school: '机械与车辆学院', year: '2010级', joinDate: '2024-10-15' }
  ] },
  { id: 4, name: '北理工广东校友会', logo: 'https://picsum.photos/seed/g4/200/200', category: '地方社团', leader: '黄文杰', phone: '135****0004', intro: '广东地区北理工校友的联络平台，为在粤校友提供交流、互助和发展支持。定期组织企业走访、技术沙龙和联谊活动。', memberCount: 320, news: [], activities: [
    { id: 1, title: '深圳校友企业走访——华为松山湖', date: '2026-07-15', location: '华为松山湖基地', description: '组织校友走访华为松山湖基地，参观华为研发中心，与华为校友进行技术交流与经验分享。名额有限，先到先得。' }
  ], members: [
    { name: '黄文杰', avatar: 'https://picsum.photos/seed/m4/100/100', school: '信息与电子学院', year: '2004级', joinDate: '2023-05-10' },
    { name: '陈晓华', avatar: 'https://picsum.photos/seed/u2/100/100', school: '材料学院', year: '2006级', joinDate: '2024-01-20' }
  ] }
]

// 入团申请
export const groupJoinRequests = [
  { id: 1, groupId: 1, groupName: '北理工人工智能校友会', userName: '李明远', userAvatar: 'https://picsum.photos/seed/u2/100/100', school: '计算机学院', year: '2008级', applyReason: '从事AI行业，希望与更多校友交流合作', applyDate: '2026-06-12', status: 'pending' },
  { id: 2, groupId: 2, groupName: '北理工金融投资校友俱乐部', userName: '赵明辉', userAvatar: 'https://picsum.photos/seed/myavatar/100/100', school: '自动化学院', year: '2005级', applyReason: '正在做创业公司融资，希望获得金融圈校友资源', applyDate: '2026-06-10', status: 'pending' },
  { id: 3, groupId: 3, groupName: '北理工北京校友足球队', userName: '王军', userAvatar: 'https://picsum.photos/seed/u4/100/100', school: '机械与车辆学院', year: '2010级', applyReason: '热爱足球，想和校友们一起踢比赛', applyDate: '2026-06-08', status: 'pending' },
  { id: 4, groupId: 1, groupName: '北理工人工智能校友会', userName: '孙磊', userAvatar: 'https://picsum.photos/seed/m3/100/100', school: '信息与电子学院', year: '2007级', applyReason: 'AI创业者，希望找到技术合伙人', applyDate: '2026-06-05', status: 'approved' },
  { id: 5, groupId: 4, groupName: '北理工广东校友会', userName: '陈晓华', userAvatar: 'https://picsum.photos/seed/u2/100/100', school: '材料学院', year: '2006级', applyReason: '新搬来广州工作，希望认识更多本地校友', applyDate: '2026-06-01', status: 'rejected' }
]

// 会员名片
export const memberList = [
  { id: 1, name: '张建国', avatar: 'https://picsum.photos/seed/u1/100/100', school: '自动化学院', year: '2005级', city: '北京', industry: '人工智能', memberSince: '2025-03', company: '北京智控科技有限公司', title: '创始人兼CEO', intro: '15年自动化与人工智能行业经验，专注于工业智能控制领域。公司已获A轮融资，服务客户超过100家制造企业。', companies: [{ id: 1, name: '北京智控科技有限公司', logo: 'https://picsum.photos/seed/logo1/200/200', industry: '人工智能' }], products: [{ id: 1, name: '智控工业AI平台', cover: 'https://picsum.photos/seed/prod1/400/300' }] },
  { id: 2, name: '李明远', avatar: 'https://picsum.photos/seed/u2/100/100', school: '计算机学院', year: '2008级', city: '深圳', industry: '互联网', memberSince: '2025-06', company: '字节跳动', title: '技术总监', intro: '10年互联网行业经验，在分布式系统和大数据平台方面有深厚积累。', companies: [], products: [] },
  { id: 3, name: '刘芳', avatar: 'https://picsum.photos/seed/u3/100/100', school: '管理与经济学院', year: '2010级', city: '北京', industry: '生物医药', memberSince: '2026-01', company: '北京康源生物科技有限公司', title: 'CEO', intro: '连续创业者，专注于创新药物研发。公司已获B轮融资2亿元。', companies: [{ id: 1, name: '北京康源生物科技有限公司', logo: 'https://picsum.photos/seed/logo2/200/200', industry: '生物医药' }], products: [{ id: 1, name: '新型抗肿瘤药物K-101', cover: 'https://picsum.photos/seed/prod2/400/300' }] }
]

// 会员企业
export const companyList = [
  { id: 1, name: '北京智控科技有限公司', logo: 'https://picsum.photos/seed/logo1/200/200', industry: '人工智能', address: '北京市海淀区中关村软件园', founder: '张建国', intro: '智控科技成立于2018年，专注于工业智能控制领域，为制造企业提供AI驱动的智能控制解决方案。公司已获A轮融资，服务客户超过100家。', products: [{ id: 1, name: '智控工业AI平台', cover: 'https://picsum.photos/seed/prod1/400/300', intro: '基于深度学习的工业过程控制和优化平台，可降低能耗15%，提升产能20%。' }, { id: 2, name: '智能质检系统', cover: 'https://picsum.photos/seed/prod3/400/300', intro: '基于计算机视觉的产品质量检测系统，检测精度达到99.5%。' }] },
  { id: 2, name: '北京康源生物科技有限公司', logo: 'https://picsum.photos/seed/logo2/200/200', industry: '生物医药', address: '北京市昌平区生命科学园', founder: '刘芳', intro: '康源生物专注于创新药物研发，以肿瘤免疫治疗为核心方向。公司拥有多项自主知识产权，研发管线涵盖小分子药物和生物制剂。', products: [{ id: 1, name: '新型抗肿瘤药物K-101', cover: 'https://picsum.photos/seed/prod2/400/300', intro: '针对非小细胞肺癌的新型靶向药物，目前处于临床II期。' }] },
  { id: 3, name: '深圳星辰科技有限公司', logo: 'https://picsum.photos/seed/logo3/200/200', industry: '新能源', address: '深圳市南山区科技园', founder: '陈晓华', intro: '星辰科技致力于新能源储能技术的研发和应用，产品覆盖家庭储能、工商业储能和电网级储能。公司已获C轮融资3亿元。', products: [] }
]

// 会员产品
export const productList = [
  { id: 1, name: '智控工业AI平台', cover: 'https://picsum.photos/seed/prod1/400/300', company: '北京智控科技有限公司', industry: '人工智能', intro: '基于深度学习的工业过程控制和优化平台，通过实时数据分析和智能决策，帮助企业实现生产过程的最优化控制。', features: ['降低能耗15%', '提升产能20%', '实时监控与预警', '兼容主流PLC/DCS系统'], applications: '适用于化工、钢铁、水泥、电力等流程工业领域。' },
  { id: 2, name: '新型抗肿瘤药物K-101', cover: 'https://picsum.photos/seed/prod2/400/300', company: '北京康源生物科技有限公司', industry: '生物医药', intro: '针对非小细胞肺癌的新型靶向药物，具有高选择性和低毒性的特点。', features: ['高选择性靶向', '低毒副作用', '口服给药', '联合用药潜力'], applications: '非小细胞肺癌（NSCLC）二线治疗，目前处于临床II期。' },
  { id: 3, name: '智能安防监控系统', cover: 'https://picsum.photos/seed/prod3/400/300', company: '深圳星辰科技有限公司', industry: '安防', intro: '基于AI视觉分析的智能安防监控系统，支持人脸识别、行为分析和异常检测。', features: ['实时人脸识别', '异常行为检测', '多摄像头联动', '云端+边缘部署'], applications: '适用于社区、园区、商场、学校等场所的安全监控。' }
]

// 校友互助
export const helpList = [
  { id: 1, title: '寻找新能源电池领域的技术合作伙伴', publisher: { name: '陈晓华', avatar: 'https://picsum.photos/seed/u2/100/100', role: '商务会员' }, date: '2026-06-08', description: '我们公司正在开发新一代储能电池管理系统，需要寻找在电池管理芯片或算法方面有技术积累的校友合作。最好在深圳或广州地区。', status: '未解决', responseCount: 3, responses: [
    { name: '张建国', avatar: 'https://picsum.photos/seed/u1/100/100', text: '我在深圳认识几个做BMS的团队，可以帮忙牵线。', time: '2026-06-09' },
    { name: '赵明辉', avatar: 'https://picsum.photos/seed/m1/100/100', text: '我们有一个储能方向的项目，可以聊一下合作。', time: '2026-06-10' }
  ] },
  { id: 2, title: '求推荐靠谱的医疗器械注册代理机构', publisher: { name: '刘芳', avatar: 'https://picsum.photos/seed/u3/100/100', role: '商务会员' }, date: '2026-06-05', description: '公司有一款二类医疗器械需要注册，求推荐有经验的代理机构，最好在北京地区，有成功案例的优先。', status: '已解决', responseCount: 5, responses: [
    { name: '李明远', avatar: 'https://picsum.photos/seed/u2/100/100', text: '我可以帮忙对接，我们公司之前合作过一个不错的代理机构，我发给你。', time: '2026-06-06' }
  ] },
  { id: 3, title: '公司招聘——高级前端工程师（北京）', publisher: { name: '张建国', avatar: 'https://picsum.photos/seed/u1/100/100', role: '商务会员' }, date: '2026-06-01', description: '智控科技招聘高级前端工程师，要求3年以上Vue/React开发经验，薪资30-50K，14薪，期权可谈。欢迎校友推荐或自荐。', status: '未解决', responseCount: 2, responses: [] },
  { id: 4, title: '求校友内推——想跳槽到互联网大厂', publisher: { name: '王磊', avatar: 'https://picsum.photos/seed/u5/100/100', role: '认证校友' }, date: '2026-06-10', description: '本人计算机学院2018级，目前在传统制造业做后端开发，想跳槽去互联网大厂。求校友帮忙内推，主要看北京的机会。', status: '未解决', responseCount: 4, responses: [] },
  { id: 5, title: '考研咨询——想跨考自动化学院', publisher: { name: '周小雅', avatar: 'https://picsum.photos/seed/u6/100/100', role: '普通用户' }, date: '2026-06-12', description: '我是北理本科大三学生，现在学的是机械，想跨考自动化学院的研究生。想咨询一下自动化学院的学长学姐，哪些方向比较好？导师推荐？', status: '未解决', responseCount: 6, responses: [] },
  { id: 6, title: '提供法律咨询公益服务', publisher: { name: '王律师事务所', avatar: 'https://picsum.photos/seed/u7/100/100', role: '服务机构' }, date: '2026-06-15', description: '我们是一家专注于企业法律服务的律所，现面向白石桥七号校友企业提供免费法律咨询服务。涵盖公司法、知识产权、劳动法等领域。', status: '未解决', responseCount: 1, responses: [] },
  { id: 7, title: '北京车牌指标出租或转让求助', publisher: { name: '杨帆', avatar: 'https://picsum.photos/seed/u8/100/100', role: '普通用户' }, date: '2026-06-14', description: '刚毕业在北京工作，急需解决通勤问题。想问问有没有校友出租或转让北京车牌指标的渠道？靠谱的中介也可以推荐。', status: '未解决', responseCount: 0, responses: [] }
]

// 主题分享
export const topicList = [
  { id: 1, title: '从0到1：我的AI创业之路', cover: 'https://picsum.photos/seed/topic1/400/240', author: '张建国', date: '2026-06-01', summary: '分享我在人工智能领域的创业经历和感悟，包括如何找到创业方向、组建团队、获得融资等。', content: '<p>大家好，我是自动化学院2005级的张建国。今天想和大家分享一下我在AI领域的创业历程。</p><p>2018年，我离开西门子创办了智控科技。当时看到了工业智能化转型的巨大机遇，决定投身其中。</p><p>创业初期最大的困难是找到产品市场契合点（PMF）。我们花了近一年时间，走访了50多家制造企业，深入了解他们的真实痛点，最终确定了以工业过程控制为切入点。</p><p>关于融资，我的建议是：先做出可演示的产品原型，拿到标杆客户，再去找投资人。我们的A轮融资就是在服务了10家付费客户之后完成的。</p>', views: 2356, likes: 156 },
  { id: 2, title: '新能源汽车行业发展趋势与机会', cover: 'https://picsum.photos/seed/topic2/400/240', author: '王军', date: '2026-05-25', summary: '基于我在蔚来汽车的工作经验，分享对新能源汽车行业未来发展的判断和投资机会分析。', content: '<p>作为在新能源汽车行业工作多年的从业者，我想分享一些对这个行业未来发展的看法。</p><p>首先，电动化已经是确定的趋势。预计到2030年，中国新能源汽车渗透率将超过60%。</p><p>其次，智能化是下一个竞争焦点。自动驾驶、智能座舱、车路协同等领域存在大量创新机会。</p>', views: 1890, likes: 98 }
]

// 会员专访
export const interviewList = [
  { id: 1, title: '从技术专家到创业者——专访智控科技CEO张建国', cover: 'https://picsum.photos/seed/interview1/400/240', author: '平台编辑部', date: '2026-05-20', summary: '张建国校友分享了从西门子技术专家到创办智控科技的心路历程，以及对工业AI未来发展的深刻思考。', content: '<p><strong>问：是什么促使你离开外企选择创业？</strong></p><p>张建国：在西门子工作了近10年，虽然职位一直在升，但内心始终有一个声音——我想做一件属于自己的事情。2018年看到国内制造业智能化转型的需求爆发，我判断这是一个千载难逢的机会窗口。</p><p><strong>问：创业过程中最大的挑战是什么？</strong></p><p>张建国：最大的挑战是从技术思维转向商业思维。做技术时追求完美，但做产品要追求"够用"。这个转变花了我至少一年时间。</p>', views: 3210, likes: 210 },
  { id: 2, title: '创新药研发的北理工力量——访康源生物CEO刘芳', cover: 'https://picsum.photos/seed/interview2/400/240', author: '平台编辑部', date: '2026-05-15', summary: '刘芳校友分享了在创新药研发领域的创业故事，以及如何借助校友平台资源加速企业发展。', content: '<p><strong>问：为什么选择肿瘤免疫治疗这个方向？</strong></p><p>刘芳：我母亲因癌症去世，这成为我投身肿瘤药物研发的原动力。我希望通过自己的努力，让更多患者能够获得有效且可负担的治疗。</p><p><strong>问：校友平台对你的帮助大吗？</strong></p><p>刘芳：非常大！我们的B轮投资方就是通过白石桥七号平台对接上的。此外，平台上的几位医药行业校友在临床资源方面也给了我们很大支持。</p>', views: 2180, likes: 145 }
]

// 课程
export const courseList = [
  {
    id: 1,
    title: '企业数字化转型实战指南',
    subtitle: '从战略到落地，一站式掌握数字化转型方法论',
    cover: 'https://picsum.photos/seed/course1/750/420',
    teacher: '张建国',
    teacherAvatar: 'https://picsum.photos/seed/u1/200/200',
    teacherTitle: '智控科技创始人 · 北理工2005级',
    teacherBio: '15年数字化转型经验，曾主导多家世界500强企业的数字化项目。智控科技创始人，A轮已融资1亿元。著有《工业智能化转型》。',
    price: 299,
    originalPrice: 599,
    memberPrice: 249,
    students: 1280,
    duration: '12课时',
    totalMinutes: 360,
    rating: 4.9,
    reviews: 326,
    category: '企业管理',
    tags: ['热门精选', '专家课', '14天回看'],
    intro: '从战略规划到落地执行，系统讲解企业数字化转型的方法论和实战经验。',
    highlights: ['12课时系统讲解', '20+真实案例', '配套电子讲义', '社群答疑1对1', '永久回看权'],
    chapters: [
      { id: 1, title: '第一章 数字化转型概述', lessons: [
        { id: 1, title: '1.1 什么是数字化转型', duration: '15:30', preview: true },
        { id: 2, title: '1.2 数字化转型的三个层次', duration: '18:45', preview: false },
        { id: 3, title: '1.3 国内外典型案例对比', duration: '22:10', preview: false }
      ]},
      { id: 2, title: '第二章 转型战略制定', lessons: [
        { id: 4, title: '2.1 现状评估方法', duration: '20:15', preview: false },
        { id: 5, title: '2.2 战略路径设计', duration: '25:40', preview: false }
      ]},
      { id: 3, title: '第三章 组织变革管理', lessons: [
        { id: 6, title: '3.1 组织架构调整', duration: '19:20', preview: false },
        { id: 7, title: '3.2 文化与人才转型', duration: '23:55', preview: false }
      ]},
      { id: 4, title: '第四章 技术架构设计', lessons: [
        { id: 8, title: '4.1 数据中台搭建', duration: '28:30', preview: false },
        { id: 9, title: '4.2 业务系统集成', duration: '24:15', preview: false }
      ]},
      { id: 5, title: '第五章 落地实施', lessons: [
        { id: 10, title: '5.1 试点选择', duration: '20:00', preview: false },
        { id: 11, title: '5.2 推广策略', duration: '21:30', preview: false },
        { id: 12, title: '5.3 持续优化', duration: '20:50', preview: false }
      ]}
    ],
    reviewList: [
      { user: '王工程师', avatar: 'https://picsum.photos/seed/r1/100/100', rating: 5, date: '2026-06-05', content: '内容非常实用，老师讲得深入浅出，案例都是真实的，对我们公司的数字化转型有很大启发。' },
      { user: '李总监', avatar: 'https://picsum.photos/seed/r2/100/100', rating: 5, date: '2026-05-28', content: '系统性强，从战略到落地都有涉及，是难得的好课程。强烈推荐给企业管理者。' },
      { user: '赵创始人', avatar: 'https://picsum.photos/seed/r3/100/100', rating: 4, date: '2026-05-20', content: '干货满满，特别是组织变革那一章，正好解决了我们当前的痛点。' }
    ]
  },
  {
    id: 2,
    title: '创业者的财务管理课',
    subtitle: '让创业者真正读懂财务报表，做出明智决策',
    cover: 'https://picsum.photos/seed/course2/750/420',
    teacher: '陈立',
    teacherAvatar: 'https://picsum.photos/seed/u2/200/200',
    teacherTitle: '资深财务顾问 · 北理工2007级',
    teacherBio: '注册会计师CPA，曾任四大会计师事务所高级经理。10年创业服务经验，已帮助50+创业公司完成融资。',
    price: 199,
    originalPrice: 399,
    memberPrice: 159,
    students: 856,
    duration: '8课时',
    totalMinutes: 240,
    rating: 4.8,
    reviews: 218,
    category: '创业',
    tags: ['限时优惠', '新课首发'],
    intro: '帮助创业者建立财务思维，掌握现金流管理、融资估值等核心技能。',
    highlights: ['8课时精品内容', '15份财务模板', '案例全部实战', '群内答疑'],
    chapters: [
      { id: 1, title: '第一章 财务三表入门', lessons: [
        { id: 1, title: '1.1 资产负债表精讲', duration: '20:00', preview: true },
        { id: 2, title: '1.2 利润表关键指标', duration: '18:30', preview: false }
      ]},
      { id: 2, title: '第二章 现金流管理', lessons: [
        { id: 3, title: '2.1 现金流为王', duration: '22:15', preview: false },
        { id: 4, title: '2.2 资金计划制定', duration: '19:45', preview: false }
      ]},
      { id: 3, title: '第三章 融资估值', lessons: [
        { id: 5, title: '3.1 估值方法详解', duration: '25:30', preview: false },
        { id: 6, title: '3.2 融资条款解读', duration: '23:10', preview: false }
      ]}
    ],
    reviewList: [
      { user: '张创业', avatar: 'https://picsum.photos/seed/r4/100/100', rating: 5, date: '2026-06-01', content: '陈老师讲课很有条理，把复杂的财务知识讲得很清楚。' },
      { user: '刘总', avatar: 'https://picsum.photos/seed/r5/100/100', rating: 5, date: '2026-05-15', content: '估值那一章特别实用，正好用上了。' }
    ]
  },
  {
    id: 3,
    title: 'AI产品经理入门到精通',
    subtitle: '抓住AI浪潮，从0到1打造爆款AI产品',
    cover: 'https://picsum.photos/seed/course3/750/420',
    teacher: '李明远',
    teacherAvatar: 'https://picsum.photos/seed/u3/200/200',
    teacherTitle: '字节跳动技术总监 · 北理工2008级',
    teacherBio: '10年互联网产品经验，先后在百度、腾讯、字节担任核心产品岗位。负责的AI产品累计用户过亿。',
    price: 399,
    originalPrice: 799,
    memberPrice: 319,
    students: 2100,
    duration: '16课时',
    totalMinutes: 480,
    rating: 4.95,
    reviews: 587,
    category: '产品',
    tags: ['口碑爆款', '专家课', '送学习社群'],
    intro: '从AI基础到产品设计，全面培养AI产品经理的核心能力。',
    highlights: ['16课时深度内容', '30+实战案例', '专属学习社群', '7天试看期', '永久回看'],
    chapters: [
      { id: 1, title: '第一章 AI产品认知', lessons: [
        { id: 1, title: '1.1 AI产品的本质', duration: '18:30', preview: true },
        { id: 2, title: '1.2 AI产品分类与场景', duration: '20:45', preview: true }
      ]},
      { id: 2, title: '第二章 用户研究方法', lessons: [
        { id: 3, title: '2.1 AI用户画像构建', duration: '22:10', preview: false },
        { id: 4, title: '2.2 需求挖掘', duration: '19:50', preview: false }
      ]},
      { id: 3, title: '第三章 产品设计实战', lessons: [
        { id: 5, title: '3.1 交互设计原则', duration: '25:00', preview: false },
        { id: 6, title: '3.2 模型与体验平衡', duration: '21:30', preview: false }
      ]}
    ],
    reviewList: [
      { user: '产品小王', avatar: 'https://picsum.photos/seed/r6/100/100', rating: 5, date: '2026-06-08', content: '李老师的课真的太棒了，内容深度和广度都很到位。' },
      { user: '设计师Lisa', avatar: 'https://picsum.photos/seed/r7/100/100', rating: 5, date: '2026-06-03', content: '从产品视角讲AI，给我打开了新思路。强推！' },
      { user: '创业者Alex', avatar: 'https://picsum.photos/seed/r8/100/100', rating: 5, date: '2026-05-25', content: '我们公司在做AI产品，这门课解决了我很多疑惑。' }
    ]
  }
]

// 团购
export const groupBuyList = [
  {
    id: 1,
    title: '北理工校庆纪念版双肩包',
    cover: 'https://picsum.photos/seed/gb1/400/400',
    images: ['https://picsum.photos/seed/gb1a/750/750', 'https://picsum.photos/seed/gb1b/750/750', 'https://picsum.photos/seed/gb1c/750/750'],
    price: 169,
    originalPrice: 399,
    soldCount: 456,
    totalCount: 600,
    endDate: '2026-06-30',
    category: '校园文创',
    supplier: '北理工校友文创工作室',
    desc: '为庆祝北理工建校纪念，特别推出的限量版双肩包。采用高品质防泼水面料，大容量主仓+独立电脑隔层，适合日常通勤和短途出行。',
    specs: ['材质：高密度防泼水尼龙', '尺寸：45×30×18cm', '容量：约25L', '颜色：深灰/藏蓝可选', '刺绣校徽+白石桥七号专属标识'],
    shipping: '下单后3个工作日内发货，全国包邮（偏远地区除外）',
    tags: ['限量', '包邮', '校庆纪念']
  },
  {
    id: 2,
    title: '校友企业出品——有机五常大米 5kg装',
    cover: 'https://picsum.photos/seed/gb2/400/400',
    images: ['https://picsum.photos/seed/gb2a/750/750', 'https://picsum.photos/seed/gb2b/750/750'],
    price: 78,
    originalPrice: 158,
    soldCount: 890,
    totalCount: 1000,
    endDate: '2026-06-25',
    category: '食品特产',
    supplier: '黑龙江五常校友农场',
    desc: '由黑龙江校友自营农场直供的有机五常大米，产自五常核心产区，一年一季，米粒晶莹饱满，口感软糯香甜。通过国家有机认证，从田间直达餐桌。',
    specs: ['净重：5kg', '品种：稻花香2号', '产地：黑龙江五常市', '保质期：12个月', '有机认证 + 地理标志产品'],
    shipping: '下单后48小时内发货，全国包邮',
    tags: ['包邮', '有机认证', '校友自营']
  },
  {
    id: 3,
    title: '白石桥七号定制款紫砂茶具套装',
    cover: 'https://picsum.photos/seed/gb3/400/400',
    images: ['https://picsum.photos/seed/gb3a/750/750', 'https://picsum.photos/seed/gb3b/750/750', 'https://picsum.photos/seed/gb3c/750/750'],
    price: 288,
    originalPrice: 688,
    soldCount: 215,
    totalCount: 300,
    endDate: '2026-07-15',
    category: '生活好物',
    supplier: '宜兴紫砂校友工坊',
    desc: '由宜兴校友工坊手工制作的紫砂茶具套装，包含一壶四杯一茶海。采用宜兴原矿紫砂泥料，传统工艺手工成型，壶身雕刻白石桥七号专属logo。自用雅致，送礼体面。',
    specs: ['套装：1壶+4杯+1公道杯', '材质：宜兴原矿紫泥', '壶容量：约200ml', '工艺：纯手工制作', '包装：精美礼盒装'],
    shipping: '手工制作需3-5天，发货后全国包邮',
    tags: ['手工', '限量', '包邮']
  },
  {
    id: 4,
    title: '北理工校友优选——智利进口红酒双支礼盒',
    cover: 'https://picsum.photos/seed/gb4/400/400',
    images: ['https://picsum.photos/seed/gb4a/750/750', 'https://picsum.photos/seed/gb4b/750/750'],
    price: 198,
    originalPrice: 498,
    soldCount: 632,
    totalCount: 800,
    endDate: '2026-06-28',
    category: '食品特产',
    supplier: '校友企业·品醇国际酒业',
    desc: '由校友经营的进口酒业公司直供，智利中央山谷产区赤霞珠干红2支礼盒装。酒体饱满，果香浓郁，适合商务宴请和家庭聚餐。附赠专业开瓶器。',
    specs: ['规格：750ml×2支', '品种：赤霞珠干红', '产地：智利中央山谷', '年份：2024年', '礼盒装+赠开瓶器'],
    shipping: '下单后24小时内发货，全国包邮',
    tags: ['包邮', '进口', '送礼']
  },
  {
    id: 5,
    title: '校友企业——智能体脂秤 健康管理版',
    cover: 'https://picsum.photos/seed/gb5/400/400',
    images: ['https://picsum.photos/seed/gb5a/750/750', 'https://picsum.photos/seed/gb5b/750/750'],
    price: 99,
    originalPrice: 259,
    soldCount: 1200,
    totalCount: 1500,
    endDate: '2026-07-10',
    category: '科技数码',
    supplier: '校友企业·深圳星辰科技',
    desc: '由校友企业研发的智能体脂秤，可测量体重、体脂率、肌肉量、水分率等18项身体数据，蓝牙连接手机APP，支持多人使用自动识别。极简白色设计，适合各种家居风格。',
    specs: ['测量指标：18项身体数据', '连接方式：蓝牙5.0', '称重范围：0.2-180kg', '供电：3节AAA电池（附赠）', 'APP支持：iOS/Android'],
    shipping: '下单后24小时内发货，全国包邮',
    tags: ['包邮', '热卖', '校友自研']
  },
  {
    id: 6,
    title: '北理工建筑系列——3D拼图 中心教学楼模型',
    cover: 'https://picsum.photos/seed/gb6/400/400',
    images: ['https://picsum.photos/seed/gb6a/750/750', 'https://picsum.photos/seed/gb6b/750/750', 'https://picsum.photos/seed/gb6c/750/750'],
    price: 128,
    originalPrice: 268,
    soldCount: 340,
    totalCount: 500,
    endDate: '2026-07-20',
    category: '校园文创',
    supplier: '北理工校友文创工作室',
    desc: '以北京理工大学中关村校区中心教学楼为原型设计的高精度3D拼图模型。共328片零件，ABS环保材质，无需胶水即可拼装。拼装完成后尺寸约25×15×20cm，是送给北理工校友最好的桌面摆件。',
    specs: ['零件数：328片', '材质：ABS环保塑料', '成品尺寸：约25×15×20cm', '难度：中等（建议14岁以上）', '含详细拼装说明书'],
    shipping: '下单后2个工作日内发货，全国包邮',
    tags: ['限量', '文创', '包邮']
  }
]


// ================================================================
// VIEW RENDERERS - Mobile (小程序端)
// ================================================================

// Helper: check if tabbar should be hidden for current route
function showTabbar() {
  var r = Router.current;
  if (!r) return false;
  var p = r.path;
  var hidePaths = ['/login', '/news/:id', '/activity/:id', '/alumni-card/:id', '/alumni-group/:id',
    '/alumni-feed/:id', '/help/:id', '/member-card/:id', '/member-company/:id', '/member-product/:id',
    '/member-service/:category', '/service-provider/:id', '/topic-share/:id', '/interview/:id',
    '/courses/:id', '/group-buy/:id', '/publish-feed', '/publish-help', '/publish-activity',
    '/profile/edit', '/profile/subscribe', '/profile/group-buy', '/profile/favorites',
    '/profile/activities', '/profile/member-edit', '/profile/my-feed', '/profile/my-groups',
    '/profile/my-help', '/profile/my-business', '/profile/my-topics', '/profile/points'
  ];
  for (var i = 0; i < hidePaths.length; i++) {
    if (p === hidePaths[i].replace(/:(\w+)/g, function(_, w) { return Router.params[w] || ':'; })) return false;
  }
  return true;
}

// Determine active tab key based on current route
function activeTabKey() {
  var p = Router.current ? Router.current.path : '';
  if (p === '/home') return '/home';
  if (p.indexOf('/courses') === 0) return '/courses';
  if (p.indexOf('/group-buy') === 0) return '/group-buy';
  if (p.indexOf('/profile') === 0 || p === '/profile') return '/profile';
  if (p.indexOf('/news') === 0 || p.indexOf('/activity') === 0 || p.indexOf('/alumni') === 0 ||
      p.indexOf('/help') === 0 || p.indexOf('/member') === 0 || p.indexOf('/topic') === 0 ||
      p.indexOf('/interview') === 0) return '';
  return '/home';
}

// ================================================================
// VIEW FUNCTIONS
// ================================================================

var Views = {};

// --- LOGIN ---
Views.Login = function() {
  return '<div class="page-login">'
    + '<div class="logo-area"><img src="logo.jpeg" alt="logo"><div class="app-name">白石桥七号</div><div class="slogan">同心共建，聚力赋能</div><div class="desc">北理工校友商务平台</div></div>'
    + '<div class="wechat-btn" data-action="wechat-login"><span class="wx-icon">微</span>微信一键登录</div>'
    + '<div class="phone-toggle" data-action="toggle-phone"><span>手机号登录</span></div>'
    + '<div class="phone-form hidden" id="phone-form">'
    + '<div class="input-row"><input type="tel" id="login-phone" placeholder="请输入手机号" maxlength="11"><span style="font-size:18px;color:#999">' + iconSVG('phone', 18, '#999') + '</span></div>'
    + '<div class="input-row"><input type="digit" id="login-code" placeholder="请输入验证码" maxlength="6"><span class="code-btn" data-action="send-code">获取验证码</span></div>'
    + '<div class="mt-12">' + UI_Button('登录', 'primary', '', true, true) + '</div></div>'
    + '<div class="agreement mt-12">登录即表示同意《用户协议》和《隐私政策》<br><a href="#/admin/login">运营管理员入口</a><br><span style="color:var(--danger)">[v250617-01] onclick版</span></div>'
    + '<div class="mt-12" style="padding:8px 16px;background:#fff4e5;border-radius:8px;font-size:11px;text-align:center">演示账号已内置，点击微信登录或手机号登录即可体验</div>'
    + '</div>';
};

// --- HOME ---
Views.Home = function() {
  var role = AppState.currentRole;
  var isAlumni = roleRank[role] >= 1;
  var isMember = roleRank[role] >= 2;
  var alumniMenus = isAlumni ? '<div class="section-title">校友功能<span class="more"></span></div><div class="menu-grid">'
    + '<div class="menu-item" data-action="nav" data-payload="/alumni-card"><div class="menu-icon" style="background:#e8f4fd">' + iconSVG('card', 22, '#6fa4cf') + '</div><div class="menu-label">校友名片</div></div>'
    + '<div class="menu-item" data-action="nav" data-payload="/alumni-group"><div class="menu-icon" style="background:#e8f8ee">' + iconSVG('users', 22, '#07c160') + '</div><div class="menu-label">校友社团</div></div>'
    + '<div class="menu-item" data-action="nav" data-payload="/activity"><div class="menu-icon" style="background:#fff0f0">' + iconSVG('activity', 22, '#ee0a24') + '</div><div class="menu-label">校友活动</div></div>'
    + '<div class="menu-item" data-action="nav" data-payload="/help"><div class="menu-icon" style="background:#fff7ed">' + iconSVG('help', 22, '#ff976a') + '</div><div class="menu-label">校友互助</div></div>'
    + '</div>' : '';
  var memberMenus = isMember ? '<div class="section-title">会员功能<span class="more"></span></div><div class="menu-grid">'
    + '<div class="menu-item" data-action="nav" data-payload="/member-card"><div class="menu-icon" style="background:#e8f4fd">' + iconSVG('award', 22, '#6fa4cf') + '</div><div class="menu-label">会员名片</div></div>'
    + '<div class="menu-item" data-action="nav" data-payload="/member-company"><div class="menu-icon" style="background:#e8f8ee">' + iconSVG('building', 22, '#07c160') + '</div><div class="menu-label">会员企业</div></div>'
    + '<div class="menu-item" data-action="nav" data-payload="/member-product"><div class="menu-icon" style="background:#fff0f0">' + iconSVG('package', 22, '#ee0a24') + '</div><div class="menu-label">会员产品</div></div>'
    + '<div class="menu-item" data-action="nav" data-payload="/member-service"><div class="menu-icon" style="background:#fff7ed">' + iconSVG('service', 22, '#ff976a') + '</div><div class="menu-label">会员服务</div></div>'
    + '</div>' : '';

  var html = '<div class="page-container page-home">';
  // Header
  html += '<div class="home-header"><div class="top-row"><div class="brand"><img src="logo.jpeg"><div><div class="name">白石桥七号</div><div class="sub">北理工校友商务平台</div></div></div><div class="actions"><span class="role-tag" data-action="show-role-popup">' + escapeHtml(role) + ' ' + iconSVG('arrowDown', 10, '#fff') + '</span><div class="comp-badge"><span>' + iconSVG('bell', 20, '#fff') + '</span>' + (AppState.incomingRequests.length > 0 ? '<span class="badge-dot">' + AppState.incomingRequests.length + '</span>' : '') + '</div></div></div>';
  // Search
  html += UI_Search(uiState.homeSearch, '搜索资讯、活动、校友...', 'home-search');
  html += '</div>';
  // Search overlay
  if (uiState.homeSearchVisible) {
    var q = uiState.homeSearch.toLowerCase();
    var results = [];
    newsList.forEach(function(n) { if (n.title.indexOf(q) >= 0 || (n.summary||'').indexOf(q) >= 0) results.push({ type: '资讯', title: n.title, path: '/news/' + n.id }); });
    activityList.forEach(function(a) { if (a.title.indexOf(q) >= 0) results.push({ type: '活动', title: a.title, path: '/activity/' + a.id }); });
    alumniList.forEach(function(a) { if (a.name.indexOf(q) >= 0 || a.company.indexOf(q) >= 0) results.push({ type: '校友', title: a.name + ' · ' + a.company, path: '/alumni-card/' + a.id }); });
    companyList.forEach(function(c) { if (c.name.indexOf(q) >= 0) results.push({ type: '企业', title: c.name, path: '/member-company/' + c.id }); });
    html += '<div class="search-overlay" data-action="close-search"></div><div class="search-results">';
    if (results.length === 0) {
      html += '<div style="padding:30px;text-align:center;color:var(--text-lighter)">未找到相关结果</div>';
    } else {
      results.forEach(function(r) {
        html += '<div class="comp-cell" data-action="close-search-nav" data-payload="' + r.path + '"><div class="cell-body"><div class="cell-title">' + escapeHtml(r.title) + '</div></div>' + UI_Tag(r.type, 'primary') + '<span class="cell-arrow">' + iconSVG('arrowRight', 14, '#c8c9cc') + '</span></div>';
      });
    }
    html += '</div>';
  }
  // Banner
  html += UI_Swipe(banners);
  // Slogan
  html += '<div class="slogan-banner">同心共建，聚力赋能</div>';
  // Menus
  html += alumniMenus + memberMenus;
  // News section
  html += '<div class="section-title">最新资讯<span class="more" data-action="nav" data-payload="/news">查看更多 &gt;</span></div><div class="card-list">';
  newsList.slice(0, 3).forEach(function(n) {
    html += '<div class="comp-card" data-action="nav" data-payload="/news/' + n.id + '"><img src="' + n.cover + '" class="card-thumb"><div class="card-info"><div class="card-title">' + escapeHtml(n.title) + '</div><div class="card-desc">' + escapeHtml(n.summary || '') + '</div><div class="card-meta">' + n.date + ' · ' + n.author + ' · ' + n.views + '阅读</div></div></div>';
  });
  html += '</div>';
  // Activity section
  html += '<div class="section-title">活动报名<span class="more" data-action="nav" data-payload="/activity">查看更多 &gt;</span></div><div class="card-list">';
  activityList.slice(0, 2).forEach(function(a) {
    html += '<div class="comp-card" data-action="nav" data-payload="/activity/' + a.id + '"><img src="' + a.cover + '" class="card-thumb"><div class="card-info"><div class="card-title">' + escapeHtml(a.title) + '</div><div class="card-desc">' + escapeHtml(a.date) + ' ' + escapeHtml(a.location) + '</div><div class="card-meta">' + UI_Tag(a.status === '报名中' ? '报名中' : '未开始', a.status === '报名中' ? 'danger' : 'plain') + ' ' + a.registered + '人已报名</div></div></div>';
  });
  html += '</div>';
  // Topic Share section
  html += '<div class="section-title">主题分享<span class="more" data-action="nav" data-payload="/topic-share">查看更多 &gt;</span></div><div class="card-list">';
  topicList.slice(0, 2).forEach(function(t) {
    html += '<div class="comp-card" data-action="nav" data-payload="/topic-share/' + t.id + '"><img src="' + t.cover + '" class="card-thumb"><div class="card-info"><div class="card-title">' + escapeHtml(t.title) + '</div><div class="card-desc">' + escapeHtml(t.summary || '') + '</div><div class="card-meta">' + t.date + ' · ' + t.author + ' · ' + t.views + '阅读</div></div></div>';
  });
  html += '</div>';
  // Interview section
  html += '<div class="section-title">会员专访<span class="more" data-action="nav" data-payload="/interview">查看更多 &gt;</span></div><div class="card-list">';
  interviewList.slice(0, 2).forEach(function(item) {
    html += '<div class="comp-card" data-action="nav" data-payload="/interview/' + item.id + '"><img src="' + item.cover + '" class="card-thumb"><div class="card-info"><div class="card-title">' + escapeHtml(item.title) + '</div><div class="card-desc">' + escapeHtml(item.summary || '') + '</div><div class="card-meta">' + item.date + ' · ' + item.author + ' · ' + item.views + '阅读</div></div></div>';
  });
  html += '</div>';
  // Alumni Feed section
  html += '<div class="section-title">校友动态<span class="more" data-action="nav" data-payload="/alumni-feed">查看更多 &gt;</span></div><div style="padding:0 12px">';
  feedList.forEach(function(f) {
    html += '<div class="home feed-card" data-action="nav" data-payload="/alumni-feed/' + f.id + '"><div class="feed-user"><img src="' + f.user.avatar + '"><div><div class="uname">' + escapeHtml(f.user.name) + '</div><div class="umeta">' + f.user.school + ' · ' + f.user.year + '</div></div></div>';
    html += '<div class="feed-content">' + escapeHtml(f.content) + '</div>';
    if (f.images && f.images.length) {
      html += '<div class="feed-images col' + f.images.length + '">';
      f.images.forEach(function(img) { html += '<img src="' + img + '">'; });
      html += '</div>';
    }
    html += '<div class="feed-actions"><span onclick="doLikeFeed(' + f.id + ')" style="color:' + (AppState.likedFeeds[f.id] ? 'var(--danger)' : '') + '">' + (AppState.likedFeeds[f.id] ? iconSVG('heartFilled', 14, 'var(--danger)') : iconSVG('heart', 14)) + ' ' + f.likes + '</span><span>' + iconSVG('message', 14) + ' ' + f.comments + '</span></div></div>';
  });
  html += '</div>';
  html += '</div>';
  return html;
};

// --- NEWS ---
Views.NewsList = function() {
  var html = '<div class="page-container">' + UI_NavBar('最新资讯', true);
  html += '<div class="card-list">';
  newsList.forEach(function(n) {
    html += '<div class="comp-card" data-action="nav" data-payload="/news/' + n.id + '"><img src="' + n.cover + '" class="card-thumb"><div class="card-info"><div class="card-title">' + escapeHtml(n.title) + '</div><div class="card-desc">' + escapeHtml(n.summary || '') + '</div><div class="card-meta">' + n.date + ' · ' + n.author + ' · ' + n.views + '阅读</div></div></div>';
  });
  html += '</div></div>';
  return html;
};

Views.NewsDetail = function() {
  var n = newsList.find(function(item) { return item.id == Router.params.id; });
  if (!n) return '<div class="page-container">' + UI_NavBar('资讯详情', true) + UI_Empty('资讯未找到') + '</div>';
  var collected = AppState.collectedNews[n.id];
  var html = '<div class="page-container">' + UI_NavBar('资讯详情', true);
  html += '<div class="content-detail"><h3>' + escapeHtml(n.title) + '</h3><div class="meta">' + n.author + ' · ' + n.date + ' · ' + n.views + '阅读</div><div class="body">' + n.content + '</div></div>';
  // Comment section
  var showCmt = uiState.showNewsComment === n.id;
  var cmts = (AppState.newsComments && AppState.newsComments[n.id]) || [];
  if (showCmt) {
    html += '<div class="comment-section"><div class="cmt-title">评论 (' + cmts.length + ')</div>';
    if (cmts.length === 0) html += '<div style="text-align:center;padding:20px;color:var(--text-lighter)">暂无评论，来说两句吧</div>';
    cmts.forEach(function(c) {
      html += '<div class="comment-item"><img src="' + c.avatar + '"><div class="cmt-body"><div class="cmt-name">' + escapeHtml(c.name) + '</div><div class="cmt-text">' + escapeHtml(c.text) + '</div><div class="cmt-time">' + c.time + '</div></div></div>';
    });
    html += '<div style="display:flex;gap:10px;padding:8px 16px;background:#fff;border-top:1px solid var(--border)"><input id="news-comment-input" type="text" placeholder="写评论..." style="flex:1;background:#f5f6f8;border-radius:20px;padding:8px 14px;font-size:13px;border:none;outline:none"><span style="padding:8px 12px;color:var(--primary);font-weight:600;cursor:pointer;font-size:14px" onclick="doPostNewsComment(' + n.id + ')">发送</span></div>';
  }
  html += '<div class="bottom-bar-actions"><div class="bba-item' + (AppState.likedFeeds['n' + n.id] ? ' active' : '') + '" onclick="doLikeNews(' + n.id + ')">' + (AppState.likedFeeds['n' + n.id] ? iconSVG('heartFilled', 18, 'var(--danger)') : iconSVG('heart', 18)) + '<span>' + n.likes + '</span></div><div class="bba-item' + (showCmt ? ' active' : '') + '" onclick="doToggleNewsComment(' + n.id + ')">' + iconSVG('message', 18) + '<span>' + n.comments + '</span></div><div class="bba-item' + (collected ? ' active' : '') + '" onclick="doCollectNews(' + n.id + ')">' + (collected ? iconSVG('starFilled', 18, 'var(--accent)') : iconSVG('star', 18)) + '<span>' + (collected ? '已收藏' : '收藏') + '</span></div><div class="bba-item" onclick="doShare()">' + iconSVG('share', 18) + '<span>分享</span></div></div></div>';
  return html;
};

// --- ACTIVITY ---
Views.ActivityList = function() {
  var html = '<div class="page-container">' + UI_NavBar('校友活动', true);
  html += '<div class="card-list">';
  activityList.forEach(function(a) {
    html += '<div class="activity-item" data-action="nav" data-payload="/activity/' + a.id + '"><img src="' + a.cover + '" class="act-thumb"><div class="act-info"><div class="act-title">' + escapeHtml(a.title) + '</div><div class="act-row">' + iconSVG('clock', 12, '#999') + ' ' + a.date + '</div><div class="act-row">' + iconSVG('location', 12, '#999') + ' ' + escapeHtml(a.location) + '</div><div class="act-bottom">' + UI_Tag(a.status, a.status === '报名中' ? 'danger' : 'plain') + '<span style="font-size:11px;color:var(--text-lighter)">' + a.registered + '人报名 ' + (a.fee === 0 ? '免费' : '¥' + a.fee) + '</span></div></div></div>';
  });
  html += '</div>';
  html += '<div style="padding:10px 16px">' + UI_Button('发布校友活动', 'primary', '', true, true) + '</div>';
  html += '</div>';
  return html;
};

Views.ActivityDetail = function() {
  var a = activityList.find(function(item) { return item.id == Router.params.id; });
  if (!a) return '<div class="page-container">' + UI_NavBar('活动详情', true) + UI_Empty('活动未找到') + '</div>';
  var registered = hasRegisteredAct(a.id);
  var html = '<div class="page-container no-tab">' + UI_NavBar('活动详情', true);
  html += '<img src="' + a.cover + '" class="act-cover">';
  html += '<div style="padding:12px 16px"><h3 style="font-size:18px;margin-bottom:8px">' + escapeHtml(a.title) + '</h3></div>';
  html += UI_CellGroup([{ title: '活动时间', value: a.date, icon: iconSVG('clock', 16, '#999') }, { title: '活动地点', value: a.location, icon: iconSVG('location', 16, '#999') }, { title: '发起人', value: a.organizer, icon: iconSVG('user', 16, '#999') }, { title: '报名截止', value: a.deadline }, { title: '活动费用', value: a.fee === 0 ? '免费' : '¥' + a.fee }], true);
  html += '<div class="content-detail"><div class="body">' + escapeHtml(a.description) + '</div></div>';
  html += '<div style="padding:0 16px"><div class="section-title" style="padding:8px 0">已报名校友 (' + a.registered + '人)</div><div class="registered-avatars">';
  for (var i = 0; i < Math.min(a.registered, 8); i++) {
    html += '<img src="https://picsum.photos/seed/reg' + i + '/60/60">';
  }
  if (a.registered > 8) html += '<span class="more">+' + (a.registered - 8) + '</span>';
  html += '</div></div>';
  var btnText = registered ? '已报名' : (a.status === '报名中' ? '立即报名' : '报名已截止');
  var btnDisabled = registered || a.status !== '报名中';
  html += '<div class="bottom-bar">' + (btnDisabled ? '<button class="comp-btn outline round block">' + btnText + '</button>' : '<button class="comp-btn primary round block" onclick="doRegisterActivity(' + a.id + ')">' + btnText + '</button>') + '</div>';
  html += '</div>';
  return html;
};

Views.PublishActivity = function() {
  return '<div class="page-container">' + UI_NavBar('发布活动', true, '<span data-action="toast" data-payload="活动已发布">发表</span>')
    + '<div class="cover-uploader" data-action="upload-cover"><span class="upload-plus">+</span><span style="font-size:12px;color:#c0c4cc;margin-left:6px">上传封面</span></div>'
    + UI_Field('活动名称', 'text', '请输入活动名称') + UI_Field('活动地点', 'text', '请输入活动地点')
    + UI_Field('活动日期', 'text', '请输入活动日期') + UI_Field('活动费用', 'number', '0表示免费', '0')
    + UI_Field('活动描述', 'textarea', '请输入活动描述...')
    + '<div style="padding:12px 16px">' + UI_Button('发布', 'primary', '', true, true) + '</div></div>';
};

// --- ALUMNI CARD ---
Views.AlumniCardList = function() {
  var html = '<div class="page-container">' + UI_NavBar('校友名片', true) + UI_Search('', '搜索校友...', 'alumni-search');
  html += '<div class="card-list">';
  alumniList.forEach(function(a) {
    var stat = '';
    if (isFriend(a.id)) stat = UI_Tag('已是好友', 'success');
    else if (AppState.outgoingIds.indexOf(a.id) >= 0) stat = UI_Tag('已发送请求', 'plain');
    else stat = UI_Button('交换名片', 'primary', 'small', true);
    html += '<div class="comp-cell" data-action="nav" data-payload="/alumni-card/' + a.id + '"><img src="' + a.avatar + '" style="width:44px;height:44px;border-radius:50%;margin-right:10px"><div class="cell-body"><div class="cell-title">' + escapeHtml(a.name) + '</div><div class="cell-label">' + a.school + ' · ' + a.major + ' · ' + a.year + '</div></div>' + stat + '<span class="cell-arrow">' + iconSVG('arrowRight', 14, '#c8c9cc') + '</span></div>';
  });
  html += '</div></div>';
  return html;
};

Views.AlumniCardDetail = function() {
  var a = alumniList.find(function(item) { return item.id == Router.params.id; });
  if (!a) return '<div class="page-container">' + UI_NavBar('校友详情', true) + UI_Empty('校友未找到') + '</div>';
  var exchanged = a.exchanged || isFriend(a.id);
  var html = '<div class="page-container no-tab">' + UI_NavBar('校友详情', true);
  html += '<div style="text-align:center;padding:20px"><img src="' + a.avatar + '" style="width:72px;height:72px;border-radius:50%;margin:0 auto"><h3 style="margin:8px 0 4px">' + escapeHtml(a.name) + '</h3><div style="font-size:12px;color:var(--text-lighter)">' + escapeHtml(a.title) + '</div></div>';
  html += UI_CellGroup([{ title: '学校', value: a.school }, { title: '专业', value: a.major }, { title: '年级', value: a.year }, { title: '学历', value: a.degree }, { title: '城市', value: a.city }, { title: '行业', value: a.industry }, { title: '公司', value: a.company }], true);
  if (exchanged) {
    html += UI_CellGroup([{ title: '手机', value: a.phone }, { title: '邮箱', value: a.email }, { title: '微信', value: a.wechat }], true);
  } else {
    html += '<div class="exchange-notice">' + iconSVG('shield', 16, '#ff976a') + ' 交换名片后可查看联系方式</div>';
  }
  var introText = exchanged ? a.intro : (a.intro || '').substring(0, 50) + '...';
  html += '<div class="content-detail"><h4>个人简介</h4><div class="body">' + escapeHtml(introText) + '</div>';
  if (!exchanged) {
    html += '<div style="font-size:12px;color:var(--text-lighter);padding:0 16px 8px">交换名片后查看完整简介</div>';
  }
  html += '</div>';
  if (exchanged) {
    html += '<div style="display:flex;gap:4px;padding:4px 16px;flex-wrap:wrap">';
    a.tags.forEach(function(t) { html += UI_Tag(t, 'primary'); });
    html += '</div>';
  }
  if (!exchanged) {
    var btnText = AppState.outgoingIds.indexOf(a.id) >= 0 ? '已发送请求' : '交换名片';
    html += '<div class="bottom-bar"><button class="comp-btn primary round block" onclick="doExchangeCard(' + a.id + ')">' + btnText + '</button></div>';
  }
  html += '</div>';
  return html;
};

// --- ALUMNI GROUP ---
Views.AlumniGroupList = function() {
  var tabs = [{ key: 'all', name: '全部' }, { key: '行业社团', name: '行业' }, { key: '兴趣社团', name: '兴趣' }, { key: '地方社团', name: '地方' }, { key: '海外社团', name: '海外' }];
  var html = '<div class="page-container">' + UI_NavBar('校友社团', true) + UI_Tabs(tabs, uiState.groupListTab);
  html += '<div style="padding-top:8px">';
  groupList.forEach(function(g) {
    if (uiState.groupListTab !== 'all' && g.category !== uiState.groupListTab) return;
    html += '<div class="group-card" data-action="nav" data-payload="/alumni-group/' + g.id + '"><img src="' + g.logo + '"><div class="group-info"><div class="group-name">' + escapeHtml(g.name) + '</div><div class="group-desc">' + escapeHtml(g.intro) + '</div><div class="group-meta">' + UI_Tag(g.category, 'primary') + ' ' + g.memberCount + '人</div></div></div>';
  });
  html += '</div></div>';
  return html;
};

Views.AlumniGroupDetail = function() {
  var g = groupList.find(function(item) { return item.id == Router.params.id; });
  if (!g) return '<div class="page-container">' + UI_NavBar('社团详情', true) + UI_Empty('社团未找到') + '</div>';
  var tabs = [{ key: 'intro', name: '简介' }, { key: 'news', name: '资讯' }, { key: 'activity', name: '活动' }, { key: 'members', name: '成员' }];
  var html = '<div class="page-container no-tab">' + UI_NavBar(g.name, true);
  html += '<div style="text-align:center;padding:20px"><img src="' + g.logo + '" style="width:64px;height:64px;border-radius:12px;margin:0 auto"><h3 style="margin:8px 0">' + escapeHtml(g.name) + '</h3><div style="font-size:12px;color:var(--text-lighter)">负责人：' + g.leader + ' · ' + g.phone + '</div></div>';
  html += UI_Tabs(tabs, uiState.groupDetailTab);
  // Tab content
  if (uiState.groupDetailTab === 'intro') {
    html += '<div class="content-detail"><div class="body">' + escapeHtml(g.intro) + '</div></div>';
  } else if (uiState.groupDetailTab === 'news') {
    if (g.news && g.news.length) {
      html += '<div class="card-list">';
      g.news.forEach(function(n) { html += '<div class="comp-cell"><div class="cell-body"><div class="cell-title">' + escapeHtml(n.title) + '</div></div></div>'; });
      html += '</div>';
    } else { html += UI_Empty('暂无资讯'); }
  } else if (uiState.groupDetailTab === 'activity') {
    if (g.activities && g.activities.length) {
      html += '<div class="card-list">';
      g.activities.forEach(function(act) {
        html += '<div class="comp-cell"><div class="cell-body"><div class="cell-title">' + escapeHtml(act.title) + '</div><div class="cell-label">' + act.date + ' ' + escapeHtml(act.location) + '</div></div></div>';
      });
      html += '</div>';
    } else { html += UI_Empty('暂无活动'); }
  } else if (uiState.groupDetailTab === 'members') {
    html += '<div class="card-list">';
    g.members.forEach(function(m) {
      html += '<div class="comp-cell"><img src="' + m.avatar + '" style="width:36px;height:36px;border-radius:50%;margin-right:10px"><div class="cell-body"><div class="cell-title">' + escapeHtml(m.name) + '</div><div class="cell-label">' + m.school + ' · ' + m.year + '</div></div></div>';
    });
    html += '</div>';
  }
  var joined = isJoined(g.id);
  html += '<div class="bottom-bar"><button class="comp-btn ' + (joined ? 'outline' : 'primary') + ' round block" onclick="doToggleGroup(' + g.id + ')">' + (joined ? '退出社团' : '加入社团') + '</button></div>';
  html += '</div>';
  return html;
};

// --- ALUMNI FEED ---
Views.AlumniFeedList = function() {
  var html = '<div class="page-container">' + UI_NavBar('校友动态', true);
  feedList.forEach(function(f) {
    html += '<div class="feed-item" data-action="nav" data-payload="/alumni-feed/' + f.id + '"><div class="feed-user"><img src="' + f.user.avatar + '"><div><div class="uname">' + escapeHtml(f.user.name) + '</div><div class="umeta">' + f.user.school + ' · ' + f.user.year + '</div></div><span class="feed-date">' + f.date + '</span></div>';
    html += '<div class="feed-content">' + escapeHtml(f.content) + '</div>';
    if (f.images && f.images.length) {
      html += '<div class="feed-images col' + f.images.length + '">';
      f.images.forEach(function(img) { html += '<img src="' + img + '" data-action="preview-img" data-src="' + img + '">'; });
      html += '</div>';
    }
    html += '<div class="feed-actions"><span onclick="doLikeFeed(' + f.id + ')" class="' + (AppState.likedFeeds[f.id] ? 'liked' : '') + '">' + (AppState.likedFeeds[f.id] ? iconSVG('heartFilled', 14, 'var(--danger)') : iconSVG('heart', 14)) + ' ' + f.likes + '</span><span>' + iconSVG('message', 14) + ' ' + f.comments + '</span></div></div>';
  });
  html += '</div>';
  return html;
};

Views.AlumniFeedDetail = function() {
  var f = feedList.find(function(item) { return item.id == Router.params.id; });
  if (!f) return '<div class="page-container">' + UI_NavBar('动态详情', true) + UI_Empty('动态未找到') + '</div>';
  var comments = AppState.feedComments[f.id] || [];
  var html = '<div class="page-container no-tab">' + UI_NavBar('动态详情', true);
  html += '<div class="feed-item" style="margin:0;border-radius:0"><div class="feed-user"><img src="' + f.user.avatar + '"><div><div class="uname">' + escapeHtml(f.user.name) + '</div><div class="umeta">' + f.user.school + ' · ' + f.user.year + '</div></div><span class="feed-date">' + f.date + '</span></div>';
  html += '<div class="feed-content">' + escapeHtml(f.content) + '</div>';
  if (f.images && f.images.length) {
    html += '<div class="feed-images col' + f.images.length + '">';
    f.images.forEach(function(img) { html += '<img src="' + img + '" data-action="preview-img" data-src="' + img + '">'; });
    html += '</div>';
  }
  html += '<div class="feed-actions"><span onclick="doLikeFeed(' + f.id + ')" class="' + (AppState.likedFeeds[f.id] ? 'liked' : '') + '">' + (AppState.likedFeeds[f.id] ? iconSVG('heartFilled', 14, 'var(--danger)') : iconSVG('heart', 14)) + ' ' + f.likes + '</span><span>' + iconSVG('message', 14) + ' ' + f.comments + '</span></div></div>';
  // Comments
  html += '<div class="comment-section"><div class="cmt-title">评论 (' + comments.length + ')</div>';
  comments.forEach(function(c) {
    html += '<div class="comment-item"><img src="' + c.avatar + '"><div class="cmt-body"><div class="cmt-name">' + escapeHtml(c.name) + '</div><div class="cmt-text">' + escapeHtml(c.text) + '</div><div class="cmt-time">' + c.time + '</div></div></div>';
  });
  if (!comments.length) html += '<div style="color:var(--text-lighter);text-align:center;padding:20px">暂无评论</div>';
  html += '</div>';
  // Comment input
  html += '<div class="bottom-bar"><input id="feed-comment-input" type="text" placeholder="写评论..." style="flex:1;background:#f5f6f8;border-radius:20px;padding:8px 14px;font-size:13px"><span style="padding:8px 12px;color:var(--primary);font-weight:600;cursor:pointer;font-size:14px" onclick="doPostComment(' + f.id + ')">发送</span></div>';
  html += '</div>';
  return html;
};

Views.PublishFeed = function() {
  var html = '<div class="page-container">' + UI_NavBar('发布动态', true, '<span data-action="publish-feed-submit">发表</span>');
  html += '<div style="padding:12px 16px"><textarea id="publish-feed-text" placeholder="分享你的想法..." style="width:100%;min-height:120px;font-size:15px;border:none;resize:none;outline:none"></textarea></div>';
  html += '<div class="publish-images" style="padding:8px 16px"><div class="pi-item" data-action="upload-img"><span>+</span></div></div>';
  html += '<div class="publish-option"><span>所在位置</span><span class="text-muted">不显示位置</span></div>';
  html += '<div class="publish-option" data-action="cycle-visibility"><span>谁可以看</span><span class="text-muted">' + (uiState.feedVisibility || '公开') + '</span></div>';
  html += '</div>';
  return html;
};

// --- HELP ---
Views.HelpList = function() {
  var html = '<div class="page-container">' + UI_NavBar('校友互助', true);
  helpList.forEach(function(h) {
    html += '<div class="comp-cell" data-action="nav" data-payload="/help/' + h.id + '"><img src="' + h.publisher.avatar + '" style="width:40px;height:40px;border-radius:50%;margin-right:10px"><div class="cell-body"><div class="cell-title">' + escapeHtml(h.title) + '</div><div class="cell-label">' + h.publisher.name + ' · ' + h.publisher.role + ' · ' + h.date + '</div></div>' + UI_Tag(h.status, h.status === '已解决' ? 'success' : 'warning') + '<span class="cell-arrow">' + iconSVG('arrowRight', 14, '#c8c9cc') + '</span></div>';
  });
  html += '<div class="bottom-bar">' + UI_Button('发布求助', 'primary', '', true, true) + '</div>';
  html += '</div>';
  return html;
};

Views.HelpDetail = function() {
  var h = helpList.find(function(item) { return item.id == Router.params.id; });
  if (!h) return '<div class="page-container">' + UI_NavBar('求助详情', true) + UI_Empty('求助未找到') + '</div>';
  var html = '<div class="page-container no-tab">' + UI_NavBar('求助详情', true);
  html += '<div class="content-detail"><h3>' + escapeHtml(h.title) + '</h3><div class="meta">' + h.publisher.name + ' · ' + h.publisher.role + ' · ' + h.date + ' ' + UI_Tag(h.status, h.status === '已解决' ? 'success' : 'warning') + '</div><div class="body">' + escapeHtml(h.description) + '</div></div>';
  html += '<div class="comment-section"><div class="cmt-title">响应 (' + h.responseCount + ')</div>';
  (h.responses || []).forEach(function(r) {
    html += '<div class="comment-item"><img src="' + r.avatar + '"><div class="cmt-body"><div class="cmt-name">' + escapeHtml(r.name) + '</div><div class="cmt-text">' + escapeHtml(r.text) + '</div><div class="cmt-time">' + r.time + '</div></div></div>';
  });
  html += '</div>';
  html += '<div class="bottom-bar">' + UI_Button('我要响应', 'primary', '', true, true) + '</div>';
  html += '</div>';
  return html;
};

Views.PublishHelp = function() {
  return '<div class="page-container">' + UI_NavBar('发布求助', true, '<span data-action="toast" data-payload="求助已发布">发表</span>')
    + UI_Field('标题', 'text', '请输入求助标题', '', true) + UI_Field('描述', 'textarea', '请详细描述你的需求...', '', true)
    + '<div style="padding:12px 16px">' + UI_Button('发布', 'primary', '', true, true) + '</div></div>';
};

// --- MEMBER CARD ---
Views.MemberCardList = function() {
  var html = '<div class="page-container">' + UI_NavBar('会员名片', true) + UI_Search('', '搜索会员...');
  html += '<div class="card-list">';
  memberList.forEach(function(m) {
    html += '<div class="comp-cell" data-action="nav" data-payload="/member-card/' + m.id + '"><img src="' + m.avatar + '" style="width:44px;height:44px;border-radius:50%;margin-right:10px"><div class="cell-body"><div class="cell-title">' + escapeHtml(m.name) + '</div><div class="cell-label">' + m.company + ' · ' + m.title + '</div></div><span class="cell-arrow">' + iconSVG('arrowRight', 14, '#c8c9cc') + '</span></div>';
  });
  html += '</div></div>';
  return html;
};

Views.MemberCardDetail = function() {
  var m = memberList.find(function(item) { return item.id == Router.params.id; });
  if (!m) return '<div class="page-container">' + UI_NavBar('会员详情', true) + UI_Empty('会员未找到') + '</div>';
  var html = '<div class="page-container">' + UI_NavBar('会员详情', true);
  html += '<div style="text-align:center;padding:20px"><img src="' + m.avatar + '" style="width:72px;height:72px;border-radius:50%;margin:0 auto"><h3 style="margin:8px 0 4px">' + escapeHtml(m.name) + '</h3><div style="font-size:12px;color:var(--text-lighter)">' + m.company + ' · ' + m.title + '</div>' + UI_Tag('商务会员', 'primary') + '</div>';
  html += UI_CellGroup([{ title: '学校', value: m.school }, { title: '年级', value: m.year }, { title: '城市', value: m.city }, { title: '行业', value: m.industry }, { title: '加入时间', value: m.memberSince }], true);
  html += '<div class="content-detail"><h4>简介</h4><div class="body">' + escapeHtml(m.intro) + '</div></div>';
  // Companies
  if (m.companies && m.companies.length) {
    html += '<div class="section-title" style="padding:8px 16px">关联企业</div>';
    m.companies.forEach(function(c) {
      html += '<div class="comp-cell" data-action="nav" data-payload="/member-company/' + c.id + '"><img src="' + c.logo + '" style="width:36px;height:36px;border-radius:6px;margin-right:10px"><div class="cell-body"><div class="cell-title">' + escapeHtml(c.name) + '</div><div class="cell-label">' + c.industry + '</div></div><span class="cell-arrow">' + iconSVG('arrowRight', 14, '#c8c9cc') + '</span></div>';
    });
  }
  // Products
  if (m.products && m.products.length) {
    html += '<div class="section-title" style="padding:8px 16px">关联产品</div>';
    m.products.forEach(function(p) {
      html += '<div class="comp-cell" data-action="nav" data-payload="/member-product/' + p.id + '"><img src="' + p.cover + '" style="width:36px;height:36px;border-radius:6px;margin-right:10px;object-fit:cover"><div class="cell-body"><div class="cell-title">' + escapeHtml(p.name) + '</div></div><span class="cell-arrow">' + iconSVG('arrowRight', 14, '#c8c9cc') + '</span></div>';
    });
  }
  html += '</div>';
  return html;
};

// --- MEMBER COMPANY ---
Views.MemberCompanyList = function() {
  var html = '<div class="page-container">' + UI_NavBar('会员企业', true) + UI_Search('', '搜索企业...');
  html += '<div class="card-list">';
  companyList.forEach(function(c) {
    html += '<div class="comp-cell" data-action="nav" data-payload="/member-company/' + c.id + '"><img src="' + c.logo + '" style="width:40px;height:40px;border-radius:8px;margin-right:10px"><div class="cell-body"><div class="cell-title">' + escapeHtml(c.name) + '</div><div class="cell-label">' + c.industry + ' · ' + c.founder + '</div></div><span class="cell-arrow">' + iconSVG('arrowRight', 14, '#c8c9cc') + '</span></div>';
  });
  html += '</div></div>';
  return html;
};

Views.MemberCompanyDetail = function() {
  var c = companyList.find(function(item) { return item.id == Router.params.id; });
  if (!c) return '<div class="page-container">' + UI_NavBar('企业详情', true) + UI_Empty('企业未找到') + '</div>';
  var html = '<div class="page-container">' + UI_NavBar('企业详情', true);
  html += '<div style="text-align:center;padding:20px"><img src="' + c.logo + '" style="width:64px;height:64px;border-radius:12px;margin:0 auto"><h3 style="margin:8px 0 4px">' + escapeHtml(c.name) + '</h3><div style="font-size:12px;color:var(--text-lighter)">' + escapeHtml(c.industry) + '</div></div>';
  html += UI_CellGroup([{ title: '创始人', value: c.founder }, { title: '地址', value: c.address }, { title: '行业', value: c.industry }], true);
  html += '<div class="content-detail"><h4>企业简介</h4><div class="body">' + escapeHtml(c.intro) + '</div></div>';
  if (c.products && c.products.length) {
    html += '<div class="section-title" style="padding:8px 16px">旗下产品</div>';
    c.products.forEach(function(p) {
      html += '<div class="comp-cell" data-action="nav" data-payload="/member-product/' + p.id + '"><img src="' + p.cover + '" style="width:40px;height:40px;border-radius:6px;margin-right:10px;object-fit:cover"><div class="cell-body"><div class="cell-title">' + escapeHtml(p.name) + '</div><div class="cell-label">' + escapeHtml(p.intro || '') + '</div></div><span class="cell-arrow">' + iconSVG('arrowRight', 14, '#c8c9cc') + '</span></div>';
    });
  }
  html += '</div>';
  return html;
};

// --- MEMBER PRODUCT ---
Views.MemberProductList = function() {
  var html = '<div class="page-container">' + UI_NavBar('会员产品', true) + UI_Search('', '搜索产品...');
  html += '<div class="card-list">';
  productList.forEach(function(p) {
    html += '<div class="comp-cell" data-action="nav" data-payload="/member-product/' + p.id + '"><img src="' + p.cover + '" style="width:44px;height:44px;border-radius:6px;margin-right:10px;object-fit:cover"><div class="cell-body"><div class="cell-title">' + escapeHtml(p.name) + '</div><div class="cell-label">' + p.company + ' · ' + p.industry + '</div></div><span class="cell-arrow">' + iconSVG('arrowRight', 14, '#c8c9cc') + '</span></div>';
  });
  html += '</div></div>';
  return html;
};

Views.MemberProductDetail = function() {
  var p = productList.find(function(item) { return item.id == Router.params.id; });
  if (!p) return '<div class="page-container">' + UI_NavBar('产品详情', true) + UI_Empty('产品未找到') + '</div>';
  var html = '<div class="page-container">' + UI_NavBar('产品详情', true);
  html += '<img src="' + p.cover + '" style="width:100%;max-height:240px;object-fit:cover">';
  html += '<div style="padding:12px 16px"><h3>' + escapeHtml(p.name) + '</h3><div style="font-size:12px;color:var(--text-lighter)">' + escapeHtml(p.company) + ' · ' + UI_Tag(p.industry, 'primary') + '</div></div>';
  html += '<div class="content-detail"><h4>产品简介</h4><div class="body">' + escapeHtml(p.intro) + '</div></div>';
  if (p.features && p.features.length) {
    html += '<div class="content-detail"><h4>核心功能</h4><div><ul style="padding-left:16px;line-height:2">';
    p.features.forEach(function(f) { html += '<li>' + escapeHtml(f) + '</li>'; });
    html += '</ul></div></div>';
  }
  html += '<div class="content-detail"><h4>应用领域</h4><div class="body">' + escapeHtml(p.applications) + '</div></div>';
  html += '</div>';
  return html;
};

// --- MEMBER SERVICE ---
Views.MemberServiceIndex = function() {
  var cats = [
    { name: '市场推广', desc: '品牌宣传 · 营销策划', icon: 'fire', color: '#e8f4fd', iconColor: '#6fa4cf' },
    { name: '企业赋能', desc: '培训 · 咨询 · 融资', icon: 'activity', color: '#e8f8ee', iconColor: '#07c160' },
    { name: '商务活动', desc: '路演 · 对接 · 展会', icon: 'calendar', color: '#fff0f0', iconColor: '#ee0a24' },
    { name: '专属服务', desc: '法务 · 财税 · HR', icon: 'service', color: '#fff7ed', iconColor: '#ff976a' }
  ];
  var html = '<div class="page-container">' + UI_NavBar('会员服务', true);
  html += '<div class="svc-categories">';
  cats.forEach(function(c) {
    html += '<div class="svc-cat-card" data-action="nav" data-payload="/member-service/' + encodeURIComponent(c.name) + '"><div class="cat-icon" style="background:' + c.color + '">' + iconSVG(c.icon, 26, c.iconColor) + '</div><div class="cat-name">' + c.name + '</div><div class="cat-desc">' + c.desc + '</div></div>';
  });
  html += '</div></div>';
  return html;
};

Views.MemberServiceDetail = function() {
  var cat = decodeURIComponent(Router.params.category || '');
  var svcs = [
    { id: 1, name: '品牌战略咨询', provider: '智控科技', desc: '为校友企业提供品牌战略规划和市场定位服务' },
    { id: 2, name: '数字化营销方案', provider: '星辰科技', desc: '定制数字化营销解决方案，覆盖微信、抖音等平台' },
    { id: 3, name: '企业融资顾问', provider: '金融投资俱乐部', desc: '为企业提供融资方案设计和投资人对接服务' }
  ];
  var html = '<div class="page-container">' + UI_NavBar(cat || '服务详情', true);
  html += '<div class="card-list">';
  svcs.forEach(function(s) {
    html += '<div class="comp-cell" data-action="nav" data-payload="/service-provider/' + s.id + '"><div class="cell-body"><div class="cell-title">' + escapeHtml(s.name) + '</div><div class="cell-label">' + s.provider + ' · ' + escapeHtml(s.desc) + '</div></div>' + UI_Button('联系Ta', 'primary', 'small', true) + '</div>';
  });
  html += '</div></div>';
  return html;
};

Views.ServiceProvider = function() {
  var id = parseInt(Router.params.id);
  var html = '<div class="page-container">' + UI_NavBar('服务提供方', true);
  html += '<div style="text-align:center;padding:20px"><img src="https://picsum.photos/seed/svc' + id + '/100/100" style="width:64px;height:64px;border-radius:12px;margin:0 auto"><h3 style="margin:8px 0 4px">服务提供方 #' + id + '</h3></div>';
  html += '<div class="content-detail"><div class="body">专业的校友服务机构，为校友企业提供优质的服务解决方案。</div></div>';
  html += '<div class="bottom-bar">' + UI_Button('联系Ta', 'primary', '', true, true) + '</div>';
  html += '</div>';
  return html;
};

// --- TOPIC SHARE ---
Views.TopicShareList = function() {
  var html = '<div class="page-container">' + UI_NavBar('主题分享', true);
  html += '<div class="card-list">';
  topicList.forEach(function(t) {
    html += '<div class="comp-card" data-action="nav" data-payload="/topic-share/' + t.id + '"><img src="' + t.cover + '" class="card-thumb"><div class="card-info"><div class="card-title">' + escapeHtml(t.title) + '</div><div class="card-desc">' + escapeHtml(t.summary || '') + '</div><div class="card-meta">' + t.date + ' · ' + t.author + ' · ' + t.views + '阅读</div></div></div>';
  });
  html += '</div></div>';
  return html;
};

Views.TopicShareDetail = function() {
  var t = topicList.find(function(item) { return item.id == Router.params.id; });
  if (!t) return '<div class="page-container">' + UI_NavBar('分享详情', true) + UI_Empty('内容未找到') + '</div>';
  var collected = AppState.collectedTopics[t.id];
  var html = '<div class="page-container">' + UI_NavBar('分享详情', true);
  html += '<div class="content-detail"><h3>' + escapeHtml(t.title) + '</h3><div class="meta">' + t.author + ' · ' + t.date + ' · ' + t.views + '阅读</div><div class="body">' + t.content + '</div></div>';
  html += '<div class="bottom-bar-actions"><div class="bba-item' + (AppState.likedFeeds['t' + t.id] ? ' active' : '') + '" onclick="doLikeTopic(' + t.id + ')">' + (AppState.likedFeeds['t' + t.id] ? iconSVG('heartFilled', 18, 'var(--danger)') : iconSVG('heart', 18)) + '<span>' + t.likes + '</span></div><div class="bba-item' + (collected ? ' active' : '') + '" onclick="doCollectTopic(' + t.id + ')">' + (collected ? iconSVG('starFilled', 18, 'var(--accent)') : iconSVG('star', 18)) + '<span>' + (collected ? '已收藏' : '收藏') + '</span></div><div class="bba-item" onclick="doShare()">' + iconSVG('share', 18) + '<span>分享</span></div></div>';
  html += '</div>';
  return html;
};

// --- INTERVIEW ---
Views.InterviewList = function() {
  var html = '<div class="page-container">' + UI_NavBar('会员专访', true);
  html += '<div class="card-list">';
  interviewList.forEach(function(item) {
    html += '<div class="comp-card" data-action="nav" data-payload="/interview/' + item.id + '"><img src="' + item.cover + '" class="card-thumb"><div class="card-info"><div class="card-title">' + escapeHtml(item.title) + '</div><div class="card-desc">' + escapeHtml(item.summary || '') + '</div><div class="card-meta">' + item.date + ' · ' + item.author + ' · ' + item.views + '阅读</div></div></div>';
  });
  html += '</div></div>';
  return html;
};

Views.InterviewDetail = function() {
  var item = interviewList.find(function(x) { return x.id == Router.params.id; });
  if (!item) return '<div class="page-container">' + UI_NavBar('专访详情', true) + UI_Empty('内容未找到') + '</div>';
  var collected = AppState.collectedInterviews[item.id];
  var html = '<div class="page-container">' + UI_NavBar('专访详情', true);
  html += '<div class="content-detail"><h3>' + escapeHtml(item.title) + '</h3><div class="meta">' + item.author + ' · ' + item.date + ' · ' + item.views + '阅读</div><div class="body">' + item.content + '</div></div>';
  html += '<div class="bottom-bar-actions"><div class="bba-item' + (AppState.likedFeeds['i' + item.id] ? ' active' : '') + '" onclick="doLikeInterview(' + item.id + ')">' + (AppState.likedFeeds['i' + item.id] ? iconSVG('heartFilled', 18, 'var(--danger)') : iconSVG('heart', 18)) + '<span>' + item.likes + '</span></div><div class="bba-item' + (collected ? ' active' : '') + '" onclick="doCollectInterview(' + item.id + ')">' + (collected ? iconSVG('starFilled', 18, 'var(--accent)') : iconSVG('star', 18)) + '<span>' + (collected ? '已收藏' : '收藏') + '</span></div><div class="bba-item" onclick="doShare()">' + iconSVG('share', 18) + '<span>分享</span></div></div>';
  html += '</div>';
  return html;
};

// --- COURSES ---
Views.CourseList = function() {
  var html = '<div class="page-container">' + UI_NavBar('在线课程', true);
  html += '<div class="card-list">';
  courseList.forEach(function(c) {
    html += '<div class="course-item" data-action="nav" data-payload="/courses/' + c.id + '"><img src="' + c.cover + '" class="course-thumb"><div class="course-info"><div class="course-title">' + escapeHtml(c.title) + '</div><div class="course-meta">' + c.teacher + ' · ' + c.duration + ' · ' + c.students + '人学习</div><div class="course-price">¥' + c.price + '<span class="orig">¥' + c.originalPrice + '</span></div></div></div>';
  });
  html += '</div></div>';
  return html;
};

Views.CourseDetail = function() {
  var c = courseList.find(function(item) { return item.id == Router.params.id; });
  if (!c) return '<div class="page-container">' + UI_NavBar('课程详情', true) + UI_Empty('课程未找到') + '</div>';
  var tabs = [{ key: 'intro', name: '课程介绍' }, { key: 'chapters', name: '课程目录' }, { key: 'teacher', name: '讲师' }];
  var subscribed = isSubscribedCourse(c.id);
  var html = '<div class="page-container no-tab">' + UI_NavBar('课程详情', true, '<span data-action="share-course" data-id="' + c.id + '">' + iconSVG('share', 18, '#fff') + '</span>');
  html += '<img src="' + c.cover + '" style="width:100%;max-height:220px;object-fit:cover">';
  html += '<div style="padding:12px 16px"><h3>' + escapeHtml(c.title) + '</h3><div style="font-size:12px;color:var(--text-lighter);margin:4px 0">' + c.subtitle + '</div>';
  html += '<div style="color:var(--danger);font-size:22px;font-weight:700">¥' + c.price + '<span style="font-size:12px;color:var(--text-lighter);text-decoration:line-through;margin-left:4px">¥' + c.originalPrice + '</span><span style="font-size:12px;color:var(--accent);margin-left:8px">会员价 ¥' + c.memberPrice + '</span></div>';
  html += '<div style="display:flex;gap:16px;margin-top:8px;font-size:11px;color:var(--text-lighter)">' + c.duration + ' · ' + c.rating + '分 · ' + c.students + '人学习</div></div>';
  html += '<div style="display:flex;gap:8px;padding:4px 16px;flex-wrap:wrap">';
  c.tags.forEach(function(t) { html += UI_Tag(t, 'primary'); });
  html += '</div>';
  html += UI_Tabs(tabs, uiState.courseDetailTab);
  if (uiState.courseDetailTab === 'intro') {
    html += '<div class="content-detail"><h4>课程亮点</h4><div><ul style="padding-left:16px;line-height:2">';
    c.highlights.forEach(function(h) { html += '<li>' + escapeHtml(h) + '</li>'; });
    html += '</ul></div><h4>课程简介</h4><div class="body">' + escapeHtml(c.intro) + '</div></div>';
    if (c.reviewList && c.reviewList.length) {
      html += '<div class="comment-section"><div class="cmt-title">学员评价 (' + c.reviews + ')</div>';
      c.reviewList.forEach(function(r) {
        html += '<div class="comment-item"><img src="' + r.avatar + '"><div class="cmt-body"><div class="cmt-name">' + escapeHtml(r.user) + ' ' + '★'.repeat(r.rating) + '</div><div class="cmt-text">' + escapeHtml(r.content) + '</div><div class="cmt-time">' + r.date + '</div></div></div>';
      });
      html += '</div>';
    }
  } else if (uiState.courseDetailTab === 'chapters') {
    html += '<div style="padding:0 16px">';
    c.chapters.forEach(function(ch) {
      var isExpanded = uiState.expandedChapters[ch.id] !== false; // default expanded
      html += '<div style="padding:12px 0;border-bottom:1px solid var(--border)"><div style="font-weight:600;font-size:14px;margin-bottom:6px;display:flex;justify-content:space-between;cursor:pointer" data-action="toggle-chapter" data-chapter-id="' + ch.id + '"><span>' + escapeHtml(ch.title) + '</span><span>' + (isExpanded ? iconSVG('arrowDown', 14, '#999') : iconSVG('arrowRight', 14, '#999')) + '</span></div>';
      if (isExpanded) {
        html += '<div>';
        ch.lessons.forEach(function(l) {
          html += '<div style="display:flex;justify-content:space-between;padding:6px 8px;font-size:13px;color:var(--text-light);cursor:pointer" data-action="play-lesson" data-lesson-title="' + escapeHtml(l.title) + '" data-lesson-preview="' + l.preview + '"><span>' + (l.preview ? iconSVG('play', 12, 'var(--success)') + ' ' : iconSVG('play', 12, '#c8c9cc') + ' ') + escapeHtml(l.title) + '</span><span style="color:var(--text-lighter)">' + l.duration + '</span></div>';
        });
        html += '</div>';
      }
      html += '</div>';
    });
    html += '</div>';
  } else if (uiState.courseDetailTab === 'teacher') {
    html += '<div style="text-align:center;padding:20px"><img src="' + c.teacherAvatar + '" style="width:64px;height:64px;border-radius:50%;margin:0 auto"><div style="font-weight:600;margin:8px 0 4px">' + escapeHtml(c.teacher) + '</div><div style="font-size:12px;color:var(--text-lighter)">' + escapeHtml(c.teacherTitle) + '</div></div>';
    html += '<div class="content-detail"><div class="body">' + escapeHtml(c.teacherBio) + '</div></div>';
  }
  html += '<div class="bottom-bar"><span style="flex:1;display:flex;gap:16px;align-items:center"><span onclick="doShare()">' + iconSVG('share', 18, '#999') + '</span><span onclick="doCollectCourse(' + c.id + ')" style="color:' + (AppState.collectedCourses[c.id] ? 'var(--accent)' : '#999') + '">' + (AppState.collectedCourses[c.id] ? iconSVG('starFilled', 18, 'var(--accent)') : iconSVG('star', 18)) + '</span><span onclick="showToast(\'客服功能开发中\')">' + iconSVG('service', 18, '#999') + '</span></span>' + (subscribed ? '<button class="comp-btn outline round block">已订阅</button>' : '<button class="comp-btn primary round block" onclick="doSubscribeCourse(' + c.id + ')">立即订阅 ¥' + c.price + '</button>') + '</div>';
  html += '</div>';
  return html;
};

// --- GROUP BUY ---
Views.GroupBuyList = function() {
  var html = '<div class="page-container">' + UI_NavBar('团购专区', true);
  html += '<div class="gb-grid">';
  groupBuyList.forEach(function(g) {
    var pct = Math.round(g.soldCount / g.totalCount * 100);
    html += '<div class="gb-card" data-action="nav" data-payload="/group-buy/' + g.id + '"><img src="' + g.cover + '"><div class="gb-info"><div class="gb-title">' + escapeHtml(g.title) + '</div><div class="gb-price">¥' + g.price + '<span class="orig">¥' + g.originalPrice + '</span></div><div style="margin-top:4px">' + UI_Progress(pct) + '</div><div style="font-size:10px;color:var(--text-lighter);margin-top:2px">已售' + g.soldCount + '件</div></div></div>';
  });
  html += '</div></div>';
  return html;
};

Views.GroupBuyDetail = function() {
  var g = groupBuyList.find(function(item) { return item.id == Router.params.id; });
  if (!g) return '<div class="page-container">' + UI_NavBar('团购详情', true) + UI_Empty('商品未找到') + '</div>';
  var pct = Math.round(g.soldCount / g.totalCount * 100);
  var html = '<div class="page-container no-tab">' + UI_NavBar('团购详情', true);
  html += '<div class="comp-swipe" data-swipe="true"><div class="swipe-track">';
  g.images.forEach(function(img) { html += '<div class="swipe-item"><img src="' + img + '" data-action="preview-img" data-src="' + img + '" alt="" style="cursor:pointer"></div>'; });
  html += '</div><div class="swipe-dots">';
  g.images.forEach(function(_, i) { html += '<span class="' + (i === 0 ? 'active' : '') + '" data-dot="' + i + '"></span>'; });
  html += '</div></div>';
  html += '<div style="padding:12px 16px"><h3>' + escapeHtml(g.title) + '</h3>';
  html += '<div style="color:var(--danger);font-size:24px;font-weight:700;margin:8px 0">¥' + g.price + '<span style="font-size:12px;color:var(--text-lighter);text-decoration:line-through;margin-left:6px">¥' + g.originalPrice + '</span></div>';
  html += '<div style="margin:6px 0">' + UI_Progress(pct) + '</div><div style="font-size:11px;color:var(--text-lighter)">已售' + g.soldCount + '件 / 共' + g.totalCount + '件</div>';
  html += '<div style="font-size:12px;color:var(--text-lighter);margin-top:4px">供应商：' + escapeHtml(g.supplier) + ' · 截止：' + g.endDate + '</div></div>';
  html += '<div class="content-detail"><h4>商品描述</h4><div class="body">' + escapeHtml(g.desc) + '</div>';
  if (g.specs && g.specs.length) {
    html += '<h4 style="margin-top:10px">规格参数</h4><ul style="padding-left:16px;line-height:2">';
    g.specs.forEach(function(s) { html += '<li>' + escapeHtml(s) + '</li>'; });
    html += '</ul>';
  }
  html += '<h4 style="margin-top:10px">配送说明</h4><div class="body">' + escapeHtml(g.shipping) + '</div></div>';
  html += '<div style="display:flex;gap:4px;padding:4px 16px;flex-wrap:wrap">';
  g.tags.forEach(function(t) { html += UI_Tag(t, 'danger'); });
  html += '</div>';
  html += '<div class="bottom-bar"><div class="comp-stepper"><button data-action="stepper-minus">-</button><input type="number" value="1" id="gb-qty" style="width:40px;text-align:center" readonly><button data-action="stepper-plus">+</button></div><span style="flex:1"></span><button class="comp-btn primary round" onclick="doBuy()">立即购买</button></div>';
  html += '</div>';
  return html;
};

// --- PROFILE ---
Views.Profile = function() {
  var role = AppState.currentRole;
  var isAlumni = roleRank[role] >= 1;
  var isMember = roleRank[role] >= 2;
  var myAvatar = 'https://picsum.photos/seed/myavatar/100/100';
  // Stats based on role
  var stats = isAlumni
    ? '<div class="stat"><div class="num">3</div><div class="label">好友</div></div><div class="stat"><div class="num">4</div><div class="label">动态</div></div><div class="stat"><div class="num">1250</div><div class="label">积分</div></div>'
    : '<div class="stat"><div class="num">2</div><div class="label">订单</div></div><div class="stat"><div class="num">3</div><div class="label">收藏</div></div><div class="stat"><div class="num">1</div><div class="label">课程</div></div>';

  var html = '<div class="page-container">';
  html += '<div class="profile-header"><div class="profile-card">';
  html += '<div class="avatar-row"><img src="' + myAvatar + '" data-action="nav" data-payload="/profile/edit" style="cursor:pointer"><div class="info"><div class="name">演示用户 <span data-action="show-role-popup">' + UI_Tag(role, 'primary') + '</span></div><div style="font-size:11px;color:var(--text-lighter);margin-top:2px">自动化学院 · 2005级 · 北京</div></div><span data-action="toast" data-payload="设置功能即将上线">' + iconSVG('settings', 20, '#999') + '</span></div>';
  html += '<div class="stats">' + stats + '</div></div></div>';
  // Exchange requests (for alumni)
  if (isAlumni && AppState.incomingRequests.length > 0) {
    html += '<div style="padding:12px 16px 0"><div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">' + iconSVG('card', 18, '#6fa4cf') + '<span style="font-weight:600;font-size:14px">名片交换请求</span>' + UI_Tag(AppState.incomingRequests.length + '', 'danger') + '</div>';
    AppState.incomingRequests.forEach(function(rid) {
      var reqAlumni = alumniList.find(function(a) { return a.id === rid; });
      if (reqAlumni) {
        html += '<div class="exchange-card"><img src="' + reqAlumni.avatar + '"><div class="ex-info"><div class="ex-name">' + escapeHtml(reqAlumni.name) + '</div><div class="ex-school">' + reqAlumni.school + ' · ' + reqAlumni.year + '</div></div><div class="ex-btns"><span data-action="accept-exchange" data-id="' + rid + '">' + UI_Button('接受', 'primary', 'small', true) + '</span><span data-action="reject-exchange" data-id="' + rid + '">' + UI_Button('拒绝', 'danger', 'small', true) + '</span></div></div>';
      }
    });
    html += '</div>';
  }
  // Member promo
  if (!isMember) {
    html += '<div class="promo-card" data-action="nav" data-payload="/profile/member-edit"><div class="promo-icon">⭐</div><div class="promo-text"><div class="pt">升级为商务会员</div><div class="ps">解锁会员名片、企业展示、产品推广等更多权益</div></div>' + iconSVG('arrowRight', 16, '#dabb6e') + '</div>';
  }
  // Service grid
  html += '<div class="service-grid">';
  html += '<div class="svc-item" data-action="nav" data-payload="/profile/member-edit"><div class="svc-icon">' + iconSVG('award', 20, '#6fa4cf') + '</div><div class="svc-label">' + (isAlumni ? '会员信息' : '校友认证') + '</div></div>';
  html += '<div class="svc-item" data-action="nav" data-payload="/profile/member-edit"><div class="svc-icon">' + iconSVG('edit', 20, '#07c160') + '</div><div class="svc-label">资料编辑</div></div>';
  html += '<div class="svc-item" data-action="nav" data-payload="/profile/group-buy"><div class="svc-icon">' + iconSVG('bag', 20, '#ee0a24') + '</div><div class="svc-label">团购订单</div></div>';
  html += '<div class="svc-item" data-action="toast" data-payload="客服功能即将上线"><div class="svc-icon">' + iconSVG('phone', 20, '#ff976a') + '</div><div class="svc-label">客服</div></div>';
  html += '</div>';
  // Menu items
  var menus = [{ title: '订阅课程', key: '/profile/subscribe' }];
  if (!isAlumni) menus.push({ title: '我的收藏', key: '/profile/favorites' });
  if (isAlumni) {
    menus.push({ title: '我的好友', key: '/profile/favorites' }, { title: '我的活动', key: '/profile/activities' }, { title: '我的社团', key: '/profile/my-groups' }, { title: '我的动态', key: '/profile/my-feed' }, { title: '我的求助', key: '/profile/my-help' });
  }
  if (isMember) {
    menus.push({ title: '我的商务', key: '/profile/my-business' }, { title: '我的主题', key: '/profile/my-topics' }, { title: '积分明细', key: '/profile/points' });
  }
  menus.push({ title: '切换角色', key: '__role__' });
  var cells = menus.map(function(m) {
    if (m.key === '__role__') {
      return '<div class="comp-cell" data-action="show-role-popup"><div class="cell-body"><div class="cell-title">切换角色</div></div><span class="cell-arrow">' + iconSVG('arrowRight', 14, '#c8c9cc') + '</span></div>';
    }
    return '<div class="comp-cell" data-action="nav" data-payload="' + m.key + '"><div class="cell-body"><div class="cell-title">' + escapeHtml(m.title) + '</div></div><span class="cell-arrow">' + iconSVG('arrowRight', 14, '#c8c9cc') + '</span></div>';
  }).join('');
  html += '<div class="comp-cell-group inset">' + cells + '</div>';
  // Points bar
  if (isMember) {
    html += '<div style="display:flex;align-items:center;justify-content:space-between;padding:10px 16px;margin:0 16px 10px;background:linear-gradient(135deg,#fff8e1,#fff3cd);border-radius:8px"><div style="display:flex;align-items:center;gap:6px">' + iconSVG('coin', 18, '#dabb6e') + '<span style="font-weight:600">当前积分 1250</span></div><span style="font-size:12px;color:var(--accent);cursor:pointer" data-action="nav" data-payload="/profile/points">查看明细 &gt;</span></div>';
  }
  // Logout
  html += '<div style="padding:12px 16px 20px;display:flex;gap:10px"><span style="flex:1">' + UI_Button('退出登录', 'outline', '', true, true) + '</span><span style="flex:1">' + UI_Button('重置演示数据', 'outline', '', true) + '</span></div>';
  html += '</div>';
  return html;
};

Views.ProfileEdit = function() {
  return '<div class="page-container">' + UI_NavBar('编辑资料', true)
    + UI_Field('姓名', 'text', '请输入姓名', '演示用户') + UI_Field('性别', 'text', '请输入性别', '男')
    + UI_Field('出生日期', 'text', '请输入出生日期', '1990-01-01') + UI_Field('手机号', 'tel', '请输入手机号', '138****8888')
    + UI_Field('学校', 'text', '', '北京理工大学') + UI_Field('专业', 'text', '', '自动化') + UI_Field('年级', 'text', '', '2005级')
    + '<div style="padding:12px 16px">' + UI_Button('保存', 'primary', '', true, true) + '</div></div>';
};

Views.ProfileMemberEdit = function() {
  return '<div class="page-container">' + UI_NavBar('会员信息', true)
    + UI_Field('公司名称', 'text', '请输入公司名称') + UI_Field('职务', 'text', '请输入职务')
    + UI_Field('所在城市', 'text', '请输入城市') + UI_Field('行业', 'text', '请输入行业')
    + UI_Field('个人简介', 'textarea', '请输入个人简介...')
    + '<div style="padding:12px 16px">' + UI_Button('保存', 'primary', '', true, true) + '</div></div>';
};

Views.ProfileSubscribe = function() {
  var html = '<div class="page-container">' + UI_NavBar('订阅课程', true);
  var subs = courseList.filter(function(c) { return AppState.subscribedCourses.indexOf(c.id) >= 0; });
  if (!subs.length) { html += UI_Empty('暂无订阅课程'); }
  else {
    html += '<div class="card-list">';
    subs.forEach(function(c) {
      html += '<div class="comp-cell" data-action="nav" data-payload="/courses/' + c.id + '"><div class="cell-body"><div class="cell-title">' + escapeHtml(c.title) + '</div><div class="cell-label">' + c.teacher + ' · ' + c.duration + '</div></div><span class="cell-arrow">' + iconSVG('arrowRight', 14, '#c8c9cc') + '</span></div>';
    });
    html += '</div>';
  }
  html += '</div>';
  return html;
};

Views.ProfileGroupBuy = function() {
  var html = '<div class="page-container">' + UI_NavBar('团购订单', true);
  var orders = groupBuyList.filter(function(g) { return AppState.groupBuyOrders.indexOf(g.id) >= 0; });
  if (!orders.length) { html += UI_Empty('暂无团购订单'); }
  else {
    html += '<div class="card-list">';
    orders.forEach(function(g) {
      html += '<div class="comp-cell" data-action="nav" data-payload="/group-buy/' + g.id + '"><img src="' + g.cover + '" style="width:40px;height:40px;border-radius:4px;margin-right:10px;object-fit:cover"><div class="cell-body"><div class="cell-title">' + escapeHtml(g.title) + '</div><div class="cell-label">¥' + g.price + '</div></div><span class="cell-arrow">' + iconSVG('arrowRight', 14, '#c8c9cc') + '</span></div>';
    });
    html += '</div>';
  }
  html += '</div>';
  return html;
};

Views.ProfileFavorites = function() {
  var html = '<div class="page-container">' + UI_NavBar('我的好友', true);
  var friends = alumniList.filter(function(a) { return AppState.friendIds.indexOf(a.id) >= 0; });
  if (!friends.length) { html += UI_Empty('暂无好友'); }
  else {
    html += '<div class="card-list">';
    friends.forEach(function(a) {
      html += '<div class="comp-cell"><img src="' + a.avatar + '" style="width:40px;height:40px;border-radius:50%;margin-right:10px"><div class="cell-body"><div class="cell-title">' + escapeHtml(a.name) + '</div><div class="cell-label">' + a.school + ' · ' + a.major + ' · ' + a.year + '</div></div></div>';
    });
    html += '</div>';
  }
  html += '</div>';
  return html;
};

Views.ProfileActivities = function() {
  var tabs = [{ key: 'registered', name: '我报名的' }, { key: 'published', name: '我发布的' }];
  var html = '<div class="page-container">' + UI_NavBar('我的活动', true) + UI_Tabs(tabs, uiState.profileActTab);
  var acts = uiState.profileActTab === 'registered'
    ? activityList.filter(function(a) { return AppState.registeredActivities.indexOf(a.id) >= 0 || AppState.myActivities.indexOf(a.id) >= 0; })
    : activityList.filter(function(a, i) { return i < 2; });
  if (!acts.length) { html += UI_Empty('暂无活动'); }
  else {
    html += '<div class="card-list">';
    acts.forEach(function(a) {
      html += '<div class="comp-cell" data-action="nav" data-payload="/activity/' + a.id + '"><div class="cell-body"><div class="cell-title">' + escapeHtml(a.title) + '</div><div class="cell-label">' + a.date + ' ' + escapeHtml(a.location) + '</div></div>' + UI_Tag(a.status, a.status === '报名中' ? 'danger' : 'plain') + '</div>';
    });
    html += '</div>';
  }
  html += '</div>';
  return html;
};

Views.ProfileMyFeed = function() {
  var html = '<div class="page-container">' + UI_NavBar('我的动态', true);
  feedList.forEach(function(f) {
    html += '<div class="feed-item" data-action="nav" data-payload="/alumni-feed/' + f.id + '"><div class="feed-user"><img src="' + f.user.avatar + '"><div><div class="uname">' + escapeHtml(f.user.name) + '</div><div class="umeta">' + f.date + '</div></div></div><div class="feed-content" style="max-height:60px;overflow:hidden">' + escapeHtml(f.content) + '</div><div class="feed-actions"><span>' + iconSVG('heart', 14) + ' ' + f.likes + '</span><span>' + iconSVG('message', 14) + ' ' + f.comments + '</span></div></div>';
  });
  html += '</div>';
  return html;
};

Views.ProfileMyGroups = function() {
  var html = '<div class="page-container">' + UI_NavBar('我的社团', true);
  var myg = groupList.filter(function(g) { return AppState.joinedGroups.indexOf(g.id) >= 0; });
  if (!myg.length) { html += UI_Empty('暂无加入的社团'); }
  else {
    myg.forEach(function(g) {
      html += '<div class="group-card" data-action="nav" data-payload="/alumni-group/' + g.id + '"><img src="' + g.logo + '"><div class="group-info"><div class="group-name">' + escapeHtml(g.name) + '</div><div class="group-desc">' + escapeHtml(g.intro) + '</div><div class="group-meta">' + g.memberCount + '人</div></div></div>';
    });
  }
  html += '</div>';
  return html;
};

Views.ProfileMyHelp = function() {
  var tabs = [{ key: 'published', name: '我发布的' }, { key: 'responded', name: '我响应的' }];
  var html = '<div class="page-container">' + UI_NavBar('我的求助', true) + UI_Tabs(tabs, uiState.profileHelpTab);
  var items = uiState.profileHelpTab === 'published'
    ? helpList.filter(function(h) { return AppState.myHelp.indexOf(h.id) >= 0; })
    : helpList.filter(function(h) { return (h.responses || []).length > 0; });
  if (!items.length) { html += UI_Empty('暂无数据'); }
  else {
    html += '<div class="card-list">';
    items.forEach(function(h) {
      html += '<div class="comp-cell" data-action="nav" data-payload="/help/' + h.id + '"><div class="cell-body"><div class="cell-title">' + escapeHtml(h.title) + '</div><div class="cell-label">' + h.date + '</div></div>' + UI_Tag(h.status, h.status === '已解决' ? 'success' : 'warning') + '</div>';
    });
    html += '</div>';
  }
  html += '</div>';
  return html;
};

Views.ProfileMyBusiness = function() {
  var tabs = [{ key: 'biz', name: '我发起的商务' }, { key: 'demand', name: '我发布的需求' }];
  var html = '<div class="page-container">' + UI_NavBar('我的商务', true) + UI_Tabs(tabs, uiState.profileBizTab);
  var items = uiState.profileBizTab === 'biz'
    ? activityList.filter(function(a) { return AppState.myBiz.indexOf(a.id) >= 0; })
    : helpList.filter(function(h) { return AppState.myHelp.indexOf(h.id) >= 0; });
  if (!items.length) { html += UI_Empty('暂无数据'); }
  else {
    html += '<div class="card-list">';
    items.forEach(function(item) {
      html += '<div class="comp-cell"><div class="cell-body"><div class="cell-title">' + escapeHtml(item.title) + '</div><div class="cell-label">' + (item.date || '') + '</div></div></div>';
    });
    html += '</div>';
  }
  html += '</div>';
  return html;
};

Views.ProfileMyTopics = function() {
  var html = '<div class="page-container">' + UI_NavBar('我的主题', true);
  var myTop = topicList.filter(function(t) { return AppState.myTopics.indexOf(t.id) >= 0; });
  if (!myTop.length) { html += UI_Empty('暂无主题分享'); }
  else {
    html += '<div style="padding:10px 16px">' + UI_Button('发布主题', 'primary', 'small', true) + '</div>';
    myTop.forEach(function(t) {
      html += '<div class="comp-card" style="padding:12px 16px" data-action="nav" data-payload="/topic-share/' + t.id + '"><img src="' + t.cover + '" class="card-thumb"><div class="card-info"><div class="card-title">' + escapeHtml(t.title) + '</div><div class="card-meta">' + t.date + ' · ' + t.views + '阅读 · ' + t.likes + '赞</div></div></div>';
    });
  }
  html += '</div>';
  return html;
};

Views.ProfilePoints = function() {
  var html = '<div class="page-container">' + UI_NavBar('积分明细', true);
  html += '<div style="text-align:center;padding:30px 16px;background:linear-gradient(135deg,#fff8e1,#fff3cd);margin:12px 16px;border-radius:12px"><div style="font-size:40px;font-weight:700;color:var(--accent)">1250</div><div style="font-size:13px;color:var(--text-light);margin-top:4px">当前可用积分</div></div>';
  var records = [{ desc: '每日签到', points: '+10', date: '2026-06-17' }, { desc: '发布动态', points: '+5', date: '2026-06-16' }, { desc: '参加活动', points: '+20', date: '2026-06-15' }, { desc: '分享文章', points: '+5', date: '2026-06-14' }, { desc: '订阅课程', points: '-50', date: '2026-06-13' }];
  html += UI_CellGroup(records.map(function(r) { return { title: r.desc, value: r.points, label: r.date }; }), true);
  html += '</div>';
  return html;
};

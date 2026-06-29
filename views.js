
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
    '/member-service/:category', '/service-provider/:id', '/service-project/:id', '/service-chat/:providerId/:projectId',
    '/topic-share/:id', '/interview/:id',
    '/courses/:id', '/group-buy/:id', '/publish-feed', '/publish-help', '/publish-activity',
    '/profile/edit', '/profile/subscribe', '/profile/group-buy', '/profile/favorites',
    '/profile/activities', '/profile/member-edit', '/profile/add-company', '/profile/add-product',
    '/profile/my-feed', '/profile/my-groups',
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
  if (roleRank[AppState.currentRole] >= 2) {
    html += '<div style="padding:10px 16px">' + UI_Button('发布校友活动', 'primary', '', true, true) + '</div>';
  }
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
    html += '<img src="' + img('reg'+i, 60, 60) + '">';
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
  var html = '<div class="page-container">' + UI_NavBar('校友名片', true);

  // 搜索和筛选栏
  html += '<div style="padding:12px 16px;background:#fff;border-bottom:1px solid var(--border)">';
  html += '<div style="display:flex;gap:8px;align-items:center">';
  html += '<div style="padding:6px 12px;border:1px solid var(--border);border-radius:4px;font-size:14px;white-space:nowrap;display:flex;align-items:center;gap:4px">';
  html += '<span>筛选</span>';
  html += iconSVG('arrowDown', 12, '#999');
  html += '</div>';
  html += '<div style="flex:1;position:relative">';
  html += '<input type="search" placeholder="搜索校友姓名/公司" style="width:100%;padding:6px 12px;border:1px solid var(--border);border-radius:4px;font-size:14px;outline:none;box-sizing:border-box">';
  html += '</div>';
  html += '</div></div>';

  // 校友卡片列表
  html += '<div style="padding:12px;background:#f5f5f5">';
  alumniList.forEach(function(a) {
    var stat = '';
    if (isFriend(a.id)) stat = '<span style="padding:4px 10px;background:#e8f5e9;color:#4caf50;border-radius:12px;font-size:12px">已是好友</span>';
    else if (AppState.outgoingIds.indexOf(a.id) >= 0) stat = '<span style="padding:4px 10px;background:#f5f5f5;color:#999;border-radius:12px;font-size:12px">已发送请求</span>';
    else stat = '<button class="comp-btn primary small" data-action="exchange-card" data-id="' + a.id + '" onclick="event.stopPropagation()">交换名片</button>';

    html += '<div class="alumni-card" data-action="nav" data-payload="/alumni-card/' + a.id + '" style="background:#fff;border-radius:12px;padding:16px;margin-bottom:12px;box-shadow:0 2px 8px rgba(0,0,0,0.06)">';

    // 头部：头像+姓名+按钮
    html += '<div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">';
    html += '<img src="' + a.avatar + '" style="width:56px;height:56px;border-radius:50%;flex-shrink:0">';
    html += '<div style="flex:1;min-width:0">';
    html += '<div style="font-size:16px;font-weight:600;margin-bottom:4px;color:#333">' + escapeHtml(a.name) + '</div>';
    html += '<div style="font-size:12px;color:#999">' + escapeHtml(a.title) + '</div>';
    html += '</div>';
    html += '<div style="flex-shrink:0">' + stat + '</div>';
    html += '</div>';

    // 详细信息（分两行展示）
    html += '<div style="padding-top:10px;border-top:1px solid #f0f0f0">';
    html += '<div style="display:flex;flex-wrap:wrap;gap:10px;font-size:13px;color:#666">';
    html += '<div style="display:flex;align-items:center;gap:4px">' + iconSVG('building', 12, '#999') + '<span>' + escapeHtml(a.company) + '</span></div>';
    html += '<div style="display:flex;align-items:center;gap:4px">' + iconSVG('award', 12, '#999') + '<span>' + escapeHtml(a.school) + '</span></div>';
    html += '</div>';
    html += '<div style="display:flex;flex-wrap:wrap;gap:10px;font-size:13px;color:#666;margin-top:6px">';
    html += '<div style="display:flex;align-items:center;gap:4px">' + iconSVG('users', 12, '#999') + '<span>' + escapeHtml(a.year) + '</span></div>';
    html += '<div style="display:flex;align-items:center;gap:4px"><span style="display:inline-block;padding:1px 8px;background:#e3f2fd;color:#1976d2;border-radius:4px;font-size:11px">' + escapeHtml(a.industry) + '</span></div>';
    html += '<div style="display:flex;align-items:center;gap:4px;color:#999"><span>' + escapeHtml(a.city) + '</span></div>';
    html += '</div></div>';

    html += '</div>';
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
  if (roleRank[AppState.currentRole] >= 1) {
    html += '<div class="bottom-bar">' + UI_Button('发布求助', 'primary', '', true, true) + '</div>';
  }
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
  var html = '<div class="page-container">' + UI_NavBar('会员名片', true);

  // 搜索和筛选栏
  html += '<div style="padding:12px 16px;background:#fff;border-bottom:1px solid var(--border)">';
  html += '<div style="display:flex;gap:8px;align-items:center">';
  html += '<div style="padding:6px 12px;border:1px solid var(--border);border-radius:4px;font-size:14px;white-space:nowrap;display:flex;align-items:center;gap:4px">';
  html += '<span>筛选</span>';
  html += iconSVG('arrowDown', 12, '#999');
  html += '</div>';
  html += '<div style="flex:1;position:relative">';
  html += '<input type="search" placeholder="搜索会员姓名/公司" style="width:100%;padding:6px 12px;border:1px solid var(--border);border-radius:4px;font-size:14px;outline:none;box-sizing:border-box">';
  html += '</div>';
  html += '</div></div>';

  // 会员卡片列表
  html += '<div style="padding:12px;background:#f5f5f5">';
  memberList.forEach(function(m) {
    html += '<div class="member-card" data-action="nav" data-payload="/member-card/' + m.id + '" style="background:#fff;border-radius:12px;padding:16px;margin-bottom:12px;box-shadow:0 2px 8px rgba(0,0,0,0.06);position:relative;overflow:hidden">';

    // 会员标签（右上角）
    html += '<div style="position:absolute;top:0;right:0;background:linear-gradient(135deg,#dabb6e,#e8c987);color:#fff;font-size:11px;padding:3px 12px;border-bottom-left-radius:8px">商务会员</div>';

    // 头部：头像+姓名+职位
    html += '<div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">';
    html += '<img src="' + m.avatar + '" style="width:60px;height:60px;border-radius:50%;flex-shrink:0;border:2px solid #dabb6e">';
    html += '<div style="flex:1;min-width:0">';
    html += '<div style="font-size:17px;font-weight:600;margin-bottom:4px;color:#333">' + escapeHtml(m.name) + '</div>';
    html += '<div style="font-size:13px;color:#666;margin-bottom:2px">' + escapeHtml(m.title) + '</div>';
    html += '<div style="font-size:12px;color:#999;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' + escapeHtml(m.company) + '</div>';
    html += '</div>';
    html += '</div>';

    // 详细信息
    html += '<div style="padding-top:10px;border-top:1px solid #f0f0f0">';
    html += '<div style="display:flex;flex-wrap:wrap;gap:10px;font-size:13px;color:#666">';
    html += '<div style="display:flex;align-items:center;gap:4px">' + iconSVG('award', 12, '#999') + '<span>' + escapeHtml(m.school) + '</span></div>';
    html += '<div style="display:flex;align-items:center;gap:4px">' + iconSVG('users', 12, '#999') + '<span>' + escapeHtml(m.year) + '</span></div>';
    html += '</div>';
    html += '<div style="display:flex;flex-wrap:wrap;gap:10px;font-size:13px;color:#666;margin-top:6px;align-items:center">';
    html += '<span style="display:inline-block;padding:1px 8px;background:#e3f2fd;color:#1976d2;border-radius:4px;font-size:11px">' + escapeHtml(m.industry) + '</span>';
    html += '<span style="color:#999">' + escapeHtml(m.city) + '</span>';
    html += '<span style="color:#999;margin-left:auto;font-size:11px">入会：' + escapeHtml(m.memberSince) + '</span>';
    html += '</div></div>';

    html += '</div>';
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
  var html = '<div class="page-container">' + UI_NavBar('会员企业', true);

  // 搜索和筛选栏
  html += '<div style="padding:12px 16px;background:#fff;border-bottom:1px solid var(--border)">';
  html += '<div style="display:flex;gap:8px;align-items:center">';

  // 行业分类下拉（简化版，显示为按钮）
  html += '<div style="padding:6px 12px;border:1px solid var(--border);border-radius:4px;font-size:14px;white-space:nowrap;display:flex;align-items:center;gap:4px">';
  html += '<span>行业分类</span>';
  html += iconSVG('arrowDown', 12, '#999');
  html += '</div>';

  // 搜索框
  html += '<div style="flex:1;position:relative">';
  html += '<input type="search" placeholder="搜索企业或简讯" style="width:100%;padding:6px 12px;border:1px solid var(--border);border-radius:4px;font-size:14px;outline:none;box-sizing:border-box">';
  html += '</div>';
  html += '</div></div>';

  // 企业列表
  html += '<div style="padding:8px 0;background:#f5f5f5">';
  companyList.forEach(function(c) {
    html += '<div class="company-card" data-action="nav" data-payload="/member-company/' + c.id + '" style="background:#fff;margin-bottom:8px;padding:12px 16px;display:flex;align-items:center;gap:12px">';

    // 企业logo（圆形）
    html += '<img src="' + c.logo + '" style="width:48px;height:48px;border-radius:50%;flex-shrink:0;object-fit:cover">';

    // 企业信息
    html += '<div style="flex:1;min-width:0">';
    html += '<div style="font-size:16px;font-weight:600;margin-bottom:4px;color:#333">' + escapeHtml(c.name) + '</div>';
    html += '<div style="font-size:13px;color:#666;margin-bottom:2px">行业：' + escapeHtml(c.industry) + '</div>';
    html += '<div style="font-size:13px;color:#999">地址：' + escapeHtml(c.address) + '</div>';
    html += '</div>';

    // 右箭头
    html += '<div style="flex-shrink:0">' + iconSVG('arrow-right', 16, '#ccc') + '</div>';

    html += '</div>';
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
    html += '<div class="section-title" style="padding:8px 16px;background:#fff">旗下产品</div>';
    html += '<div style="padding:8px 0;background:#f5f5f5">';
    c.products.forEach(function(p) {
      html += '<div class="product-card" data-action="nav" data-payload="/member-product/' + p.id + '" style="background:#fff;margin-bottom:8px;padding:12px 16px;display:flex;gap:12px">';

      // 产品图片（方形）
      html += '<img src="' + p.cover + '" style="width:80px;height:80px;border-radius:6px;flex-shrink:0;object-fit:cover">';

      // 产品信息
      html += '<div style="flex:1;min-width:0;display:flex;flex-direction:column;justify-content:center">';
      html += '<div style="font-size:15px;font-weight:600;margin-bottom:4px;color:#333">产品名称：' + escapeHtml(p.name) + '</div>';
      html += '<div style="font-size:13px;color:#666;margin-bottom:2px">所属行业：' + escapeHtml(p.industry) + '</div>';
      html += '<div style="font-size:13px;color:#666;margin-bottom:2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">应用领域：' + escapeHtml((p.intro || '').substring(0, 20)) + ((p.intro || '').length > 20 ? '...' : '') + '</div>';
      html += '<div style="font-size:13px;color:#666">生产企业：' + escapeHtml(c.name) + '</div>';
      html += '</div>';

      html += '</div>';
    });
    html += '</div>';
  }
  html += '</div>';
  return html;
};

// --- MEMBER PRODUCT ---
Views.MemberProductList = function() {
  var html = '<div class="page-container">' + UI_NavBar('会员产品', true);

  // 搜索和筛选栏
  html += '<div style="padding:12px 16px;background:#fff;border-bottom:1px solid var(--border)">';
  html += '<div style="display:flex;gap:8px;align-items:center">';

  // 行业分类下拉
  html += '<div style="padding:6px 12px;border:1px solid var(--border);border-radius:4px;font-size:14px;white-space:nowrap;display:flex;align-items:center;gap:4px">';
  html += '<span>行业分类</span>';
  html += iconSVG('arrowDown', 12, '#999');
  html += '</div>';

  // 搜索框
  html += '<div style="flex:1;position:relative">';
  html += '<input type="search" placeholder="搜索产品类键词" style="width:100%;padding:6px 12px;border:1px solid var(--border);border-radius:4px;font-size:14px;outline:none;box-sizing:border-box">';
  html += '</div>';
  html += '</div>';

  // 产品数量统计
  html += '<div style="padding:8px 16px;font-size:13px;color:#666;background:#fff">当前产品数量：' + productList.length + '个</div>';
  html += '</div>';

  // 产品列表
  html += '<div style="padding:8px 0;background:#f5f5f5">';
  productList.forEach(function(p) {
    html += '<div class="product-card" data-action="nav" data-payload="/member-product/' + p.id + '" style="background:#fff;margin-bottom:8px;padding:12px 16px;display:flex;gap:12px">';

    // 产品图片（方形）
    html += '<img src="' + p.cover + '" style="width:80px;height:80px;border-radius:6px;flex-shrink:0;object-fit:cover">';

    // 产品信息
    html += '<div style="flex:1;min-width:0;display:flex;flex-direction:column;justify-content:center">';
    html += '<div style="font-size:15px;font-weight:600;margin-bottom:4px;color:#333">产品名称：' + escapeHtml(p.name) + '</div>';
    html += '<div style="font-size:13px;color:#666;margin-bottom:2px">所属行业：' + escapeHtml(p.industry) + '</div>';
    html += '<div style="font-size:13px;color:#666;margin-bottom:2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">应用领域：' + escapeHtml(p.intro.substring(0, 20)) + (p.intro.length > 20 ? '...' : '') + '</div>';
    html += '<div style="font-size:13px;color:#666">生产企业：' + escapeHtml(p.company) + '</div>';
    html += '</div>';

    html += '</div>';
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
    { key: 'market', name: '市场推广', desc: '供需匹配 · 渠道拓展 · 项目合作', icon: 'fire', gradient: 'linear-gradient(135deg, #6fa4cf, #4a90d9)', tagBg: '#e8f4fd', tagColor: '#4a90d9' },
    { key: 'empower', name: '企业赋能', desc: '投融资 · 流量运营 · 人才招聘等10项', icon: 'activity', gradient: 'linear-gradient(135deg, #07c160, #05a04a)', tagBg: '#e8f8ee', tagColor: '#05a04a' },
    { key: 'biz-activity', name: '商务活动', desc: '主题沙龙 · 项目路演 · 年度峰会等12项', icon: 'calendar', gradient: 'linear-gradient(135deg, #ee0a24, #d00820)', tagBg: '#fff0f0', tagColor: '#d00820' },
    { key: 'exclusive', name: '专属服务', desc: '亲子教育 · 医疗保健 · 居家置业等', icon: 'service', gradient: 'linear-gradient(135deg, #ff976a, #f07a4a)', tagBg: '#fff7ed', tagColor: '#f07a4a' }
  ];

  var html = '<div class="page-container" style="background:#f5f6fa">' + UI_NavBar('会员服务', true);

  // 顶部说明条
  html += '<div style="padding:12px 16px;background:linear-gradient(135deg,#f0f4ff,#fff);display:flex;align-items:center;gap:8px;border-bottom:1px solid #eef0f5">';
  html += '<div style="width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#6fa4cf,#9bc1de);display:flex;align-items:center;justify-content:center;flex-shrink:0">' + iconSVG('service', 16, '#fff') + '</div>';
  html += '<div><div style="font-size:13px;font-weight:600;color:#333">欢迎使用会员服务</div><div style="font-size:11px;color:#999">北理工校友专属的商务服务对接平台</div></div>';
  html += '</div>';

  // 大类卡片 - 横向两列布局
  html += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;padding:12px 16px">';
  cats.forEach(function(c) {
    var subCount = (serviceCategoryMap[c.name] || []).length;
    var projectCount = serviceProjects.filter(function(p) {
      return (serviceCategoryMap[c.name] || []).indexOf(p.category) >= 0;
    }).length;
    html += '<div data-action="nav" data-payload="/member-service/' + c.key + '" style="background:#fff;border-radius:14px;padding:14px 12px;box-shadow:0 2px 12px rgba(0,0,0,0.06);position:relative;overflow:hidden;cursor:pointer">';
    // 顶部彩色色条
    html += '<div style="position:absolute;top:0;left:0;right:0;height:3px;background:' + c.gradient + '"></div>';
    // 图标
    html += '<div style="width:42px;height:42px;border-radius:12px;background:' + c.gradient + ';display:flex;align-items:center;justify-content:center;margin-bottom:10px">' + iconSVG(c.icon, 22, '#fff') + '</div>';
    // 名称
    html += '<div style="font-size:15px;font-weight:700;color:#222;margin-bottom:4px">' + c.name + '</div>';
    // 描述
    html += '<div style="font-size:11px;color:#888;line-height:1.5">' + c.desc + '</div>';
    // 统计
    html += '<div style="display:flex;align-items:center;gap:12px;margin-top:10px;padding-top:8px;border-top:1px solid #f0f0f0">';
    html += '<span style="font-size:10px;color:#aaa">' + subCount + ' 个子类</span>';
    html += '<span style="font-size:10px;color:#aaa">' + projectCount + ' 项服务</span>';
    html += '</div>';
    html += '</div>';
  });
  html += '</div>';

  // 分隔标题
  html += '<div style="padding:8px 16px 12px">';
  html += '<div style="display:flex;align-items:center;gap:6px">';
  html += '<div style="width:4px;height:16px;background:linear-gradient(180deg,#6fa4cf,#9bc1de);border-radius:2px"></div>';
  html += '<span style="font-size:15px;font-weight:600;color:#333">全部服务分类</span>';
  html += '</div></div>';

  // 子分类预览 - 每个大类面板
  html += '<div style="padding:0 16px 20px">';
  cats.forEach(function(c) {
    var subs = serviceCategoryMap[c.name] || [];
    if (subs.length === 0) return;
    html += '<div style="background:#fff;border-radius:14px;padding:16px;margin-bottom:12px;box-shadow:0 2px 10px rgba(0,0,0,0.04)">';
    // 头部
    html += '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">';
    html += '<div style="display:flex;align-items:center;gap:8px">';
    html += '<div style="width:8px;height:8px;border-radius:50%;background:' + c.tagColor + '"></div>';
    html += '<span style="font-size:15px;font-weight:700;color:#222">' + c.name + '</span>';
    html += '<span style="font-size:11px;color:#aaa;margin-left:4px">' + subs.length + '项</span>';
    html += '</div>';
    html += '<span data-action="nav" data-payload="/member-service/' + c.key + '" style="display:flex;align-items:center;gap:4px;font-size:12px;color:' + c.tagColor + ';cursor:pointer;padding:4px 8px;border-radius:12px;background:' + c.tagBg + '">全部' + iconSVG('arrow-right', 10, c.tagColor) + '</span>';
    html += '</div>';

    // 子分类标签
    html += '<div style="display:flex;flex-wrap:wrap;gap:6px">';
    subs.forEach(function(sub) {
      var count = serviceProjects.filter(function(p) { return p.category === sub; }).length;
      html += '<span data-action="nav" data-payload="/member-service/' + c.key + '" style="display:inline-block;padding:6px 12px;background:' + c.tagBg + ';color:' + c.tagColor + ';border-radius:8px;font-size:12px;font-weight:500;cursor:pointer;transition:all 0.2s">' + escapeHtml(sub) + (count > 0 ? '<span style="font-size:10px;opacity:0.7;margin-left:4px">' + count + '</span>' : '') + '</span>';
    });
    html += '</div>';
    html += '</div>';
  });
  html += '</div>';

  html += '</div>';
  return html;
};

Views.MemberServiceDetail = function() {
  var catKey = Router.params.category || '';

  // 分类key到名称的映射
  var categoryNames = {
    'market': '市场推广',
    'empower': '企业赋能',
    'biz-activity': '商务活动',
    'exclusive': '专属服务'
  };

  var catName = categoryNames[catKey] || '服务详情';

  // 获取该大类下的所有子分类
  var subCategories = serviceCategoryMap[catName] || [];

  // 当前选中的子分类（从uiState获取，默认为"全部"）
  if (!uiState.serviceSubCategory) uiState.serviceSubCategory = {};
  var currentSub = uiState.serviceSubCategory[catKey] || '';

  // 根据大类和子分类筛选服务项目
  var projects = serviceProjects.filter(function(p) {
    var inCategory = subCategories.indexOf(p.category) >= 0;
    if (!inCategory) return false;
    if (currentSub && p.category !== currentSub) return false;
    return true;
  }).map(function(p) {
    var provider = serviceProviders.find(function(sp) { return sp.id === p.providerId; });
    return {
      id: p.id,
      name: p.name,
      desc: p.desc,
      price: p.price,
      unit: p.unit,
      category: p.category,
      viewCount: p.viewCount,
      orderCount: p.orderCount,
      providerName: provider ? provider.name : '未知机构',
      providerAvatar: provider ? provider.avatar : img('default', 100, 100),
      providerId: p.providerId
    };
  });

  var html = '<div class="page-container" style="background:#f5f6fa">' + UI_NavBar(catName, true);

  // 子分类标签筛选（可点击）
  if (subCategories.length > 0) {
    html += '<div style="padding:10px 16px;background:#fff;border-bottom:1px solid #eef0f5;display:flex;align-items:center;gap:8px;overflow-x:auto;white-space:nowrap;-webkit-overflow-scrolling:touch">';

    // 全部按钮
    var allActive = !currentSub;
    html += '<span data-action="filter-service-sub" data-cat="' + catKey + '" data-sub="" style="flex-shrink:0;display:inline-flex;align-items:center;padding:6px 14px;background:' + (allActive ? 'linear-gradient(135deg,#6fa4cf,#4a90d9)' : '#f0f2f5') + ';color:' + (allActive ? '#fff' : '#666') + ';border-radius:20px;font-size:13px;cursor:pointer;font-weight:' + (allActive ? '600' : '400') + ';transition:all 0.2s">全部</span>';

    // 子分类按钮
    subCategories.forEach(function(sub) {
      var isActive = currentSub === sub;
      var count = serviceProjects.filter(function(p) { return p.category === sub; }).length;
      html += '<span data-action="filter-service-sub" data-cat="' + catKey + '" data-sub="' + escapeHtml(sub) + '" style="flex-shrink:0;display:inline-flex;align-items:center;gap:4px;padding:6px 14px;background:' + (isActive ? 'linear-gradient(135deg,#6fa4cf,#4a90d9)' : '#f0f2f5') + ';color:' + (isActive ? '#fff' : '#666') + ';border-radius:20px;font-size:12px;cursor:pointer;font-weight:' + (isActive ? '600' : '400') + ';transition:all 0.2s">' + escapeHtml(sub) + (count > 0 ? '<span style="font-size:10px;opacity:0.8">' + count + '</span>' : '') + '</span>';
    });
    html += '</div>';

    // 当前筛选状态
    if (currentSub) {
      html += '<div style="padding:8px 16px;background:#f0f4ff;display:flex;align-items:center;gap:6px;font-size:12px;color:#4a90d9">';
      html += iconSVG('check', 14, '#4a90d9');
      html += '当前筛选：<b>' + escapeHtml(currentSub) + '</b>';
      html += '<span data-action="filter-service-sub" data-cat="' + catKey + '" data-sub="" style="margin-left:auto;color:#999;cursor:pointer;font-size:11px">清除筛选</span>';
      html += '</div>';
    }
  }

  if (projects.length === 0) {
    html += '<div style="padding:60px 20px;text-align:center">';
    html += '<div style="margin-bottom:12px">' + iconSVG('package', 48, '#ddd') + '</div>';
    html += '<div style="font-size:14px;color:#999;margin-bottom:4px">暂无服务项目</div>';
    html += '<div style="font-size:12px;color:#bbb">该分类下暂未上架服务，请稍后再来</div>';
    html += '</div>';
  } else {
    html += '<div style="padding:12px 16px">';
    projects.forEach(function(proj) {
      html += '<div class="service-card" data-action="nav" data-payload="/service-project/' + proj.id + '" style="background:#fff;border-radius:14px;padding:16px;margin-bottom:12px;box-shadow:0 2px 10px rgba(0,0,0,0.04);position:relative">';

      // 左上角分类标签
      html += '<span style="position:absolute;top:14px;right:14px;display:inline-block;padding:3px 10px;background:#e8f5e9;color:#4caf50;border-radius:10px;font-size:11px;font-weight:500">' + escapeHtml(proj.category) + '</span>';

      // 服务机构信息
      html += '<div style="display:flex;align-items:center;gap:10px;margin-bottom:12px">';
      html += '<img src="' + proj.providerAvatar + '" style="width:38px;height:38px;border-radius:10px;flex-shrink:0;box-shadow:0 2px 6px rgba(0,0,0,0.08)">';
      html += '<div>';
      html += '<div style="font-size:13px;font-weight:600;color:#333;margin-bottom:2px">' + escapeHtml(proj.providerName) + '</div>';
      html += '<div style="font-size:11px;color:#aaa">' + (proj.orderCount || 0) + ' 次合作</div>';
      html += '</div></div>';

      // 服务标题
      html += '<div style="font-size:16px;font-weight:700;color:#222;margin-bottom:8px;line-height:1.4;padding-right:100px">' + escapeHtml(proj.name) + '</div>';

      // 描述
      html += '<div style="font-size:13px;color:#666;line-height:1.6;margin-bottom:12px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">' + escapeHtml(proj.desc) + '</div>';

      // 价格和统计
      html += '<div style="display:flex;align-items:flex-end;justify-content:space-between;padding-top:12px;border-top:1px solid #f5f5f5">';
      html += '<div style="display:flex;align-items:baseline;gap:3px">';
      html += '<span style="font-size:22px;font-weight:800;color:#f56c6c;letter-spacing:-0.5px">¥' + proj.price.toLocaleString() + '</span>';
      html += '<span style="font-size:12px;color:#aaa">/ ' + proj.unit + '</span>';
      html += '</div>';
      html += '<div style="display:flex;align-items:center;gap:12px;font-size:11px;color:#bbb">';
      html += '<span style="display:flex;align-items:center;gap:3px">' + iconSVG('eye', 11, '#ccc') + proj.viewCount + '</span>';
      html += '<span style="display:flex;align-items:center;gap:3px">' + iconSVG('bag', 11, '#ccc') + proj.orderCount + '</span>';
      html += '</div></div>';

      html += '</div>';
    });
    html += '</div>';
  }

  html += '</div>';
  return html;
};

Views.ServiceProvider = function() {
  var id = parseInt(Router.params.id);
  var html = '<div class="page-container">' + UI_NavBar('服务提供方', true);
  html += '<div style="text-align:center;padding:20px"><img src="' + img('svc'+id, 100, 100) + '" style="width:64px;height:64px;border-radius:12px;margin:0 auto"><h3 style="margin:8px 0 4px">服务提供方 #' + id + '</h3></div>';
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
  var myAvatar = img('myavatar', 100, 100);
  // Stats based on role
  var stats = isAlumni
    ? '<div class="stat"><div class="num">3</div><div class="label">好友</div></div><div class="stat"><div class="num">4</div><div class="label">动态</div></div><div class="stat"><div class="num">1250</div><div class="label">积分</div></div>'
    : '<div class="stat"><div class="num">2</div><div class="label">订单</div></div><div class="stat"><div class="num">3</div><div class="label">收藏</div></div><div class="stat"><div class="num">1</div><div class="label">课程</div></div>';

  var html = '<div class="page-container">';
  html += '<div class="profile-header"><div class="profile-card">';

  // 会员到期提醒（仅商务会员/服务机构）
  var memberExpiry = '';
  if (isMember) {
    var expiryDate = '2026-12-31';
    var today = new Date();
    var expDate = new Date(expiryDate);
    var daysLeft = Math.ceil((expDate - today) / (1000 * 60 * 60 * 24));
    var expColor, expText;
    if (daysLeft < 0) {
      expColor = '#ee0a24'; expText = '已过期';
    } else if (daysLeft <= 30) {
      expColor = '#ff976a'; expText = '剩余' + daysLeft + '天 · ' + expiryDate;
    } else {
      expColor = '#07c160'; expText = '有效期至 ' + expiryDate;
    }
    memberExpiry = '<span style="display:inline-flex;align-items:center;gap:3px;margin-left:6px;padding:2px 8px;background:' + expColor + '14;color:' + expColor + ';border-radius:10px;font-size:11px;font-weight:500" data-action="toast" data-payload="点击续费功能即将上线">' + iconSVG('clock', 11, expColor) + expText + '</span>';
  }

  html += '<div class="avatar-row"><img src="' + myAvatar + '" data-action="nav" data-payload="/profile/edit" style="cursor:pointer"><div class="info"><div class="name">演示用户 <span data-action="show-role-popup">' + UI_Tag(role, 'primary') + '</span>' + memberExpiry + '</div><div style="font-size:11px;color:var(--text-lighter);margin-top:2px">自动化学院 · 2005级 · 北京</div></div><span data-action="nav" data-payload="/profile/settings">' + iconSVG('settings', 20, '#999') + '</span></div>';
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
  // Member promo (only for 认证校友, not 普通用户)
  if (isAlumni && !isMember) {
    html += '<div class="promo-card" data-action="nav" data-payload="/profile/member-edit"><div class="promo-icon">⭐</div><div class="promo-text"><div class="pt">升级为商务会员</div><div class="ps">解锁会员名片、企业展示、产品推广等更多权益</div></div>' + iconSVG('arrowRight', 16, '#dabb6e') + '</div>';
  }
  // Service grid
  html += '<div class="service-grid">';
  html += '<div class="svc-item" data-action="nav" data-payload="' + (isAlumni ? '/profile/member-edit' : '/profile/edit') + '"><div class="svc-icon">' + iconSVG('award', 20, '#6fa4cf') + '</div><div class="svc-label">' + (isAlumni ? (isMember ? '商务信息' : '升级会员') : '校友认证') + '</div></div>';
  html += '<div class="svc-item" data-action="nav" data-payload="/profile/edit"><div class="svc-icon">' + iconSVG('edit', 20, '#07c160') + '</div><div class="svc-label">资料编辑</div></div>';
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
  html += '</div>';
  return html;
};

Views.ProfileSettings = function() {
  var appVersion = 'v1.0.0';
  var buildDate = '2026-06-25';
  var html = '<div class="page-container">' + UI_NavBar('设置', true);

  html += '<div style="padding:12px 0">';

  // 系统信息
  html += '<div style="font-size:13px;font-weight:600;color:var(--text-light);padding:12px 20px 6px">系统信息</div>';
  html += '<div class="comp-cell-group inset">';
  html += '<div class="comp-cell"><div class="cell-body"><div class="cell-title">当前版本</div></div><span class="cell-value" style="color:var(--text-light)">' + appVersion + '</span></div>';
  html += '<div class="comp-cell"><div class="cell-body"><div class="cell-title">构建日期</div></div><span class="cell-value" style="color:var(--text-light)">' + buildDate + '</span></div>';
  html += '<div class="comp-cell" data-action="toast" data-payload="已是最新版本"><div class="cell-body"><div class="cell-title">检查更新</div></div><span class="cell-arrow">' + iconSVG('arrowRight', 14, '#c8c9cc') + '</span></div>';
  html += '</div>';

  // 账户管理
  html += '<div style="font-size:13px;font-weight:600;color:var(--text-light);padding:12px 20px 6px">账户管理</div>';
  html += '<div class="comp-cell-group inset">';
  html += '<div class="comp-cell" data-action="logout"><div class="cell-body"><div class="cell-title" style="color:#ee0a24">退出登录</div></div><span class="cell-arrow">' + iconSVG('arrowRight', 14, '#c8c9cc') + '</span></div>';
  html += '</div>';

  // 开发者选项
  html += '<div style="font-size:13px;font-weight:600;color:var(--text-light);padding:12px 20px 6px">开发者选项</div>';
  html += '<div class="comp-cell-group inset">';
  html += '<div class="comp-cell" data-action="reset-data"><div class="cell-body"><div class="cell-title" style="color:#ff976a">重置演示数据</div></div><span class="cell-arrow">' + iconSVG('arrowRight', 14, '#c8c9cc') + '</span></div>';
  html += '</div>';

  html += '</div></div>';
  return html;
};

Views.ProfileEdit = function() {
  var role = AppState.currentRole;
  var isAlumni = roleRank[role] >= 1;
  var pageTitle = isAlumni ? '编辑校友信息' : '申请校友认证';
  var btnText = isAlumni ? '保存' : '提交审核';

  var d = isAlumni ? {
    avatar: img('myavatar', 100, 100),
    name: '赵明辉', gender: '男', birth: '1987-05', phone: '138****8888', email: 'zhaomh@example.com',
    school: '北京理工大学', dept: '自动化学院', major: '控制科学与工程', year: '2005级', degree: '硕士',
    hometown: '江苏南京', city: '北京', tags: '创业,人工智能,智能制造', hobbies: '篮球,摄影,阅读', intro: ''
  } : {
    avatar: '', name: '', gender: '', birth: '', phone: '', email: '',
    school: '', dept: '', major: '', year: '', degree: '',
    hometown: '', city: '', tags: '', hobbies: '', intro: ''
  };

  function genderField(val) {
    var opts = ['男', '女'];
    var sel = opts.map(function(o) { return '<option value="' + o + '"' + (o === val ? ' selected' : '') + '>' + o + '</option>'; }).join('');
    return '<div class="comp-field"><span class="field-label required">性别</span><select class="pe-select">'
      + '<option value="" disabled' + (val ? '' : ' selected') + '>请选择性别</option>' + sel + '</select></div>';
  }
  function degreeField(val) {
    var opts = ['本科', '硕士', '博士', '其它'];
    var sel = opts.map(function(o) { return '<option value="' + o + '"' + (o === val ? ' selected' : '') + '>' + o + '</option>'; }).join('');
    return '<div class="comp-field"><span class="field-label required">学历层次</span><select class="pe-select">'
      + '<option value="" disabled' + (val ? '' : ' selected') + '>请选择学历层次</option>' + sel + '</select></div>';
  }
  function avatarField(val) {
    var preview = val
      ? '<img src="' + val + '" id="pe-avatar-preview" style="width:60px;height:60px;border-radius:50%;object-fit:cover;border:1px solid #ebedf0">'
      : '<div id="pe-avatar-preview" style="width:60px;height:60px;border-radius:50%;background:#f5f5f5;display:flex;align-items:center;justify-content:center;border:1px dashed #c8c9cc;color:#c8c9cc;font-size:24px">+</div>';
    return '<div class="comp-field" style="align-items:center"><span class="field-label required">上传头像</span>'
      + '<label style="display:flex;align-items:center;gap:8px;cursor:pointer;margin-left:auto">'
      + preview
      + '<input type="file" accept="image/*" id="pe-avatar-input" style="display:none">'
      + '</label></div>';
  }

  var html = '<div class="page-container">' + UI_NavBar(pageTitle, true);
  html += '<div style="padding:8px 0">';

  // 个人基础信息
  html += '<div style="font-size:13px;font-weight:600;color:var(--text-light);padding:12px 20px 6px">个人基础信息 <span style="color:#ee0a24;font-size:11px;font-weight:400">*必填</span></div>';
  html += '<div class="comp-cell-group inset">';
  html += avatarField(d.avatar);
  html += UI_Field('姓名', 'text', '请输入姓名', d.name, true);
  html += genderField(d.gender);
  html += UI_Field('出生年月', 'text', 'YYYY-MM', d.birth, true);
  html += UI_Field('电话', 'tel', '请输入电话', d.phone, true);
  html += UI_Field('邮箱', 'text', '请输入邮箱', d.email, true);
  html += '</div>';

  // 校友认证信息
  html += '<div style="font-size:13px;font-weight:600;color:var(--text-light);padding:12px 20px 6px">校友认证信息 <span style="color:#ee0a24;font-size:11px;font-weight:400">*必填</span></div>';
  html += '<div class="comp-cell-group inset">';
  html += UI_Field('学校', 'text', '请输入学校', d.school, true);
  html += UI_Field('院系', 'text', '请输入院系', d.dept, true);
  html += UI_Field('专业', 'text', '请输入专业', d.major, true);
  html += UI_Field('入学年份', 'text', '例如：2005级', d.year, true);
  html += degreeField(d.degree);
  html += '</div>';

  // 其它信息
  html += '<div style="font-size:13px;font-weight:600;color:var(--text-light);padding:12px 20px 6px">其它信息 <span style="font-size:11px;font-weight:400;color:var(--text-lighter)">（选填）</span></div>';
  html += '<div class="comp-cell-group inset">';
  html += UI_Field('籍贯', 'text', '请输入籍贯', d.hometown);
  html += UI_Field('现住城市', 'text', '请输入现住城市', d.city);
  html += UI_Field('个人标签', 'text', '用逗号分隔', d.tags);
  html += UI_Field('兴趣爱好', 'text', '用逗号分隔，如：篮球,摄影', d.hobbies);
  html += UI_Field('个人简介', 'textarea', '简单介绍一下自己...', d.intro);
  html += '</div>';

  html += '<div style="padding:20px 16px"><span data-action="submit-profile-edit" data-role="' + role + '">' + UI_Button(btnText, 'primary', '', true, true) + '</span></div>';
  html += '</div></div>';
  return html;
};

Views.ProfileMemberEdit = function() {
  var role = AppState.currentRole;
  var isMember = roleRank[role] >= 2;

  // 初始化状态
  if (!uiState.selectedCompanies) uiState.selectedCompanies = [];
  if (!uiState.selectedProducts) uiState.selectedProducts = [];

  // ============================
  // 已是商务会员：展示已维护的商务信息
  // ============================
  if (isMember) {
    // 如果没有已维护的数据，用模拟数据填充（演示用）
    if (uiState.selectedCompanies.length === 0) {
      uiState.selectedCompanies = [
        { logo: img('logo1', 200, 200), name: '北京智控科技有限公司', industry: '人工智能', address: '北京市海淀区中关村软件园', position: '创始人/CEO', joinDate: '2018年6月', intro: '专注于工业智能控制领域，为制造企业提供AI驱动的智能控制解决方案。' },
        { logo: img('logo2', 200, 200), name: '北京康源生物科技有限公司', industry: '生物医药', address: '北京市昌平区生命科学园', position: '联合创始人', joinDate: '2020年3月', intro: '专注于创新药物研发，以肿瘤免疫治疗为核心方向。' }
      ];
    }
    if (uiState.selectedProducts.length === 0) {
      uiState.selectedProducts = [
        { cover: img('prod1', 400, 300), name: '智控工业AI平台', intro: '基于深度学习的工业过程控制和优化平台', features: ['降低能耗15%', '提升产能20%', '实时监控与预警', '兼容主流PLC/DCS系统'], applications: '化工、钢铁、水泥、电力等流程工业领域' },
        { cover: img('prod2', 400, 300), name: '新型抗肿瘤药物K-101', intro: '针对非小细胞肺癌的新型靶向药物', features: ['高选择性靶向', '低毒副作用', '口服给药', '联合用药潜力'], applications: '非小细胞肺癌（NSCLC）二线治疗' }
      ];
    }

    var html = '<div class="page-container" style="background:#f5f6fa">' + UI_NavBar('商务信息', true);

    // 会员状态卡
    html += '<div style="margin:12px 16px;padding:16px;background:linear-gradient(135deg,#fff8e1,#fef3c7);border-radius:14px;border:1px solid #f0d9a3">';
    html += '<div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">';
    html += '<div style="width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#dabb6e,#e8c987);display:flex;align-items:center;justify-content:center">' + iconSVG('award', 18, '#fff') + '</div>';
    html += '<div><div style="font-size:15px;font-weight:700;color:#5c4510">商务会员</div><div style="font-size:11px;color:#9a7a3a">有效期至 2026-12-31</div></div>';
    html += '</div>';
    html += '<div style="font-size:12px;color:#7a5d20;line-height:1.6">您已认证为商务会员，以下为您维护的商务信息。如需修改，请联系平台客服或重新提交审核。</div>';
    html += '</div>';

    // 关联企业
    html += '<div style="margin:0 16px 12px;background:#fff;border-radius:14px;overflow:hidden;box-shadow:0 2px 10px rgba(0,0,0,0.04)">';
    html += '<div style="padding:14px 16px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #f5f5f5">';
    html += '<div style="display:flex;align-items:center;gap:8px">';
    html += '<div style="width:4px;height:16px;background:var(--primary);border-radius:2px"></div>';
    html += '<span style="font-size:15px;font-weight:700;color:#333">关联企业</span>';
    html += '<span style="font-size:12px;color:#999">' + uiState.selectedCompanies.length + ' 家</span>';
    html += '</div>';
    html += '</div>';
    uiState.selectedCompanies.forEach(function(c) {
      html += '<div style="padding:14px 16px;border-bottom:1px solid #fafafa">';
      html += '<div style="display:flex;align-items:center;gap:12px;margin-bottom:10px">';
      html += '<img src="' + c.logo + '" style="width:48px;height:48px;border-radius:10px;flex-shrink:0">';
      html += '<div style="flex:1;min-width:0">';
      html += '<div style="font-size:15px;font-weight:700;color:#222;margin-bottom:4px">' + escapeHtml(c.name) + '</div>';
      html += '<div style="font-size:13px;color:#666">' + escapeHtml(c.position) + (c.joinDate ? ' · ' + escapeHtml(c.joinDate) : '') + '</div>';
      html += '</div></div>';
      html += '<div style="display:flex;flex-wrap:wrap;gap:10px;font-size:12px;color:#999">';
      html += '<span style="display:flex;align-items:center;gap:4px">' + iconSVG('location', 11, '#bbb') + escapeHtml(c.address) + '</span>';
      html += '<span style="display:inline-block;padding:2px 8px;background:#e3f2fd;color:#1976d2;border-radius:4px;font-size:11px">' + escapeHtml(c.industry) + '</span>';
      html += '</div></div>';
    });
    html += '</div>';

    // 关联产品
    html += '<div style="margin:0 16px 12px;background:#fff;border-radius:14px;overflow:hidden;box-shadow:0 2px 10px rgba(0,0,0,0.04)">';
    html += '<div style="padding:14px 16px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #f5f5f5">';
    html += '<div style="display:flex;align-items:center;gap:8px">';
    html += '<div style="width:4px;height:16px;background:#07c160;border-radius:2px"></div>';
    html += '<span style="font-size:15px;font-weight:700;color:#333">关联产品</span>';
    html += '<span style="font-size:12px;color:#999">' + uiState.selectedProducts.length + ' 款</span>';
    html += '</div>';
    html += '</div>';
    uiState.selectedProducts.forEach(function(p) {
      html += '<div style="padding:14px 16px;border-bottom:1px solid #fafafa;display:flex;gap:12px">';
      html += '<img src="' + p.cover + '" style="width:72px;height:54px;border-radius:8px;flex-shrink:0;object-fit:cover">';
      html += '<div style="flex:1;min-width:0">';
      html += '<div style="font-size:14px;font-weight:600;color:#222;margin-bottom:4px">' + escapeHtml(p.name) + '</div>';
      html += '<div style="font-size:12px;color:#888;line-height:1.5;margin-bottom:4px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">' + escapeHtml(p.intro) + '</div>';
      if (p.features && p.features.length) {
        html += '<div style="display:flex;flex-wrap:wrap;gap:4px">';
        p.features.slice(0, 3).forEach(function(f) {
          html += '<span style="padding:1px 6px;background:#e8f5e9;color:#4caf50;border-radius:3px;font-size:10px">' + escapeHtml(f) + '</span>';
        });
        html += '</div>';
      }
      html += '</div></div>';
    });
    html += '</div>';

    html += '</div>';
    return html;
  }

  // ============================
  // 未认证会员：升级表单
  // ============================
  var html = '<div class="page-container">' + UI_NavBar('升级商务会员', true);

  // 顶部说明
  html += '<div style="padding:16px;background:linear-gradient(135deg,#fff8e1,#fff3cd);margin:0;border-bottom:1px solid #f0d9a3">';
  html += '<div style="display:flex;align-items:flex-start;gap:8px">';
  html += '<div style="flex-shrink:0;width:24px;height:24px;border-radius:50%;background:#dabb6e;display:flex;align-items:center;justify-content:center">' + iconSVG('award', 14, '#fff') + '</div>';
  html += '<div>';
  html += '<div style="font-size:14px;font-weight:600;color:#7a5d20;margin-bottom:4px">升级商务会员</div>';
  html += '<div style="font-size:12px;color:#9a7a3a;line-height:1.6">作为认证校友，您只需提交关联的商务信息（关联企业 + 关联产品），即可申请升级为商务会员，享受更多权益。</div>';
  html += '</div></div></div>';

  // 关联企业部分
  html += '<div style="margin-top:12px;background:#fff">';
  html += '<div style="padding:12px 16px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--border)">';
  html += '<div style="font-size:15px;font-weight:600;color:#333">关联企业</div>';
  html += '<button class="comp-btn primary small" data-action="add-company">' + iconSVG('plus', 12, '#fff') + ' 添加企业</button>';
  html += '</div>';

  // 显示已添加的产品
  if (uiState.selectedProducts.length === 0) {
    html += '<div style="padding:40px 20px;text-align:center;color:#999;font-size:13px">';
    html += '<div style="margin-bottom:8px">' + iconSVG('package', 32, '#ddd') + '</div>';
    html += '<div>请添加您关联的产品</div>';
    html += '<div style="font-size:12px;color:#bbb;margin-top:4px">建议关联至少1款产品</div>';
    html += '</div>';
  } else {
    html += '<div style="padding:8px">';
    uiState.selectedProducts.forEach(function(p, idx) {
      html += '<div style="background:#fafafa;border-radius:8px;padding:12px;margin-bottom:8px;display:flex;align-items:center;gap:10px">';
      html += '<img src="' + p.cover + '" style="width:44px;height:44px;border-radius:6px;flex-shrink:0;object-fit:cover">';
      html += '<div style="flex:1;min-width:0">';
      html += '<div style="font-size:14px;font-weight:600;color:#333;margin-bottom:2px">' + escapeHtml(p.name) + '</div>';
      html += '<div style="font-size:12px;color:#999;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' + escapeHtml(p.intro.substring(0, 30)) + (p.intro.length > 30 ? '...' : '') + '</div>';
      html += '</div>';
      html += '<button data-action="remove-product" data-index="' + idx + '" style="background:none;border:none;color:#f56c6c;cursor:pointer;padding:6px">' + iconSVG('close', 16, '#f56c6c') + '</button>';
      html += '</div>';
    });
    html += '</div>';
  }
  html += '</div>';

  // 提交按钮区域
  html += '<div style="padding:20px 16px;margin-top:12px">';
  html += '<button class="comp-btn primary block" data-action="submit-member-upgrade">提交审核</button>';
  html += '<div style="margin-top:10px;font-size:12px;color:#999;text-align:center">提交后将由平台审核，预计1-3个工作日内反馈</div>';
  html += '</div>';

  html += '<div style="height:40px"></div>';
  html += '</div>';
  return html;
};

// ================================================================
// 添加关联企业表单
// ================================================================
Views.AddCompanyForm = function() {
  // 编辑模式：从uiState.editingCompanyIndex获取索引
  var editIndex = uiState.editingCompanyIndex;
  var isEdit = editIndex !== undefined && editIndex !== null;
  var company = isEdit ? (uiState.selectedCompanies[editIndex] || {}) : {};

  var html = '<div class="page-container">' + UI_NavBar(isEdit ? '编辑企业' : '添加关联企业', true);

  html += '<div style="background:#fff;padding:16px">';

  // 企业LOGO上传
  html += '<div style="margin-bottom:20px">';
  html += '<div style="font-size:14px;color:#333;margin-bottom:8px">企业LOGO <span style="color:#f56c6c">*</span></div>';
  html += '<div style="display:flex;align-items:center;gap:12px">';
  html += '<img id="company-logo-preview" src="' + (company.logo || img('default-company', 200, 200)) + '" style="width:60px;height:60px;border-radius:8px;border:1px solid var(--border);object-fit:cover">';
  html += '<button class="comp-btn plain small" data-action="upload-company-logo">选择图片</button>';
  html += '<input type="file" id="company-logo-input" accept="image/*" style="display:none">';
  html += '</div></div>';

  // 企业名称
  html += UI_Field('企业名称', 'text', '请输入企业全称', company.name, true);

  // 所属行业
  html += UI_Field('所属行业', 'text', '如：人工智能、生物医药', company.industry, true);

  // 企业地址
  html += UI_Field('企业地址', 'text', '请输入企业详细地址', company.address, true);

  // 任职信息分组
  html += '<div style="margin:16px 0;padding-top:16px;border-top:1px solid var(--border)">';
  html += '<div style="font-size:14px;font-weight:600;color:#333;margin-bottom:12px">您的任职信息</div>';

  // 职位
  html += UI_Field('职位/职务', 'text', '如：创始人/CEO、CTO、产品总监', company.position, true);

  // 入职时间
  html += UI_Field('入职时间', 'text', '如：2020年6月（可选）', company.joinDate, false);

  html += '</div>';

  // 企业简介
  html += UI_Field('企业简介', 'textarea', '介绍企业的主营业务、发展历程、核心优势等...', company.intro, true);

  html += '</div>';

  // 保存按钮
  html += '<div style="padding:16px">';
  html += '<button class="comp-btn primary block" data-action="save-company">' + (isEdit ? '保存修改' : '添加企业') + '</button>';
  html += '</div>';

  html += '<div style="height:40px"></div>';
  html += '</div>';
  return html;
};

// ================================================================
// 添加关联产品表单
// ================================================================
Views.AddProductForm = function() {
  var editIndex = uiState.editingProductIndex;
  var isEdit = editIndex !== undefined && editIndex !== null;
  var product = isEdit ? (uiState.selectedProducts[editIndex] || {}) : {};

  var html = '<div class="page-container">' + UI_NavBar(isEdit ? '编辑产品' : '添加关联产品', true);

  html += '<div style="background:#fff;padding:16px">';

  // 产品图上传
  html += '<div style="margin-bottom:20px">';
  html += '<div style="font-size:14px;color:#333;margin-bottom:8px">产品图 <span style="color:#f56c6c">*</span></div>';
  html += '<div style="display:flex;align-items:center;gap:12px">';
  html += '<img id="product-cover-preview" src="' + (product.cover || img('default-product', 400, 300)) + '" style="width:80px;height:60px;border-radius:6px;border:1px solid var(--border);object-fit:cover">';
  html += '<button class="comp-btn plain small" data-action="upload-product-cover">选择图片</button>';
  html += '<input type="file" id="product-cover-input" accept="image/*" style="display:none">';
  html += '</div></div>';

  // 产品名称
  html += UI_Field('产品名称', 'text', '请输入产品名称', product.name, true);

  // 产品简介
  html += UI_Field('产品简介', 'textarea', '简要介绍产品的功能和特点...', product.intro, true);

  // 核心功能
  html += UI_Field('核心功能', 'textarea', '列举产品的核心功能，一行一个...', product.features ? product.features.join('\n') : '', true);

  // 应用领域
  html += UI_Field('应用领域', 'text', '如：工业制造、医疗健康、智慧城市', product.applications, true);

  html += '</div>';

  // 保存按钮
  html += '<div style="padding:16px">';
  html += '<button class="comp-btn primary block" data-action="save-product">' + (isEdit ? '保存修改' : '添加产品') + '</button>';
  html += '</div>';

  html += '<div style="height:40px"></div>';
  html += '</div>';
  return html;
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

// ================================================================
// 服务机构列表
// ================================================================
Views.ServiceProviders = function() {
  var html = '<div class="page-container">' + UI_NavBar('服务机构', true);

  // 搜索框
  html += '<div style="padding:8px 16px;background:#fff"><input type="search" placeholder="搜索服务机构" style="width:100%;padding:10px 16px;border:1px solid var(--border);border-radius:20px;font-size:14px"></div>';

  // 分类标签
  var categories = ['全部', '法律服务', '财务咨询', '人力资源', '管理咨询'];
  html += '<div style="display:flex;gap:8px;padding:12px 16px;background:#fff;overflow-x:auto;white-space:nowrap">';
  categories.forEach(function(cat, i) {
    var active = i === 0 ? ' style="background:var(--primary);color:#fff"' : '';
    html += '<span' + active + ' style="padding:6px 14px;border-radius:16px;font-size:13px;background:#f5f7fa;color:var(--text);flex-shrink:0">' + cat + '</span>';
  });
  html += '</div>';

  // 服务机构卡片列表
  html += '<div style="padding:12px">';
  serviceProviders.forEach(function(p) {
    html += '<div class="provider-card" data-action="nav" data-payload="/service-provider/' + p.id + '" style="background:#fff;border-radius:12px;padding:14px;margin-bottom:12px;box-shadow:0 2px 8px rgba(0,0,0,0.06)">';
    html += '<div style="display:flex;align-items:center;gap:12px;margin-bottom:10px">';
    html += '<img src="' + p.avatar + '" style="width:56px;height:56px;border-radius:12px;flex-shrink:0">';
    html += '<div style="flex:1;min-width:0">';
    html += '<div style="font-size:16px;font-weight:600;margin-bottom:4px">' + escapeHtml(p.name) + '</div>';
    html += '<div style="font-size:12px;color:#ff9800">★★★★☆ ' + p.rating + '</div>';
    html += '<div style="display:flex;align-items:center;margin-top:4px">';
    html += '<span style="display:inline-block;padding:2px 8px;background:#e3f2fd;color:#1976d2;border-radius:4px;font-size:11px;margin-right:6px">' + p.category + '</span>';
    html += '<span style="font-size:11px;color:#999">' + p.serviceCount + ' 项服务</span>';
    html += '</div></div>';
    html += iconSVG('arrow-right', 16, '#ccc');
    html += '</div>';
    html += '<div style="font-size:13px;color:var(--text-light);line-height:1.6;margin-bottom:10px">' + p.desc + '</div>';
    html += '<div style="display:flex;align-items:center;justify-content:space-around;padding-top:10px;border-top:1px solid var(--border)">';
    html += '<div style="text-align:center"><div style="font-size:16px;font-weight:600;color:var(--primary)">' + p.consultCount + '</div><div style="font-size:11px;color:var(--text-lighter);margin-top:2px">咨询人次</div></div>';
    html += '<div style="width:1px;height:24px;background:var(--border)"></div>';
    html += '<div style="text-align:center"><div style="font-size:16px;font-weight:600;color:var(--primary)">' + p.serviceCount + '</div><div style="font-size:11px;color:var(--text-lighter);margin-top:2px">服务项目</div></div>';
    html += '</div></div>';
  });
  html += '</div></div>';
  return html;
};

// ================================================================
// 服务机构详情
// ================================================================
Views.ServiceProviderDetail = function() {
  var id = parseInt(Router.params.id);
  var provider = serviceProviders.find(function(p) { return p.id == id; });
  if (!provider) return UI_Error();

  var projects = serviceProjects.filter(function(p) { return p.providerId == id; });

  // 按子分类分组
  var projectsByCategory = {};
  projects.forEach(function(p) {
    if (!projectsByCategory[p.category]) projectsByCategory[p.category] = [];
    projectsByCategory[p.category].push(p);
  });

  // 查找该服务的父分类
  function getParentCategory(subCat) {
    for (var parent in serviceCategoryMap) {
      if (serviceCategoryMap[parent].indexOf(subCat) >= 0) return parent;
    }
    return '其他';
  }

  var html = '<div class="page-container">' + UI_NavBar('服务机构详情', true);

  // 机构头部
  html += '<div style="text-align:center;padding:20px;background:#fff;border-bottom:1px solid var(--border)">';
  html += '<img src="' + provider.avatar + '" style="width:72px;height:72px;border-radius:16px;margin-bottom:12px">';
  html += '<div style="font-size:18px;font-weight:700;margin-bottom:6px">' + escapeHtml(provider.name) + '</div>';
  html += '<span style="display:inline-block;padding:4px 12px;background:#e3f2fd;color:#1976d2;border-radius:12px;font-size:13px">' + escapeHtml(provider.category) + '</span>';
  html += '<div style="display:inline-flex;align-items:center;gap:4px;margin-top:8px;font-size:13px;color:var(--text-light)">';
  html += iconSVG('phone', 14, 'currentColor') + '<span>' + provider.phone + '</span>';
  html += '</div>';
  // 显示该机构提供的服务分类
  var serviceCats = Object.keys(projectsByCategory);
  if (serviceCats.length > 0) {
    html += '<div style="margin-top:10px;display:flex;flex-wrap:wrap;gap:6px;justify-content:center">';
    serviceCats.forEach(function(sub) {
      var parent = getParentCategory(sub);
      html += '<span style="font-size:11px;padding:2px 8px;background:#fff7e8;color:#cc7a00;border-radius:10px">' + escapeHtml(parent) + ' · ' + escapeHtml(sub) + '</span>';
    });
    html += '</div>';
  }
  html += '</div>';

  // 标签页
  html += '<div style="display:flex;background:#fff;border-bottom:1px solid var(--border)">';
  html += '<div style="flex:1;padding:12px;text-align:center;font-size:15px;font-weight:600;color:var(--primary);border-bottom:2px solid var(--primary)">服务项目</div>';
  html += '<div style="flex:1;padding:12px;text-align:center;font-size:15px;color:var(--text-light)">机构简介</div>';
  html += '</div>';

  // 服务项目列表 - 按子分类分组
  if (!projects.length) {
    html += UI_Empty('暂无服务项目');
  } else {
    html += '<div style="padding:12px">';
    Object.keys(projectsByCategory).forEach(function(subCat) {
      var subProjects = projectsByCategory[subCat];
      var parentCat = getParentCategory(subCat);
      // 分组标题
      html += '<div style="padding:8px 4px 12px;display:flex;align-items:center;gap:6px">';
      html += '<div style="width:4px;height:14px;background:#1976d2;border-radius:2px"></div>';
      html += '<span style="font-size:14px;font-weight:600;color:#333">' + escapeHtml(subCat) + '</span>';
      html += '<span style="font-size:11px;color:#999">· ' + escapeHtml(parentCat) + '</span>';
      html += '<span style="font-size:11px;color:#999;margin-left:auto">' + subProjects.length + '项</span>';
      html += '</div>';

      subProjects.forEach(function(proj) {
        html += '<div class="project-card" data-action="nav" data-payload="/service-project/' + proj.id + '" style="background:#fff;border-radius:12px;padding:14px;margin-bottom:12px;box-shadow:0 2px 8px rgba(0,0,0,0.06)">';
        html += '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">';
        html += '<div style="font-size:16px;font-weight:600;flex:1">' + escapeHtml(proj.name) + '</div>';
        html += '<span style="display:inline-block;padding:2px 8px;background:#e8f5e9;color:#4caf50;border-radius:4px;font-size:11px">' + escapeHtml(proj.category) + '</span>';
        html += '</div>';
        html += '<div style="font-size:13px;color:var(--text-light);line-height:1.6;margin-bottom:10px">' + proj.desc + '</div>';
        html += '<div style="display:flex;align-items:center;justify-content:space-between">';
        html += '<div style="display:flex;align-items:baseline;gap:2px">';
        html += '<span style="font-size:20px;font-weight:700;color:var(--primary)">¥' + proj.price.toLocaleString() + '</span>';
        html += '<span style="font-size:12px;color:var(--text-lighter)">/ ' + proj.unit + '</span>';
        html += '</div>';
        html += '<div style="font-size:12px;color:var(--text-lighter)">';
        html += iconSVG('eye', 12, 'currentColor') + ' ' + proj.viewCount + '  ';
        html += iconSVG('bag', 12, 'currentColor') + ' ' + proj.orderCount;
        html += '</div></div>';
        html += '<div style="margin-top:10px"><button class="comp-btn primary small" data-action="nav" data-payload="/service-chat/' + proj.providerId + '/' + proj.id + '" onclick="event.stopPropagation()">' + iconSVG('chat', 14, '#fff') + ' 咨询</button></div>';
        html += '</div>';
      });
    });
    html += '</div>';
  }

  html += '</div>';
  return html;
};
// 临时文件：服务项目详情视图
// 这段代码需要添加到 views.js 的末尾

// ================================================================
// 服务项目详情
// ================================================================
Views.ServiceProjectDetail = function() {
  var id = parseInt(Router.params.id);
  var project = serviceProjects.find(function(p) { return p.id == id; });
  if (!project) return UI_Error();

  var provider = serviceProviders.find(function(p) { return p.id == project.providerId; });

  var html = '<div class="page-container">' + UI_NavBar('服务详情', true);

  // 查找父分类
  var parentCategory = '其他';
  for (var parent in serviceCategoryMap) {
    if (serviceCategoryMap[parent].indexOf(project.category) >= 0) {
      parentCategory = parent;
      break;
    }
  }

  // 项目头部
  html += '<div style="padding:20px;background:#fff;border-bottom:1px solid var(--border)">';
  html += '<div style="font-size:20px;font-weight:700;margin-bottom:8px">' + escapeHtml(project.name) + '</div>';
  // 分类展示：父分类 + 子分类
  html += '<div style="display:flex;flex-wrap:wrap;gap:6px">';
  html += '<span style="display:inline-block;padding:4px 12px;background:#fff7e8;color:#cc7a00;border-radius:12px;font-size:13px">' + escapeHtml(parentCategory) + '</span>';
  html += '<span style="display:inline-block;padding:4px 12px;background:#e8f5e9;color:#4caf50;border-radius:12px;font-size:13px">' + escapeHtml(project.category) + '</span>';
  html += '</div>';

  if (provider) {
    html += '<div data-action="nav" data-payload="/service-provider/' + provider.id + '" style="display:inline-flex;align-items:center;gap:6px;margin-top:12px;padding:6px 12px;background:#f5f7fa;border-radius:20px;font-size:13px">';
    html += '<img src="' + provider.avatar + '" style="width:24px;height:24px;border-radius:50%">';
    html += '<span>' + escapeHtml(provider.name) + '</span>';
    html += iconSVG('arrow-right', 12, 'currentColor');
    html += '</div>';
  }
  html += '</div>';

  // 价格区域
  html += '<div style="padding:16px 20px;background:linear-gradient(135deg,#fef5e7,#fff);border-bottom:1px solid var(--border)">';
  html += '<div style="font-size:13px;color:var(--text-light);margin-bottom:4px">服务费用</div>';
  html += '<div style="display:flex;align-items:baseline;gap:4px">';
  html += '<span style="font-size:28px;font-weight:700;color:#f56c6c">¥' + project.price.toLocaleString() + '</span>';
  html += '<span style="font-size:14px;color:var(--text-lighter)">/ ' + project.unit + '</span>';
  html += '</div></div>';

  // 服务介绍
  html += '<div style="padding:16px 20px;background:#fff;margin-top:12px">';
  html += '<div style="font-size:16px;font-weight:600;margin-bottom:10px">服务介绍</div>';
  html += '<div style="font-size:14px;line-height:1.8;color:var(--text)">' + project.desc + '</div>';
  html += '</div>';

  // 服务详情
  html += '<div style="padding:16px 20px;background:#fff;margin-top:12px">';
  html += '<div style="font-size:16px;font-weight:600;margin-bottom:10px">服务详情</div>';
  html += UI_CellGroup([
    { title: '服务周期', value: '根据实际情况协商' },
    { title: '服务方式', value: '线上 + 线下' },
    { title: '响应时间', value: '24 小时内' }
  ], false);
  html += '</div>';

  // 浏览与订单统计
  html += '<div style="padding:16px 20px;background:#fff;margin-top:12px">';
  html += UI_CellGroup([
    { title: '浏览人次', value: project.viewCount + ' 次' },
    { title: '已购订单', value: project.orderCount + ' 单' }
  ], false);
  html += '</div>';

  // 底部操作栏
  html += '<div style="position:fixed;bottom:0;left:0;right:0;padding:10px 16px;background:#fff;border-top:1px solid var(--border);z-index:10">';
  html += '<button class="comp-btn primary block" data-action="nav" data-payload="/service-chat/' + project.providerId + '/' + project.id + '">' + iconSVG('chat', 16, '#fff') + ' 咨询</button>';
  html += '<div style="margin-top:10px"><button class="comp-btn success block" data-action="order-service" data-project-id="' + project.id + '">' + iconSVG('bag', 16, '#fff') + ' 预约购买</button></div>';
  html += '</div>';

  html += '<div style="height:120px"></div>'; // 底部空白占位
  html += '</div>';
  return html;
};

// ================================================================
// 服务咨询聊天页面 - 与运营后台统一风格
// ================================================================
Views.ServiceChat = function() {
  var providerId = parseInt(Router.params.providerId);
  var projectId = parseInt(Router.params.projectId);

  var provider = serviceProviders.find(function(p) { return p.id == providerId; });
  var project = serviceProjects.find(function(p) { return p.id == projectId; });

  if (!provider || !project) return UI_Error();

  // 获取聊天记录
  var chatKey = providerId + '-' + projectId;
  var messages = serviceChatHistory[chatKey] || [
    { from: 'other', text: '您好，欢迎咨询！请问有什么可以帮到您的？', time: '10:30' },
    { from: 'me', text: '我想咨询「' + project.name + '」这项服务', time: '10:31' },
    { from: 'other', text: '好的，我们会有专人尽快与您联系。请留下您的联系方式。', time: '10:32' }
  ];

  // 如果是新对话，初始化历史记录
  if (!serviceChatHistory[chatKey]) {
    serviceChatHistory[chatKey] = messages;
  }

  var html = '<div class="page-container" style="display:flex;flex-direction:column;height:100vh;padding:0">';

  // 顶部导航栏
  html += UI_NavBar(provider.name, true);

  // 当前咨询服务提示
  html += '<div style="background:#fff;border-bottom:1px solid var(--border);padding:8px 16px;flex-shrink:0">';
  html += '<div style="display:flex;align-items:center;gap:8px;padding:6px 10px;background:#fff7e8;border-left:3px solid #ff976a;border-radius:4px">';
  html += iconSVG('info', 14, '#ff976a');
  html += '<span style="font-size:13px;color:#333">当前咨询：' + escapeHtml(project.name) + '</span>';
  html += '</div></div>';

  // 聊天消息容器
  html += '<div class="chat-container" style="flex:1;overflow-y:auto;padding:12px;background:#f5f7fa;padding-bottom:70px">';

  messages.forEach(function(msg) {
    var isMine = msg.from === 'me';
    html += '<div style="margin-bottom:14px;display:flex;flex-direction:column;' + (isMine ? 'align-items:flex-end' : 'align-items:flex-start') + '">';
    html += '<div style="max-width:70%;padding:10px 14px;border-radius:12px;font-size:14px;line-height:1.5;word-break:break-word;' +
            (isMine
              ? 'background:linear-gradient(135deg,#6fa4cf,#9bc1de);color:#fff;border-bottom-right-radius:4px'
              : 'background:#fff;color:#303133;border-bottom-left-radius:4px') +
            '">' + escapeHtml(msg.text) + '</div>';
    html += '<div style="font-size:11px;color:#c0c4cc;margin-top:4px">' + msg.time + '</div>';
    html += '</div>';
  });

  html += '</div>';

  // 底部输入框 - 提高z-index确保可见
  html += '<div style="position:fixed;bottom:0;left:0;right:0;padding:8px 12px;background:#fff;border-top:1px solid var(--border);z-index:1000">';
  html += '<div style="display:flex;gap:8px;align-items:center">';
  html += '<input type="text" id="chat-input" placeholder="输入消息..." onkeypress="if(event.keyCode==13){document.querySelector(\'[data-action=send-chat-message]\').click();return false;}" style="flex:1;padding:8px 12px;border:1px solid #dcdfe6;border-radius:4px;font-size:14px;outline:none;box-sizing:border-box">';
  html += '<button class="comp-btn primary small" data-action="send-chat-message" data-provider-id="' + providerId + '" data-project-id="' + projectId + '">发送</button>';
  html += '</div></div>';

  html += '</div>';
  return html;
};

const mapping = {
  '%E8%BD%A6%E7%A5%A8%E7%A5%A8': ['vip', 'watch_vip'],
  'Locket': ['Gold', 'com.ttrungisme.bi.premium.yearly']
};

const ua = $request.headers["User-Agent"] || $request.headers["user-agent"];
let obj = JSON.parse($response.body);

obj.subscriber = obj.subscriber || {};
obj.subscriber.entitlements = obj.subscriber.entitlements || {};
obj.subscriber.subscriptions = obj.subscriber.subscriptions || {};

const premiumInfo = {
  is_sandbox: false,
  ownership_type: "PURCHASED",
  billing_issues_detected_at: null,
  period_type: "normal",
  expires_date: "2999-12-18T01:04:17Z",
  original_purchase_date: "2008-03-05T01:04:17Z",
  purchase_date: "2008-03-05T01:04:17Z",
  store: "app_store"
};

const entitlementInfo = {
  grace_period_expires_date: null,
  purchase_date: "2008-03-05T01:04:17Z",
  product_identifier: "com.ttrungisme.bi.premium.yearly",
  expires_date: "2999-12-18T01:04:17Z"
};

const match = Object.keys(mapping).find(e => ua.includes(e));

if (match) {
  let [entKey, subKey] = mapping[match];
  let finalSubKey = subKey || "com.ttrungisme.bi.premium.yearly";
  
  entitlementInfo.product_identifier = finalSubKey;
  obj.subscriber.subscriptions[finalSubKey] = premiumInfo;
  obj.subscriber.entitlements[entKey] = entitlementInfo;
} else {
  obj.subscriber.subscriptions["com.ttrungisme.bi.premium.yearly"] = premiumInfo;
  obj.subscriber.entitlements["Gold"] = entitlementInfo;
  obj.subscriber.entitlements["pro"] = entitlementInfo;
}

obj.Attention = "Chúc mừng bạn! Vui lòng không bán hoặc chia sẻ cho người khác!";

$done({ body: JSON.stringify(obj) });

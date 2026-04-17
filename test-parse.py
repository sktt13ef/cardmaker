import json

# 测试用户提供的 JSON
data = {
    "mainTitle": "图吧工具箱程序简介",
    "cards": [
        {
            "title": "工具定位",
            "desc": "图吧工具箱是开源免费的硬件检测工具合集，面向硬件极客、DIY 爱好者及各类用户。",
            "icon": "memory"
        },
        {
            "title": "专业属性",
            "desc": "专注收集各类硬件检测、评分、测试工具，市面上常见相关工具均有收录。",
            "icon": "analytics"
        },
        {
            "title": "纯净无扰",
            "desc": "无捆绑安装行为，不写入注册表，无敏感操作及诱导欺骗等不良行为。",
            "icon": "security"
        },
        {
            "title": "绿色便捷",
            "desc": " 提供<code>Rar</code>压缩包，解压即可使用，无需安装、注册与卸载操作。",
            "icon": "archive"
        },
        {
            "title": "开放开源",
            "desc": " 群文件可下载源码，提供免费硬件检测<code>SDK</code>，无门槛调用无功能限制。",
            "icon": "code"
        },
        {
            "title": "持续更新",
            "desc": " 始于<strong>2014</strong>年，已持续<strong>12</strong>年稳定更新，坚守初心打造便捷工具。",
            "icon": "history"
        },
        {
            "title": "联系渠道",
            "desc": "可通过验证加交流群，也可发邮件至指定邮箱反馈意见与建议。",
            "icon": "contact_mail"
        }
    ]
}

print(f"主标题: {data['mainTitle']}")
print(f"卡片数量: {len(data['cards'])}")
print("\n卡片内容:")
for i, card in enumerate(data['cards'], 1):
    print(f"\n{i}. {card['title']}")
    print(f"   描述: {card['desc'][:50]}...")
    print(f"   图标: {card['icon']}")

# 检查图标是否有效
valid_icons = ['memory', 'analytics', 'security', 'code', 'history']
print("\n\n图标检查:")
for card in data['cards']:
    icon = card['icon']
    # 简单的图标名格式检查
    import re
    if re.match(r'^[a-z0-9][a-z0-9_\-,\s]{1,150}$', icon):
        print(f"  ✓ {icon} - 格式正确")
    else:
        print(f"  ✗ {icon} - 格式可能有问题")

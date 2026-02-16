#!/bin/bash
# Create Yandex.Metrika goals for ai-native.aimindset.org
# Usage: YM_TOKEN=your_oauth_token bash scripts/create-metrika-goals.sh

COUNTER_ID=106857835
API="https://api-metrika.yandex.net/management/v1/counter/${COUNTER_ID}/goals"

if [ -z "$YM_TOKEN" ]; then
  echo "Error: YM_TOKEN not set"
  echo "Get token: https://oauth.yandex.ru/authorize?response_type=token&client_id=764f4af41256427ba87965a7ed31ea3d"
  echo "Usage: YM_TOKEN=your_token bash scripts/create-metrika-goals.sh"
  exit 1
fi

create_goal() {
  local name="$1"
  local event_id="$2"
  echo -n "Creating goal: ${name}... "

  response=$(curl -s -w "\n%{http_code}" -X POST "$API" \
    -H "Authorization: OAuth ${YM_TOKEN}" \
    -H "Content-Type: application/json" \
    -d "{
      \"goal\": {
        \"name\": \"${name}\",
        \"type\": \"action\",
        \"is_favorite\": 1,
        \"conditions\": [
          {
            \"type\": \"exact\",
            \"url\": \"${event_id}\"
          }
        ]
      }
    }")

  http_code=$(echo "$response" | tail -1)
  body=$(echo "$response" | head -n -1)

  if [ "$http_code" = "200" ]; then
    goal_id=$(echo "$body" | python3 -c "import sys,json; print(json.load(sys.stdin)['goal']['id'])" 2>/dev/null)
    echo "OK (id: ${goal_id})"
  else
    echo "FAIL (${http_code})"
    echo "$body" | python3 -c "import sys,json; d=json.load(sys.stdin); print(f'  {d.get(\"message\",d)}')" 2>/dev/null || echo "  $body"
  fi
}

echo "Creating goals for counter ${COUNTER_ID}..."
echo ""

create_goal "Apply: клик на заявку"        "apply-click"
create_goal "Scroll: 25%"                  "scroll-depth"
create_goal "Секция: программа"            "section-view"
create_goal "Терминал: команда"            "terminal-command"
create_goal "Тема: переключение"           "theme-toggle"
create_goal "Slash-оверлей: открытие"      "slash-overlay-open"

echo ""
echo "Done. Check: https://metrika.yandex.ru/goals?id=${COUNTER_ID}"

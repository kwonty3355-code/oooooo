(function(){"use strict";
const require=(name)=>{if(name==='react/jsx-runtime')return {jsx:(type,props,key)=>React.createElement(type,{...props,...(key===undefined?{}:{key})}),jsxs:(type,props,key)=>React.createElement(type,{...props,...(key===undefined?{}:{key})}),Fragment:React.Fragment};throw Error('Unknown module '+name);};
"use strict";

var _jsxRuntime = require("react/jsx-runtime");
// SOURCE: core.js
const {
  useState,
  useEffect,
  useRef,
  useMemo
} = React;
const THEMES = {
  dark: {
    bg: "#09090B",
    surface: "#18181B",
    surface2: "#27272A",
    border: "rgba(255,255,255,0.07)",
    borderStrong: "rgba(255,255,255,0.1)",
    text: "#FAFAFA",
    muted: "#A1A1AA",
    dim: "#52525B",
    dim2: "#71717A",
    inputBg: "rgba(255,255,255,0.05)",
    headerBg: "rgba(9,9,11,0.88)",
    cardBg: "#18181B",
    tagBg: "rgba(255,255,255,0.06)"
  },
  light: {
    bg: "#FAFAF9",
    surface: "#FFFFFF",
    surface2: "#F4F4F5",
    border: "rgba(0,0,0,0.08)",
    borderStrong: "rgba(0,0,0,0.12)",
    text: "#18181B",
    muted: "#52525B",
    dim: "#A1A1AA",
    dim2: "#71717A",
    inputBg: "rgba(0,0,0,0.03)",
    headerBg: "rgba(250,250,249,0.88)",
    cardBg: "#FFFFFF",
    tagBg: "rgba(0,0,0,0.04)"
  }
};

// 폴더 종류 검색 별칭 (다르게 불러도 찾아지게)
const TYPE_ALIASES = {
  movie: ["무비", "시네마", "극장", "cinema", "film"],
  album: ["음악", "노래", "뮤직", "music", "song", "엘범"],
  anime: ["애니메이션", "만화영화", "animation", "아니메"],
  manga: ["만화책", "코믹스", "comics", "comic"],
  webtoon: ["웹툰", "웹코믹", "네이버웹툰", "카카오웹툰"],
  game: ["게임", "겜", "비디오게임", "game", "콘솔"],
  toku: ["특촬", "특촬물", "가면라이더", "전대", "울트라맨"],
  book: ["독서", "서적", "도서", "북", "book", "읽기", "소설"],
  diary: ["다이어리", "일지", "저널", "diary", "journal", "하루"],
  ledger: ["가계부", "돈", "머니", "money", "용돈", "지출", "수입", "금전"],
  memo: ["메모장", "노트", "note", "글", "텍스트", "끄적임", "기록장", "아이디어"]
};
const STATUS_SETS = {
  none: null,
  game: {
    live: {
      label: "운영중",
      color: "#34D399"
    },
    no_update: {
      label: "업데이트중단",
      color: "#FBBF24"
    },
    closed: {
      label: "서비스종료",
      color: "#F87171"
    }
  },
  serial: {
    ongoing: {
      label: "연재중",
      color: "#34D399"
    },
    hiatus: {
      label: "휴재",
      color: "#FBBF24"
    },
    finished: {
      label: "완결",
      color: "#A78BFA"
    }
  },
  reading: {
    reading: {
      label: "읽는 중",
      color: "#34D399"
    },
    paused: {
      label: "보류",
      color: "#FBBF24"
    },
    done: {
      label: "완독",
      color: "#A78BFA"
    }
  }
};

// album sub-type options
const ALBUM_KINDS = ["정규", "미니", "싱글"];
const FOLDER_TYPES = {
  custom: {
    label: "자유 기록",
    emoji: "🗂️",
    color: "#C084FC",
    statusSet: "none",
    coverRatio: "1/1",
    itemFields: []
  },
  album: {
    label: "앨범",
    emoji: "💿",
    color: "#C084FC",
    statusSet: "none",
    coverRatio: "1/1",
    itemFields: [{
      key: "albumKind",
      label: "앨범 종류",
      type: "select",
      options: ALBUM_KINDS
    }, {
      key: "creator",
      label: "가수",
      placeholder: "가수 이름"
    }, {
      key: "releaseYear",
      label: "발매 연도",
      placeholder: "2024",
      type: "number"
    }, {
      key: "genre",
      label: "장르",
      placeholder: "팝, 힙합, R&B..."
    }]
  },
  movie: {
    label: "영화",
    emoji: "🎬",
    color: "#34D399",
    statusSet: "none",
    coverRatio: "2/3",
    itemFields: [{
      key: "creator",
      label: "감독 / 제작사",
      placeholder: "감독 또는 제작사"
    }, {
      key: "releaseYear",
      label: "개봉 연도",
      placeholder: "2024",
      type: "number"
    }, {
      key: "country",
      label: "국가",
      placeholder: "한국, 미국..."
    }, {
      key: "genre",
      label: "장르",
      placeholder: "액션, 드라마, SF..."
    }]
  },
  anime: {
    label: "애니",
    emoji: "✨",
    color: "#60A5FA",
    statusSet: "none",
    coverRatio: "2/3",
    itemFields: [{
      key: "creator",
      label: "제작사",
      placeholder: "스튜디오 이름"
    }, {
      key: "origAuthor",
      label: "원작 작가",
      placeholder: "원작 작가"
    }, {
      key: "releaseYear",
      label: "방영 연도",
      placeholder: "2024",
      type: "number"
    }, {
      key: "genre",
      label: "장르",
      placeholder: "판타지, 일상, 액션..."
    }]
  },
  manga: {
    label: "만화",
    emoji: "📖",
    color: "#FB923C",
    statusSet: "serial",
    coverRatio: "2/3",
    itemFields: [{
      key: "creator",
      label: "작가",
      placeholder: "작가 이름"
    }, {
      key: "publisher",
      label: "출판사",
      placeholder: "출판사"
    }, {
      key: "releaseYear",
      label: "발매 연도",
      placeholder: "2024",
      type: "number"
    }, {
      key: "latestEp",
      label: "평가 당시 최신화",
      placeholder: "5권 / 42화"
    }, {
      key: "genre",
      label: "장르",
      placeholder: "소년, 로맨스, 스릴러..."
    }]
  },
  webtoon: {
    label: "웹툰",
    emoji: "🖼️",
    color: "#F472B6",
    statusSet: "serial",
    coverRatio: "2/3",
    itemFields: [{
      key: "creator",
      label: "작가",
      placeholder: "작가 이름"
    }, {
      key: "platform",
      label: "플랫폼",
      placeholder: "네이버, 카카오..."
    }, {
      key: "releaseYear",
      label: "연재 연도",
      placeholder: "2024",
      type: "number"
    }, {
      key: "latestEp",
      label: "평가 당시 최신화",
      placeholder: "120화"
    }, {
      key: "genre",
      label: "장르",
      placeholder: "로맨스, 액션, 일상..."
    }]
  },
  game: {
    label: "게임",
    emoji: "🎮",
    color: "#2DD4BF",
    statusSet: "game",
    coverRatio: "2/3",
    itemFields: [{
      key: "creator",
      label: "제작사",
      placeholder: "개발사 이름"
    }, {
      key: "releaseYear",
      label: "출시 연도",
      placeholder: "2024",
      type: "number"
    }, {
      key: "version",
      label: "평가 당시 버전",
      placeholder: "v1.2.0"
    }, {
      key: "genre",
      label: "장르",
      placeholder: "RPG, FPS, 퍼즐..."
    }]
  },
  toku: {
    label: "특촬물",
    emoji: "💥",
    color: "#EF4444",
    statusSet: "serial",
    coverRatio: "2/3",
    itemFields: [{
      key: "creator",
      label: "각본가",
      placeholder: "각본가 이름"
    }, {
      key: "releaseYear",
      label: "방영 연도",
      placeholder: "2024",
      type: "number"
    }, {
      key: "latestEp",
      label: "평가 당시 최신화",
      placeholder: "15화"
    }]
  },
  book: {
    label: "책",
    emoji: "📚",
    color: "#B08968",
    statusSet: "reading",
    coverRatio: "2/3",
    itemFields: [{
      key: "creator",
      label: "저자",
      placeholder: "저자 이름"
    }, {
      key: "releaseYear",
      label: "발행 연도",
      placeholder: "2024",
      type: "number"
    }, {
      key: "genre",
      label: "장르",
      placeholder: "소설, 에세이, 자기계발..."
    }]
  },
  memo: {
    label: "메모",
    emoji: "📝",
    color: "#94A3B8",
    statusSet: "none",
    coverRatio: "1/1",
    isMemo: true,
    itemFields: []
  },
  diary: {
    label: "일기",
    emoji: "📔",
    color: "#E8A23D",
    statusSet: "none",
    coverRatio: "1/1",
    isDiary: true,
    itemFields: []
  },
  ledger: {
    label: "가계부",
    emoji: "💰",
    color: "#5BA873",
    statusSet: "none",
    coverRatio: "1/1",
    isLedger: true,
    itemFields: []
  }
};

// 가계부 카테고리 (지출/수입)
const LEDGER_CATS = {
  expense: [{
    k: "food",
    label: "식비",
    emoji: "🍽️"
  }, {
    k: "transport",
    label: "교통",
    emoji: "🚌"
  }, {
    k: "shopping",
    label: "쇼핑",
    emoji: "🛍️"
  }, {
    k: "culture",
    label: "문화/여가",
    emoji: "🎬"
  }, {
    k: "health",
    label: "건강",
    emoji: "💊"
  }, {
    k: "sub",
    label: "구독/월정액",
    emoji: "🔄"
  }, {
    k: "living",
    label: "생활",
    emoji: "🏠"
  }, {
    k: "etc",
    label: "기타",
    emoji: "📦"
  }],
  income: [{
    k: "allowance",
    label: "용돈",
    emoji: "💵"
  }, {
    k: "salary",
    label: "월급/알바",
    emoji: "💼"
  }, {
    k: "gift",
    label: "선물",
    emoji: "🎁"
  }, {
    k: "etc_in",
    label: "기타",
    emoji: "📥"
  }]
};
// 기본 + 사용자 커스텀 카테고리 합치기
function getCats(type, customCats) {
  const base = LEDGER_CATS[type] || LEDGER_CATS.expense;
  const custom = customCats && customCats[type] || [];
  return [...base, ...custom];
}
function ledgerCat(type, k, customCats) {
  const arr = getCats(type, customCats);
  return arr.find(c => c.k === k) || arr[arr.length - 1];
}
function wonFmt(n) {
  return (n || 0).toLocaleString("ko-KR") + "원";
}
// 고정항목 주기 → 이번 주기의 결제/입금 날짜와 예정 여부 계산
function localDateKey(d = new Date()) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
function cycleOccurrence(cycle, now = new Date()) {
  const y = now.getFullYear(),
    m = now.getMonth(),
    d = now.getDate();
  let occ;
  if (!cycle || cycle.type === 'monthly') occ = new Date(y, m, Math.max(1, Math.min(Number(cycle?.day) || d, new Date(y, m + 1, 0).getDate())));else {
    const weekday = Number(cycle.weekday) || 0;
    occ = new Date(y, m, d - now.getDay() + weekday);
    if (cycle.type === 'biweekly') {
      const anchor = cycle.anchorDate ? new Date(cycle.anchorDate + 'T12:00:00') : new Date(2026, 0, 4, 12);
      const origin = new Date(anchor.getFullYear(), anchor.getMonth(), anchor.getDate() - anchor.getDay() + weekday, 12);
      const weeks = Math.round((new Date(occ.getFullYear(), occ.getMonth(), occ.getDate(), 12) - origin) / 604800000);
      if ((weeks % 2 + 2) % 2 !== 0) occ.setDate(occ.getDate() + 7);
    }
  }
  return {
    date: localDateKey(occ),
    isPlanned: localDateKey(occ) > localDateKey(now)
  };
}
// 색의 밝기 계산 → 어두운 색이면 밝은 글씨, 밝은 색이면 어두운 글씨
function isLightColor(hex) {
  if (!hex || hex[0] !== "#") return true;
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16),
    g = parseInt(h.slice(2, 4), 16),
    b = parseInt(h.slice(4, 6), 16);
  return 0.299 * r + 0.587 * g + 0.114 * b > 140;
}
// 폴더 라벨용: 색이 너무 어두우면 밝게 보정한 색 반환
function commaFmt(v) {
  if (v === "" || v == null) return "";
  const n = String(v).replace(/[^0-9]/g, "");
  return n ? Number(n).toLocaleString("ko-KR") : "";
}
const CAT_EMOJIS = ["🍔", "☕", "🍜", "🛒", "👕", "💄", "🎮", "📚", "🚗", "⛽", "🏥", "🐶", "🎁", "✈️", "🏋️", "🎵", "💡", "📱", "🍺", "🌸"];
function uid() {
  return globalThis.crypto?.randomUUID?.() || Math.random().toString(36).slice(2) + Date.now().toString(36);
}
function getStatusMeta(ft) {
  return STATUS_SETS[FOLDER_TYPES[ft]?.statusSet || "none"];
}
function defaultStatus(ft) {
  const s = getStatusMeta(ft);
  return s ? Object.keys(s)[0] : null;
}
// all status labels across sets (for unified search)
const ALL_STATUS_LABELS = (() => {
  const m = {};
  Object.values(STATUS_SETS).forEach(set => {
    if (set) Object.entries(set).forEach(([k, v]) => {
      m[k] = v.label;
    });
  });
  return m;
})();
function nowStamp() {
  const d = new Date();
  const p = n => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}_${p(d.getHours())}시${p(d.getMinutes())}분`;
}

// ── DIARY: 새벽 4시 기준 "오늘" 계산 ──
// 4시 이전이면 전날로 친다
function diaryDateKey(date = new Date()) {
  const d = new Date(date.getTime());
  if (d.getHours() < 4) d.setDate(d.getDate() - 1);
  const p = n => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}
function fmtDiaryDate(key) {
  if (!key || typeof key !== "string" || !key.includes("-")) return "날짜 없음";
  const [y, m, dd] = key.split("-").map(Number);
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const dt = new Date(y, m - 1, dd);
  if (isNaN(dt.getTime())) return "날짜 없음";
  return `${y}.${String(m).padStart(2, "0")}.${String(dd).padStart(2, "0")} (${days[dt.getDay()]})`;
}
function dayDiff(k1, k2) {
  if (!k1 || !k2 || !k1.includes("-") || !k2.includes("-")) return 0;
  const [a, b, c] = k1.split("-").map(Number);
  const [d, e, f] = k2.split("-").map(Number);
  return Math.round((new Date(d, e - 1, f) - new Date(a, b - 1, c)) / 86400000);
}
// 연속 일수(불) 계산: 당일에 작성한 일기(onTime)만 인정, 2일 연속 비면 0
function calcStreak(entries) {
  const onTime = entries.filter(e => e.onTime !== false); // onTime 미기록(구버전)은 인정
  if (!onTime.length) return 0;
  const keys = [...new Set(onTime.map(e => e.dateKey))].sort();
  const today = diaryDateKey();
  const last = keys[keys.length - 1];
  const gapFromToday = dayDiff(last, today);
  if (gapFromToday >= 2) return 0; // 2일 이상 비었으면 초기화
  let streak = 1;
  for (let i = keys.length - 1; i > 0; i--) {
    const gap = dayDiff(keys[i - 1], keys[i]);
    if (gap === 1) streak++;else if (gap >= 2) break;
  }
  return streak;
}
const MOODS = [{
  e: "😄",
  label: "최고"
}, {
  e: "🙂",
  label: "좋음"
}, {
  e: "😐",
  label: "보통"
}, {
  e: "😔",
  label: "별로"
}, {
  e: "😢",
  label: "힘듦"
}, {
  e: "😡",
  label: "화남"
}, {
  e: "🥰",
  label: "설렘"
}, {
  e: "😴",
  label: "피곤"
}];
const WEATHERS = [{
  e: "☀️",
  label: "맑음"
}, {
  e: "⛅",
  label: "구름"
}, {
  e: "☁️",
  label: "흐림"
}, {
  e: "🌧️",
  label: "비"
}, {
  e: "⛈️",
  label: "뇌우"
}, {
  e: "❄️",
  label: "눈"
}, {
  e: "🌫️",
  label: "안개"
}, {
  e: "🌪️",
  label: "바람"
}];
function blobToDataUrl(b) {
  return new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = e => res(e.target.result);
    r.onerror = () => rej(r.error || Error('사진을 읽지 못했어요'));
    r.onabort = () => rej(Error('사진 읽기가 중단됐어요'));
    r.readAsDataURL(b);
  });
}
const DEFAULT_DATA = {
  schemaVersion: 5,
  templates: [],
  trash: [],
  folders: [{
    id: "all",
    name: "전체 기록",
    folderType: "all",
    color: "#C084FC",
    locked: false,
    pin: null
  }],
  items: []
};

// SOURCE: security.js
function sanitizeHtml(value) {
  const root = document.createElement('div');
  root.innerHTML = String(value || '');
  const tags = new Set(['P', 'BR', 'DIV', 'SPAN', 'STRONG', 'B', 'EM', 'I', 'U', 'S', 'STRIKE', 'BLOCKQUOTE', 'PRE', 'CODE', 'H1', 'H2', 'H3', 'UL', 'OL', 'LI', 'A', 'IMG', 'SUB', 'SUP']);
  root.querySelectorAll('script,style,iframe,object,embed,svg,math,form,input,button,textarea,select,link,meta').forEach(n => n.remove());
  for (const el of [...root.querySelectorAll('*')]) {
    if (!tags.has(el.tagName)) {
      el.replaceWith(...el.childNodes);
      continue;
    }
    const keep = {};
    if (el.tagName === 'A') {
      const href = el.getAttribute('href') || '';
      if (/^(https?:\/\/|mailto:)/i.test(href)) {
        keep.href = href;
        keep.target = '_blank';
        keep.rel = 'noopener noreferrer';
      }
    }
    if (el.tagName === 'IMG') {
      const src = el.getAttribute('src') || '';
      if (/^data:image\/(png|jpeg|gif|webp);base64,/i.test(src) || /^blob:/.test(src)) keep.src = src;
      const gid = el.getAttribute('data-gid');
      if (gid && /^[\w-]{1,120}$/.test(gid)) keep['data-gid'] = gid;
      keep.alt = el.getAttribute('alt') || '첨부 사진';
      keep.loading = 'lazy';
    }
    if (el.tagName === 'UL' && ['true', 'false'].includes(el.getAttribute('data-checked'))) keep['data-checked'] = el.getAttribute('data-checked');
    const cl = [...el.classList].filter(c => /^ql-(align-(center|right|justify)|indent-[1-8]|font-(sans|serif|mono)|syntax)$/.test(c));
    if (cl.length) keep.class = cl.join(' ');
    const styles = [];
    for (const key of ['color', 'background-color', 'font-size', 'text-align']) {
      const v = el.style.getPropertyValue(key);
      if (v && (/^(#[\da-f]{3,8}|rgba?\([\d.,%\s]+\)|[a-z]+)$/i.test(v) && ['color', 'background-color'].includes(key) || key === 'font-size' && /^(13|15|18|22|28)px$/.test(v) || key === 'text-align' && /^(left|right|center|justify)$/.test(v))) styles.push(key + ':' + v);
    }
    for (const a of [...el.attributes]) el.removeAttribute(a.name);
    for (const [k, v] of Object.entries(keep)) el.setAttribute(k, v);
    if (styles.length) el.setAttribute('style', styles.join(';'));
  }
  return root.innerHTML;
}
function plainText(html) {
  const d = document.createElement('div');
  d.innerHTML = sanitizeHtml(html);
  return d.textContent.replace(/\u00a0/g, ' ').trim();
}
function memoTitle(m) {
  return m.title?.trim() || m.notes?.trim().split('\n')[0].slice(0, 60) || '제목 없는 메모';
}
function toggleChecklist(html, index) {
  const root = document.createElement('div');
  root.innerHTML = sanitizeHtml(html);
  const li = root.querySelectorAll('ul[data-checked] > li')[index];
  if (!li) return html;
  const ul = li.parentElement,
    next = ul.cloneNode(false),
    done = ul.cloneNode(false);
  done.setAttribute('data-checked', ul.getAttribute('data-checked') === 'true' ? 'false' : 'true');
  let sibling = li.nextSibling;
  while (sibling) {
    const n = sibling.nextSibling;
    next.append(sibling);
    sibling = n;
  }
  done.append(li);
  ul.after(done);
  if (next.childNodes.length) done.after(next);
  if (!ul.childNodes.length) ul.remove();
  return root.innerHTML;
}

// SOURCE: storage.js
// v5 uses a separate, account-scoped database. Legacy mtr-images/mtr-v7 are never modified.
const SK = 'data',
  SETTINGS_SK = 'settings';
const DEFAULT_SETTINGS = {
  theme: 'dark',
  sortBy: 'newest',
  confirmDelete: true,
  lastBackup: null
};
let _mem = {
    data: null,
    settings: DEFAULT_SETTINGS
  },
  _db = null,
  _dbPromise = null,
  _scope = 'guest',
  _saveQueue = Promise.resolve(),
  _draftQueue = Promise.resolve(),
  _idbBroken = false;
const _urlCache = {};
const storageEvent = (state, message = '') => window.dispatchEvent(new CustomEvent('girok:storage', {
  detail: {
    state,
    message
  }
}));
const scopedKey = key => 'girok-v5:' + _scope + ':' + key;
function openDB() {
  if (_db) return Promise.resolve(_db);
  if (_dbPromise) return _dbPromise;
  _dbPromise = new Promise((resolve, reject) => {
    const r = indexedDB.open('girok-v5-' + _scope, 1);
    r.onupgradeneeded = () => {
      for (const n of ['kv', 'imgs']) if (!r.result.objectStoreNames.contains(n)) r.result.createObjectStore(n);
    };
    r.onsuccess = () => {
      _db = r.result;
      _db.onversionchange = () => {
        _db.close();
        _db = null;
        _dbPromise = null;
      };
      resolve(_db);
    };
    r.onerror = () => {
      _dbPromise = null;
      reject(r.error || Error('저장소를 열 수 없어요'));
    };
    r.onblocked = () => {
      _dbPromise = null;
      reject(Error('다른 창을 닫고 다시 시도해주세요'));
    };
  });
  return _dbPromise;
}
async function readStore(store, key) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, 'readonly'),
      rq = tx.objectStore(store).get(key);
    rq.onsuccess = () => resolve(rq.result ?? null);
    rq.onerror = () => reject(rq.error);
    tx.onabort = () => reject(tx.error || Error('읽기 중단'));
  });
}
async function writeStore(store, key, value) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, 'readwrite');
    value === undefined ? tx.objectStore(store).delete(key) : tx.objectStore(store).put(value, key);
    tx.oncomplete = () => resolve(true);
    tx.onerror = tx.onabort = () => reject(tx.error || Error('저장 실패'));
  });
}
async function kvGet(key) {
  if (_idbBroken) return JSON.parse(localStorage.getItem(scopedKey(key)) || 'null');
  return readStore('kv', key);
}
async function kvPut(key, value) {
  if (_idbBroken) {
    if (value === undefined) localStorage.removeItem(scopedKey(key));else localStorage.setItem(scopedKey(key), JSON.stringify(value));
    return true;
  }
  return writeStore('kv', key, value);
}
async function initStorage(scope = 'guest') {
  await _saveQueue;
  await _draftQueue;
  if (_scope !== scope) {
    if (_db) _db.close();
    _db = null;
    _dbPromise = null;
    for (const k of Object.keys(_urlCache)) delete _urlCache[k];
  }
  _scope = scope;
  _idbBroken = false;
  try {
    await openDB();
  } catch (e) {
    _idbBroken = true;
  }
  let d = await kvGet(SK),
    s = await kvGet(SETTINGS_SK);
  _mem = {
    data: d ? validateData(d) : structuredClone(DEFAULT_DATA),
    settings: {
      ...DEFAULT_SETTINGS,
      ...(s || {})
    }
  };
  return {
    fallback: _idbBroken
  };
}
function loadData() {
  return _mem.data;
}
function loadSettings() {
  return _mem.settings;
}
function saveData(d) {
  _mem.data = d;
  storageEvent('saving');
  const snapshot = structuredClone(d);
  const task = _saveQueue.then(() => kvPut(SK, snapshot));
  _saveQueue = task.catch(() => {});
  return task.then(() => {
    storageEvent('saved');
    return true;
  }, e => {
    storageEvent('error', e.message || '저장 공간을 확인해주세요');
    return false;
  });
}
async function saveSettings(s) {
  _mem.settings = s;
  try {
    await kvPut(SETTINGS_SK, s);
    return true;
  } catch (e) {
    storageEvent('error', e.message);
    return false;
  }
}
async function storageUsage() {
  try {
    return (await navigator.storage?.estimate?.()) || null;
  } catch {
    return null;
  }
}
async function idbPut(id, blob) {
  if (_idbBroken) throw Error('현재 브라우저에서는 사진 저장이 불가능해요');
  await writeStore('imgs', id, blob);
  delete _urlCache[id];
  return true;
}
async function idbGet(id) {
  if (_idbBroken) return null;
  return readStore('imgs', id);
}
async function idbDelete(id) {
  if (_idbBroken) return false;
  await writeStore('imgs', id, undefined);
  delete _urlCache[id];
  return true;
}
async function idbAll() {
  if (_idbBroken) return {};
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('imgs', 'readonly'),
      s = tx.objectStore('imgs'),
      ks = s.getAllKeys(),
      vs = s.getAll();
    tx.oncomplete = () => resolve(Object.fromEntries(ks.result.map((k, i) => [k, vs.result[i]])));
    tx.onerror = tx.onabort = () => reject(tx.error);
  });
}
async function getImgUrl(id) {
  if (!id) return null;
  if (_urlCache[id]) return _urlCache[id];
  try {
    const v = await idbGet(id);
    if (!v) return null;
    return _urlCache[id] = typeof v === 'string' ? v : await blobToDataUrl(v);
  } catch {
    return null;
  }
}
function compressImage(file, maxDim = 1200, quality = .86) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, maxDim / Math.max(img.width, img.height)),
          canvas = document.createElement('canvas');
        canvas.width = Math.max(1, Math.round(img.width * scale));
        canvas.height = Math.max(1, Math.round(img.height * scale));
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = () => reject(Error('이미지를 읽을 수 없어요'));
      img.src = reader.result;
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}
async function restoreBackupAtomic(bundle) {
  const data = validateData(bundle.data || bundle);
  if (bundle.version && !String(bundle.version).startsWith('5')) throw Error('이전 백업은 별도 변환 후 가져와주세요. 원본 파일은 보관해주세요.');
  const imgs = bundle.imgs || {};
  for (const [k, v] of Object.entries(imgs)) if (!k || typeof v !== 'string' || !/^data:image\/(png|jpeg|webp|gif);base64,/.test(v)) throw Error('올바르지 않은 사진이 포함되어 있어요');
  if (_idbBroken && Object.keys(imgs).length) throw Error('이 환경에서는 사진을 복원할 수 없어요');
  const safeSettings = {
    ...DEFAULT_SETTINGS,
    ...bundle.settings
  };
  if (_idbBroken) {
    await kvPut(SETTINGS_SK, safeSettings);
    await kvPut(SK, data);
  } else {
    const db = await openDB();
    await new Promise((resolve, reject) => {
      const tx = db.transaction(['kv', 'imgs'], 'readwrite'),
        kv = tx.objectStore('kv'),
        photos = tx.objectStore('imgs');
      kv.put(_mem.data, 'recovery-before-import');
      kv.put(data, SK);
      kv.put(safeSettings, SETTINGS_SK);
      for (const [k, v] of Object.entries(imgs)) photos.put(v, k);
      tx.oncomplete = resolve;
      tx.onerror = tx.onabort = () => reject(tx.error || Error('복원을 완료하지 못했어요'));
    });
  }
  for (const k of Object.keys(_urlCache)) delete _urlCache[k];
  _mem = {
    data,
    settings: safeSettings
  };
  return data;
}
function validateData(raw) {
  if (!raw || raw.schemaVersion !== 5 || !Array.isArray(raw.folders) || !Array.isArray(raw.items)) throw Error('GIROK 5 백업 파일이 아니에요. 이전 백업은 변환이 필요해요.');
  const d = structuredClone(raw),
    ids = new Set();
  for (const f of d.folders) {
    if (!f || typeof f.id !== 'string' || !f.id || ids.has(f.id) || !FOLDER_TYPES[f.folderType] && f.folderType !== 'all') throw Error('폴더 정보가 올바르지 않아요');
    ids.add(f.id);
    if (typeof f.name !== 'string') throw Error('폴더 이름이 올바르지 않아요');
    if (f.fields && !Array.isArray(f.fields)) throw Error('항목 구성이 올바르지 않아요');
    if (f.fields) {
      const seen = new Set();
      for (const x of f.fields) {
        if (!x || typeof x.id !== 'string' || seen.has(x.id) || typeof x.label !== 'string' || !['text', 'textarea', 'number', 'date', 'select', 'check', 'rating'].includes(x.type)) throw Error('항목 구성이 올바르지 않아요');
        if (x.options && (!Array.isArray(x.options) || x.options.some(o => typeof o !== 'string'))) throw Error('선택지가 올바르지 않아요');
        seen.add(x.id);
      }
    }
    if (f.locked && !/^\d{4}$/.test(f.pin || '')) throw Error('잠금 정보가 올바르지 않아요');
    for (const key of ['accounts', 'fixedExpenses']) if (f[key] && !Array.isArray(f[key])) throw Error('가계부 구성이 올바르지 않아요');
  }
  const itemIds = new Set();
  for (const i of d.items) {
    if (!i || typeof i.id !== 'string' || itemIds.has(i.id)) throw Error('기록 ID가 올바르지 않아요');
    itemIds.add(i.id);
    if (i._kind !== 'ledgerEntry' && !ids.has(i.folderId)) throw Error('기록의 폴더를 찾을 수 없어요');
    if (i._kind === 'ledgerEntry' && (!Number.isFinite(i.amount) || i.amount < 0)) throw Error('거래 금액이 올바르지 않아요');
    for (const key of ['title', 'notes', 'mood', 'dateKey', 'createdAt', 'updatedAt']) if (i[key] != null && typeof i[key] !== 'string') throw Error('기록의 글과 날짜 형식이 올바르지 않아요');
    for (const key of ['activities', 'sessions', 'history']) if (i[key] && !Array.isArray(i[key])) throw Error('기록 목록 형식이 올바르지 않아요');
    if (i._kind === 'moment' && (!i.occurredAt || isNaN(new Date(i.occurredAt)))) throw Error('순간 기록 시간이 올바르지 않아요');
    if (i.html) i.html = sanitizeHtml(i.html);
    if (i.history) i.history = i.history.map(h => ({
      ...h,
      html: sanitizeHtml(h.html)
    }));
    if (i.values && !isPlainObject(i.values)) throw Error('기록 항목 값이 올바르지 않아요');
  }
  for (const i of d.items) if (i._kind === 'ledgerEntry' && !d.items.some(x => x.id === i.ledgerSubId && x._kind === 'ledgerSub')) throw Error('거래의 가계부를 찾을 수 없어요');
  if (!ids.has('all')) d.folders.unshift(structuredClone(DEFAULT_DATA.folders[0]));
  d.templates = Array.isArray(d.templates) ? d.templates : [];
  d.trash = Array.isArray(d.trash) ? d.trash : [];
  for (const t of d.trash) {
    if (!t || typeof t.id !== 'string' || !Array.isArray(t.items) || !Array.isArray(t.folders) || t.items.some(i => !i || typeof i.id !== 'string') || t.folders.some(f => !f || typeof f.id !== 'string') || t.protectedFolders && (!Array.isArray(t.protectedFolders) || t.protectedFolders.some(f => !f || typeof f.id !== 'string'))) throw Error('최근 삭제함 형식이 올바르지 않아요');
  }
  for (const t of d.templates) if (!t || typeof t.id !== 'string' || typeof t.name !== 'string' || !FOLDER_TYPES[t.folderType] || !Array.isArray(t.fields)) throw Error('저장한 템플릿 형식이 올바르지 않아요');
  return d;
}
function isPlainObject(v) {
  return v && typeof v === 'object' && !Array.isArray(v);
}
function downloadJson(value, name) {
  const url = URL.createObjectURL(new Blob([JSON.stringify(value, null, 2)], {
    type: 'application/json'
  }));
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 10000);
}
// Drafts contain image IDs, not inline images, and share the active account's namespace.
async function draftRead(key) {
  let fast = null;
  try {
    fast = JSON.parse(localStorage.getItem(scopedKey('draft:' + key)) || 'null');
  } catch {}
  let db = null;
  try {
    db = await kvGet('draft:' + key);
  } catch {}
  return !db ? fast : !fast ? db : fast.updatedAt > db.updatedAt ? fast : db;
}
function draftWrite(key, value) {
  const scope = _scope,
    copy = structuredClone(value);
  let fast = false;
  try {
    localStorage.setItem(scopedKey('draft:' + key), JSON.stringify(copy));
    fast = true;
  } catch {}
  const job = _draftQueue.then(async () => {
    if (_scope !== scope) return false;
    try {
      await kvPut('draft:' + key, copy);
      return true;
    } catch {
      return fast;
    }
  });
  _draftQueue = job.catch(() => {});
  return job;
}
function draftDelete(key) {
  const scope = _scope;
  try {
    localStorage.removeItem(scopedKey('draft:' + key));
  } catch {}
  const job = _draftQueue.then(async () => {
    if (_scope !== scope) return false;
    try {
      await kvPut('draft:' + key, undefined);
      return true;
    } catch {
      return false;
    }
  });
  _draftQueue = job.catch(() => {});
  return job;
}

// SOURCE: cloud.js
const SUPABASE_URL = 'https://wryxsclqctpfvzjpbllt.supabase.co';
const SUPABASE_KEY = 'sb_publishable_6XEeAkQICbjaoGiAH8GktQ_zyH1SUI5';
let sb = null;
try {
  if (window.supabase) sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
} catch {}
async function cloudPull(userId) {
  if (!sb) throw Error('클라우드 연결을 불러오지 못했어요');
  const {
    data,
    error
  } = await sb.from('girok_data').select('data,images,updated_at').eq('user_id', userId).maybeSingle();
  if (error) throw Error('클라우드를 읽지 못했어요. 기기 기록은 보존됩니다.');
  if (data && data.data?.schemaVersion !== 5) throw Error('클라우드에 이전 버전 기록이 있어요. 백업 변환 전까지 동기화를 멈췄습니다.');
  if (data) validateData(data.data);
  return data;
}
async function cloudPush(userId, data, images, expectedStamp) {
  if (!sb) throw Error('클라우드 연결 실패');
  const stamp = new Date().toISOString(),
    clean = {
      ...data,
      _dirty: false
    };
  delete clean._remoteStamp;
  const row = {
    user_id: userId,
    data: clean,
    images,
    updated_at: stamp
  };
  const query = expectedStamp ? sb.from('girok_data').update(row).eq('user_id', userId).eq('updated_at', expectedStamp) : sb.from('girok_data').insert(row);
  const result = await query.select('updated_at').maybeSingle();
  if (result.error || !result.data) throw Error('동기화가 완료되지 않았어요. 다른 기기 변경 또는 연결 상태를 확인해주세요.');
  return result.data.updated_at;
}

// SOURCE: common.jsx
function Stars({
  value,
  onChange,
  size = 14,
  T
}) {
  const [hov, setHov] = useState(0);
  const shown = hov || value || 0;
  const empty = T ? T.surface2 : "#3F3F46";
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    style: {
      display: "flex",
      gap: 2
    },
    children: [1, 2, 3, 4, 5].map(n => {
      const fill = shown >= n ? 1 : shown >= n - 0.5 ? 0.5 : 0; // 1 full, 0.5 half, 0 empty
      return /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
        style: {
          position: "relative",
          display: "inline-block",
          fontSize: size,
          lineHeight: 1,
          cursor: onChange ? "pointer" : "default",
          width: size,
          height: size
        },
        onMouseLeave: () => onChange && setHov(0),
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          style: {
            position: "absolute",
            inset: 0,
            color: empty
          },
          children: "\u2605"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          style: {
            position: "absolute",
            inset: 0,
            color: "#FBBF24",
            width: fill === 1 ? "100%" : fill === 0.5 ? "50%" : "0%",
            overflow: "hidden"
          },
          children: "\u2605"
        }), onChange && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            onClick: () => onChange(value === n - 0.5 ? 0 : n - 0.5),
            onMouseEnter: () => setHov(n - 0.5),
            style: {
              position: "absolute",
              left: 0,
              top: 0,
              width: "50%",
              height: "100%",
              zIndex: 2
            }
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            onClick: () => onChange(value === n ? 0 : n),
            onMouseEnter: () => setHov(n),
            style: {
              position: "absolute",
              right: 0,
              top: 0,
              width: "50%",
              height: "100%",
              zIndex: 2
            }
          })]
        })]
      }, n);
    })
  });
}
function Cover({
  imgId,
  ratio,
  ft,
  size,
  radius = 10
}) {
  const [url, setUrl] = useState(null);
  useEffect(() => {
    let ok = true;
    getImgUrl(imgId).then(u => {
      if (ok) setUrl(u);
    });
    return () => {
      ok = false;
    };
  }, [imgId]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    style: {
      width: "100%",
      aspectRatio: ratio,
      borderRadius: radius,
      overflow: "hidden",
      background: `${ft.color}12`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      border: `1px solid ${ft.color}22`
    },
    children: url ? /*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
      src: url,
      loading: "lazy",
      decoding: "async",
      alt: "\uAE30\uB85D \uCEE4\uBC84",
      style: {
        width: "100%",
        height: "100%",
        objectFit: "cover"
      }
    }) : /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      style: {
        fontSize: size || 32
      },
      children: ft.emoji
    })
  });
}
function CoverUpload({
  imgId,
  ratio,
  onChange,
  onError,
  T
}) {
  const ref = useRef();
  const [url, setUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    let ok = true;
    getImgUrl(imgId).then(u => {
      if (ok) setUrl(u);
    });
    return () => {
      ok = false;
    };
  }, [imgId]);
  const handle = async e => {
    const f = e.target.files[0];
    if (!f) return;
    setLoading(true);
    try {
      const dataUrl = await compressImage(f);
      const id = uid();
      await idbPut(id, dataUrl);
      _urlCache[id] = dataUrl;
      setUrl(dataUrl);
      onChange(id);
    } catch (err) {
      onError && onError("이미지를 저장할 수 없어요. 공간을 확인해주세요.");
    }
    setLoading(false);
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    onClick: () => !loading && ref.current.click(),
    style: {
      width: "100%",
      aspectRatio: ratio,
      borderRadius: 12,
      overflow: "hidden",
      background: T.inputBg,
      border: `1.5px dashed ${T.borderStrong}`,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    children: [loading ? /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      style: {
        color: T.dim2,
        fontSize: 12
      },
      children: "\uCC98\uB9AC \uC911..."
    }) : url ? /*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
      src: url,
      loading: "lazy",
      decoding: "async",
      alt: "\uAE30\uB85D \uCEE4\uBC84",
      style: {
        width: "100%",
        height: "100%",
        objectFit: "cover"
      }
    }) : /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
        color: T.dim
      },
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        style: {
          fontSize: 28
        },
        children: "\uD83D\uDCF8"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        style: {
          fontSize: 11,
          fontFamily: "'Noto Sans KR',sans-serif"
        },
        children: "\uAC24\uB7EC\uB9AC\uC5D0\uC11C \uC120\uD0DD"
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
      ref: ref,
      type: "file",
      accept: "image/*",
      onChange: handle,
      style: {
        display: "none"
      }
    })]
  });
}
function ColorPicker({
  value,
  onChange,
  T
}) {
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: {
      display: "flex",
      gap: 10,
      alignItems: "center"
    },
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
      type: "color",
      value: value,
      onChange: e => onChange(e.target.value),
      style: {
        width: 54,
        height: 44,
        border: `1px solid ${T.borderStrong}`,
        borderRadius: 10,
        background: "transparent",
        cursor: "pointer",
        padding: 2
      }
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
      value: value,
      onChange: e => {
        let v = e.target.value;
        if (v && !v.startsWith("#")) v = "#" + v;
        onChange(v);
      },
      placeholder: "#C084FC",
      maxLength: 7,
      style: {
        flex: 1,
        background: T.inputBg,
        border: `1px solid ${T.borderStrong}`,
        borderRadius: 10,
        color: T.text,
        padding: "12px 14px",
        fontSize: 14,
        fontFamily: "monospace",
        outline: "none",
        textTransform: "uppercase"
      }
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      style: {
        width: 44,
        height: 44,
        borderRadius: 10,
        background: value,
        border: `1px solid ${T.borderStrong}`
      }
    })]
  });
}
function ItemGridCard({
  item,
  folder,
  folderType,
  onOpen,
  T
}) {
  const base = FOLDER_TYPES[item._displayType || folderType] || FOLDER_TYPES.custom;
  const ft = {
    ...base,
    color: folder?.color || base.color,
    coverRatio: folder?.coverRatio || base.coverRatio
  };
  const creator = folderFields(folder).find(f => /가수|아티스트|감독|저자|제작사/.test(f.label));
  const creatorVal = creator ? formatField(fieldValue(item, creator)) : item.creator || '';
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    role: "button",
    tabIndex: 0,
    onKeyDown: e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onOpen(item);
      }
    },
    onClick: () => onOpen(item),
    className: "gcard",
    style: {
      background: T.cardBg,
      border: `1px solid ${T.border}`,
      borderRadius: 14,
      overflow: "hidden",
      cursor: "pointer",
      display: "flex",
      flexDirection: "column",
      minWidth: 0,
      boxSizing: "border-box"
    },
    children: [folder?.showCover !== false && /*#__PURE__*/(0, _jsxRuntime.jsx)(Cover, {
      imgId: item.coverId,
      ratio: ft.coverRatio,
      ft: ft,
      size: 40,
      radius: 0
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: {
        padding: "10px 11px",
        display: "flex",
        flexDirection: "column",
        gap: 3
      },
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        style: {
          fontFamily: "'Noto Serif KR',serif",
          fontSize: 13.5,
          fontWeight: 700,
          color: T.text,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap"
        },
        children: item.title || "제목 없음"
      }), creatorVal && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        style: {
          fontSize: 11,
          color: T.dim2,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap"
        },
        children: creatorVal
      }), folder?.showRating !== false && item.rating > 0 && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 3,
          marginTop: 1
        },
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          style: {
            color: "#FBBF24",
            fontSize: 12
          },
          children: "\u2605"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          style: {
            fontSize: 11.5,
            color: T.muted,
            fontWeight: 600
          },
          children: item.rating
        })]
      })]
    })]
  });
}
function ItemCard({
  item,
  folder,
  folderType,
  onEdit,
  onDelete,
  onOpen,
  T
}) {
  const base = FOLDER_TYPES[item._displayType || folderType] || FOLDER_TYPES.custom;
  const ft = {
    ...base,
    color: folder?.color || base.color,
    coverRatio: folder?.coverRatio || base.coverRatio
  };
  const sset = getStatusMeta(item._displayType || folderType);
  const s = sset ? sset[item.itemStatus] || Object.values(sset)[0] : null;
  const infoRows = folderFields(folder).map(f => ({
    label: f.label,
    val: formatField(fieldValue(item, f))
  })).filter(r => r.val !== '');
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: {
      background: T.cardBg,
      border: `1px solid ${T.border}`,
      borderRadius: 18,
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      animation: "fadeUp .25s ease both",
      position: "relative",
      minWidth: 0,
      boxSizing: "border-box"
    },
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      style: {
        position: "absolute",
        top: 10,
        right: 10,
        display: "flex",
        gap: 6,
        zIndex: 2
      },
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
        onClick: e => {
          e.stopPropagation();
          onEdit(item);
        },
        style: {
          width: 30,
          height: 30,
          borderRadius: 9,
          border: "none",
          background: "rgba(0,0,0,0.55)",
          color: "#fff",
          fontSize: 13,
          cursor: "pointer",
          backdropFilter: "blur(8px)"
        },
        children: "\u270F\uFE0F"
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      role: "button",
      tabIndex: 0,
      onKeyDown: e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpen?.(item);
        }
      },
      onClick: () => onOpen && onOpen(item),
      style: {
        display: "flex",
        gap: 14,
        padding: "14px",
        cursor: "pointer"
      },
      children: [folder?.showCover !== false && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        style: {
          width: ft.coverRatio === "1/1" ? 100 : 92,
          flexShrink: 0
        },
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(Cover, {
          imgId: item.coverId,
          ratio: ft.coverRatio,
          ft: ft
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        style: {
          flex: 1,
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          gap: 5,
          paddingRight: 28
        },
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: 6,
            flexWrap: "wrap"
          },
          children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
            style: {
              background: `${ft.color}18`,
              color: ft.color,
              border: `1px solid ${ft.color}33`,
              borderRadius: 6,
              padding: "1px 7px",
              fontSize: 10,
              fontWeight: 600
            },
            children: [ft.emoji, " ", ft.label, item.albumKind ? ` · ${item.albumKind}` : ""]
          }), s && /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            style: {
              background: `${s.color}15`,
              color: s.color,
              borderRadius: 6,
              padding: "1px 7px",
              fontSize: 10,
              fontWeight: 600
            },
            children: s.label
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          style: {
            fontFamily: "'Noto Serif KR',serif",
            fontSize: 16,
            fontWeight: 700,
            lineHeight: 1.25,
            color: T.text,
            wordBreak: "keep-all"
          },
          children: item.title
        }), folder?.showRating !== false && /*#__PURE__*/(0, _jsxRuntime.jsx)(Stars, {
          value: item.rating,
          size: 14,
          T: T
        }), infoRows.map((r, i) => /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          style: {
            fontSize: 12,
            color: T.muted
          },
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            style: {
              color: T.dim
            },
            children: r.label
          }), " \xB7 ", r.val]
        }, i))]
      })]
    }), (item.oneLiner || item.notes) && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      role: "button",
      tabIndex: 0,
      onKeyDown: e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpen?.(item);
        }
      },
      onClick: () => onOpen && onOpen(item),
      style: {
        borderTop: `1px solid ${T.border}`,
        padding: "12px 14px",
        display: "flex",
        flexDirection: "column",
        gap: 8,
        cursor: "pointer"
      },
      children: [item.oneLiner && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        style: {
          display: "flex",
          gap: 8,
          alignItems: "flex-start"
        },
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          style: {
            color: ft.color,
            fontSize: 13,
            flexShrink: 0,
            marginTop: 1
          },
          children: "\u275D"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          style: {
            fontSize: 13,
            fontWeight: 600,
            color: T.text,
            lineHeight: 1.5,
            fontStyle: "italic"
          },
          children: item.oneLiner
        })]
      }), item.notes && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        style: {
          fontSize: 12,
          color: T.dim2,
          lineHeight: 1.6,
          overflow: "hidden",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical"
        },
        children: item.notes
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        style: {
          fontSize: 11,
          color: ft.color,
          fontWeight: 600
        },
        children: "\uD0ED\uD558\uC5EC \uC804\uCCB4 \uBCF4\uAE30 \u2192"
      })]
    })]
  });
}
function DetailView({
  item,
  folder,
  folderType,
  onClose,
  onEdit,
  onSave,
  wide,
  T
}) {
  const base = FOLDER_TYPES[item._displayType || folderType] || FOLDER_TYPES.custom;
  const ft = {
    ...base,
    color: folder?.color || base.color,
    coverRatio: folder?.coverRatio || base.coverRatio
  };
  const sset = getStatusMeta(item._displayType || folderType);
  const s = sset ? sset[item.itemStatus] || Object.values(sset)[0] : null;
  const infoRows = folderFields(folder).map(f => ({
    label: f.label,
    val: formatField(fieldValue(item, f))
  })).filter(r => r.val !== '');
  const maxW = wide ? 780 : 480;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: {
      position: "fixed",
      inset: 0,
      background: T.bg,
      zIndex: 400,
      overflowY: "auto",
      animation: "fadeIn .2s ease",
      maxWidth: maxW,
      margin: "0 auto"
    },
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      style: {
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        maxWidth: maxW,
        margin: "0 auto",
        background: `radial-gradient(circle 600px at 50% 8%, ${ft.color}33, ${ft.color}10 45%, transparent 70%)`
      }
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: {
        position: "sticky",
        top: 0,
        zIndex: 10,
        background: T.headerBg,
        backdropFilter: "blur(20px)",
        padding: "calc(env(safe-area-inset-top, 0px) + 14px) 20px 14px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: `1px solid ${T.border}`
      },
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
        onClick: onClose,
        style: {
          background: T.inputBg,
          border: `1px solid ${T.border}`,
          borderRadius: 10,
          color: T.muted,
          padding: "8px 14px",
          fontSize: 14,
          cursor: "pointer"
        },
        children: "\u2190 \uB2EB\uAE30"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
        onClick: () => onEdit(item),
        style: {
          background: T.inputBg,
          border: `1px solid ${T.border}`,
          borderRadius: 10,
          color: T.muted,
          padding: "8px 14px",
          fontSize: 14,
          cursor: "pointer",
          fontWeight: 600
        },
        children: "\u270F\uFE0F \uC218\uC815"
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: {
        padding: wide ? "40px 40px 80px" : "24px 20px 60px",
        position: "relative",
        zIndex: 1,
        display: "flex",
        flexDirection: "column",
        gap: wide ? 24 : 18
      },
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        style: {
          display: wide ? "flex" : "block",
          gap: 36,
          alignItems: "flex-start"
        },
        children: [folder?.showCover !== false && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          style: {
            width: wide ? ft.coverRatio === "1/1" ? 320 : 300 : ft.coverRatio === "1/1" ? "70%" : "55%",
            flexShrink: 0,
            margin: wide ? 0 : "0 auto",
            boxShadow: `0 12px 40px ${ft.color}22`,
            borderRadius: 16
          },
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(Cover, {
            imgId: item.coverId,
            ratio: ft.coverRatio,
            ft: ft,
            size: wide ? 96 : 64,
            radius: 16
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          style: {
            flex: 1,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            gap: wide ? 18 : 18,
            marginTop: wide ? 0 : 18
          },
          children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            style: {
              display: "flex",
              gap: 8,
              justifyContent: wide ? "flex-start" : "center",
              flexWrap: "wrap"
            },
            children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
              style: {
                background: `${ft.color}18`,
                color: ft.color,
                border: `1px solid ${ft.color}33`,
                borderRadius: 8,
                padding: "4px 12px",
                fontSize: 12,
                fontWeight: 600
              },
              children: [ft.emoji, " ", ft.label]
            }), s && /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
              style: {
                background: `${s.color}15`,
                color: s.color,
                borderRadius: 8,
                padding: "4px 12px",
                fontSize: 12,
                fontWeight: 600
              },
              children: s.label
            })]
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            style: {
              textAlign: wide ? "left" : "center"
            },
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
              style: {
                fontFamily: "'Noto Serif KR',serif",
                fontSize: wide ? 34 : 24,
                fontWeight: 700,
                lineHeight: 1.3,
                color: T.text,
                wordBreak: "keep-all",
                marginBottom: 12
              },
              children: item.title
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
              style: {
                display: "flex",
                justifyContent: wide ? "flex-start" : "center"
              },
              children: folder?.showRating !== false && /*#__PURE__*/(0, _jsxRuntime.jsx)(Stars, {
                value: item.rating,
                size: wide ? 28 : 22,
                T: T
              })
            })]
          }), infoRows.length > 0 && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            style: {
              background: T.cardBg,
              borderRadius: 16,
              border: `1px solid ${T.border}`,
              padding: "4px 16px"
            },
            children: infoRows.map((r, i) => /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
              style: {
                display: "flex",
                justifyContent: "space-between",
                padding: "13px 0",
                borderBottom: i < infoRows.length - 1 ? `1px solid ${T.border}` : "none"
              },
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
                style: {
                  fontSize: 13.5,
                  color: T.dim2
                },
                children: r.label
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
                style: {
                  fontSize: 13.5,
                  color: T.text,
                  fontWeight: 600
                },
                children: r.val
              })]
            }, i))
          })]
        })]
      }), item.oneLiner && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        style: {
          background: `${ft.color}10`,
          borderRadius: 16,
          border: `1px solid ${ft.color}22`,
          padding: wide ? "20px 24px" : "16px 18px",
          display: "flex",
          gap: 12,
          alignItems: "flex-start"
        },
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          style: {
            color: ft.color,
            fontSize: wide ? 26 : 20,
            flexShrink: 0
          },
          children: "\u275D"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          style: {
            fontSize: wide ? 18 : 15,
            fontWeight: 600,
            color: T.text,
            lineHeight: 1.6,
            fontStyle: "italic"
          },
          children: item.oneLiner
        })]
      }), item.notes && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        style: {
          background: T.cardBg,
          borderRadius: 16,
          border: `1px solid ${T.border}`,
          padding: wide ? "28px 32px" : "18px"
        },
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          style: {
            fontSize: 11,
            fontWeight: 700,
            color: T.dim,
            letterSpacing: "0.08em",
            marginBottom: 12
          },
          children: "\uAC10\uC0C1"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          style: {
            fontSize: wide ? 17 : 14,
            color: T.text,
            lineHeight: 1.9,
            whiteSpace: "pre-wrap"
          },
          children: item.notes
        })]
      }), (item._displayType || folderType) === 'album' && /*#__PURE__*/(0, _jsxRuntime.jsx)(AlbumSessions, {
        item: item,
        onSave: onSave,
        T: T
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        style: {
          textAlign: "center",
          fontSize: 11,
          color: T.dim,
          fontFamily: "monospace"
        },
        children: [new Date(item.createdAt).toLocaleDateString("ko-KR"), " \uAE30\uB85D"]
      })]
    })]
  });
}
function ConfirmDialog({
  title,
  message,
  confirmText = "삭제",
  danger = true,
  onConfirm,
  onCancel,
  T
}) {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    style: {
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.8)",
      zIndex: 600,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backdropFilter: "blur(8px)",
      padding: 24
    },
    onClick: e => e.target === e.currentTarget && onCancel(),
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: {
        background: T.surface,
        border: `1px solid ${T.borderStrong}`,
        borderRadius: 20,
        padding: "24px 22px",
        width: "100%",
        maxWidth: 320,
        display: "flex",
        flexDirection: "column",
        gap: 16,
        animation: "fadeUp .2s ease both"
      },
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        style: {
          fontFamily: "'Noto Serif KR',serif",
          fontSize: 17,
          fontWeight: 700,
          color: T.text
        },
        children: title
      }), message && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        style: {
          fontSize: 13,
          color: T.dim2,
          lineHeight: 1.6,
          whiteSpace: "pre-wrap"
        },
        children: message
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        style: {
          display: "flex",
          gap: 10,
          marginTop: 4
        },
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
          onClick: onCancel,
          style: {
            flex: 1,
            padding: "12px",
            borderRadius: 12,
            border: `1px solid ${T.border}`,
            background: T.inputBg,
            color: T.text,
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer"
          },
          children: "\uCDE8\uC18C"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
          onClick: onConfirm,
          style: {
            flex: 1,
            padding: "12px",
            borderRadius: 12,
            border: "none",
            background: danger ? "#DC2626" : "#7C3AED",
            color: "#fff",
            fontSize: 14,
            fontWeight: 700,
            cursor: "pointer"
          },
          children: confirmText
        })]
      })]
    })
  });
}
function PinModal({
  onConfirm,
  onCancel,
  mode = "enter",
  title = "PIN 입력",
  T
}) {
  const [pin, setPin] = useState("");
  const [confirm, setConfirm] = useState("");
  const [step, setStep] = useState(1);
  const [err, setErr] = useState("");
  const handleKey = v => {
    setErr("");
    if (mode === "set") {
      if (step === 1) {
        const n = pin + v;
        if (n.length <= 4) {
          setPin(n);
          if (n.length === 4) setStep(2);
        }
      } else {
        const n = confirm + v;
        if (n.length <= 4) {
          setConfirm(n);
          if (n.length === 4) {
            if (n === pin) onConfirm(n);else {
              setErr("일치하지 않아요");
              setConfirm("");
              setStep(1);
              setPin("");
            }
          }
        }
      }
    } else {
      const n = pin + v;
      if (n.length <= 4) {
        setPin(n);
        if (n.length === 4) {
          const ok = onConfirm(n);
          if (ok === false) {
            setPin("");
            setErr("PIN을 다시 입력해주세요");
          }
        }
      }
    }
  };
  const del = () => {
    if (mode === "set" && step === 2) setConfirm(c => c.slice(0, -1));else setPin(p => p.slice(0, -1));
  };
  const display = mode === "set" && step === 2 ? confirm : pin;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    style: {
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.85)",
      zIndex: 700,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backdropFilter: "blur(8px)"
    },
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: {
        background: T.surface,
        border: `1px solid ${T.borderStrong}`,
        borderRadius: 24,
        padding: "32px 28px",
        width: 300,
        display: "flex",
        flexDirection: "column",
        gap: 18,
        alignItems: "center"
      },
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        style: {
          fontSize: 32
        },
        children: "\uD83D\uDD12"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        style: {
          fontFamily: "'Noto Serif KR',serif",
          fontSize: 16,
          fontWeight: 700,
          color: T.text
        },
        children: title
      }), mode === "set" && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        style: {
          fontSize: 12,
          color: T.dim2
        },
        children: step === 1 ? "PIN 4자리 입력" : "한 번 더 입력"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        style: {
          display: "flex",
          gap: 12
        },
        children: [0, 1, 2, 3].map(i => /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          style: {
            width: 14,
            height: 14,
            borderRadius: "50%",
            background: i < display.length ? "#C084FC" : T.surface2,
            border: "2px solid " + (i < display.length ? "#C084FC" : T.dim)
          }
        }, i))
      }), err && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        style: {
          fontSize: 12,
          color: "#F87171"
        },
        children: err
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        style: {
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: 10,
          width: "100%"
        },
        children: [1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0, "⌫"].map((k, i) => /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
          onClick: () => k === "⌫" ? del() : k !== "" ? handleKey(String(k)) : null,
          style: {
            padding: "14px 0",
            borderRadius: 12,
            border: `1px solid ${T.border}`,
            background: k === "⌫" ? "rgba(248,113,113,0.12)" : T.inputBg,
            color: k === "" ? "transparent" : k === "⌫" ? "#F87171" : T.text,
            fontSize: k === "⌫" ? 16 : 20,
            fontWeight: 600,
            cursor: k === "" ? "default" : "pointer"
          },
          children: k
        }, i))
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
        onClick: onCancel,
        style: {
          background: "none",
          border: "none",
          color: T.dim2,
          fontSize: 13,
          cursor: "pointer"
        },
        children: "\uCDE8\uC18C"
      })]
    })
  });
}
function DiaryThumb({
  coverId,
  mood,
  size = 44
}) {
  const [url, setUrl] = useState(null);
  useEffect(() => {
    let ok = true;
    if (coverId) getImgUrl(coverId).then(u => {
      if (ok) setUrl(u);
    });else setUrl(null);
    return () => {
      ok = false;
    };
  }, [coverId]);
  if (url) return /*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
    src: url,
    style: {
      width: size,
      height: size,
      borderRadius: 10,
      objectFit: "cover",
      flexShrink: 0,
      border: "1px solid rgba(232,162,61,0.35)"
    }
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    style: {
      fontSize: size * 0.68,
      flexShrink: 0,
      width: size,
      textAlign: "center"
    },
    children: mood ? mood.e : "📝"
  });
}
function FolderCard({
  folder,
  itemCount,
  streak,
  onClick,
  onPin,
  onEdit,
  T
}) {
  const isAll = folder.folderType === "all";
  const ft = isAll ? {
    label: "전체",
    emoji: "📚",
    color: folder.color
  } : FOLDER_TYPES[folder.folderType] || FOLDER_TYPES.movie;
  const isDiary = folder.folderType === "diary";
  const [menu, setMenu] = useState(false);
  const hasMenu = onPin || onEdit;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    role: "button",
    tabIndex: 0,
    onKeyDown: e => {
      if (e.target === e.currentTarget && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        onClick();
      }
    },
    onClick: onClick,
    className: "gcard",
    style: {
      background: folder.pinned ? `linear-gradient(160deg, ${folder.color}0d, ${T.cardBg} 60%)` : T.cardBg,
      border: `1px solid ${folder.pinned ? folder.color + "66" : folder.color + "2a"}`,
      borderRadius: 18,
      padding: "18px 16px",
      cursor: "pointer",
      position: "relative",
      zIndex: menu ? 40 : 1,
      transform: menu ? "translateY(-3px)" : "none",
      boxShadow: menu ? `0 10px 30px ${folder.color}30` : folder.pinned ? `0 2px 12px ${folder.color}18` : "none",
      display: "flex",
      flexDirection: "column",
      gap: 12,
      minWidth: 0,
      boxSizing: "border-box"
    },
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: {
        position: "absolute",
        top: 12,
        right: 12,
        display: "flex",
        gap: 6,
        alignItems: "center"
      },
      children: [folder.pinned && /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        style: {
          width: 7,
          height: 7,
          borderRadius: "50%",
          background: folder.color,
          flexShrink: 0,
          boxShadow: `0 0 6px ${folder.color}99`
        }
      }), folder.locked && /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        style: {
          fontSize: 11,
          background: "rgba(251,191,36,0.15)",
          border: "1px solid #FBBF2433",
          borderRadius: 6,
          padding: "2px 6px",
          color: "#FBBF24"
        },
        children: "\uD83D\uDD12"
      }), hasMenu && /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
        onClick: e => {
          e.stopPropagation();
          setMenu(m => !m);
        },
        style: {
          width: 26,
          height: 26,
          borderRadius: 8,
          border: "none",
          background: menu ? `${folder.color}22` : "transparent",
          color: T.muted,
          fontSize: 16,
          cursor: "pointer",
          lineHeight: 1,
          padding: 0
        },
        children: "\u22EF"
      })]
    }), menu && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        onClick: e => {
          e.stopPropagation();
          setMenu(false);
        },
        style: {
          position: "fixed",
          inset: 0,
          zIndex: 30
        }
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        style: {
          position: "absolute",
          top: 42,
          right: 12,
          zIndex: 50,
          background: T.surface,
          border: `1px solid ${T.borderStrong}`,
          borderRadius: 12,
          padding: 6,
          boxShadow: "0 8px 28px rgba(0,0,0,0.4)",
          minWidth: 140,
          display: "flex",
          flexDirection: "column",
          gap: 2
        },
        children: [onPin && /*#__PURE__*/(0, _jsxRuntime.jsxs)("button", {
          onClick: e => {
            e.stopPropagation();
            setMenu(false);
            onPin();
          },
          style: {
            display: "flex",
            alignItems: "center",
            gap: 9,
            background: "transparent",
            border: "none",
            color: T.text,
            padding: "10px 12px",
            fontSize: 13.5,
            fontWeight: 600,
            cursor: "pointer",
            borderRadius: 8,
            textAlign: "left"
          },
          children: ["\uD83D\uDCCC ", folder.pinned ? "고정 해제" : "위로 고정"]
        }), onEdit && /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
          onClick: e => {
            e.stopPropagation();
            setMenu(false);
            onEdit();
          },
          style: {
            display: "flex",
            alignItems: "center",
            gap: 9,
            background: "transparent",
            border: "none",
            color: T.text,
            padding: "10px 12px",
            fontSize: 13.5,
            fontWeight: 600,
            cursor: "pointer",
            borderRadius: 8,
            textAlign: "left"
          },
          children: "\u270F\uFE0F \uD3F4\uB354 \uC218\uC815"
        })]
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10
      },
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        style: {
          width: 44,
          height: 44,
          borderRadius: 12,
          background: `${folder.color}18`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 22,
          border: `1px solid ${folder.color}30`,
          flexShrink: 0
        },
        children: ft.emoji
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        style: {
          minWidth: 0,
          flex: 1
        },
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          style: {
            fontFamily: "'Noto Serif KR',serif",
            fontSize: 15,
            fontWeight: 700,
            color: T.text,
            paddingRight: hasMenu ? 26 : 0,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap"
          },
          children: [folder.name, isDiary && streak >= 7 && /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            style: {
              marginLeft: 5
            },
            children: "\uD83D\uDD25"
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          style: {
            fontSize: 11,
            color: isLightColor(folder.color) ? folder.color : T.dim2,
            fontWeight: 600,
            marginTop: 2
          },
          children: [ft.label, " \xB7 ", itemCount, isDiary ? "일" : "개"]
        })]
      })]
    })]
  });
}

// ── DIARY COMPONENTS ──

// SOURCE: templates.jsx
const FIELD_TYPES = [['text', '짧은 글'], ['textarea', '긴 글'], ['number', '숫자'], ['date', '날짜'], ['select', '선택'], ['check', '체크'], ['rating', '별점']];
function templateFields(type) {
  return (FOLDER_TYPES[type]?.itemFields || []).map(f => ({
    id: uid(),
    label: f.label,
    type: f.type || 'text',
    options: f.options || [],
    legacyKey: f.key
  }));
}
function folderFields(folder) {
  return (folder?.fields || []).filter(f => !f.hidden);
}
function fieldValue(item, field) {
  return item.values?.[field.id] ?? (field.legacyKey ? item[field.legacyKey] : undefined) ?? '';
}
function formatField(v) {
  return typeof v === 'boolean' ? v ? '완료' : '미완료' : String(v ?? '');
}
function fieldSuggestions(items, folder, field, query = '') {
  const count = new Map();
  for (const item of items) {
    if (item.folderId !== folder?.id) continue;
    const value = fieldValue(item, field);
    if (typeof value === 'string' && value.trim()) count.set(value.trim(), (count.get(value.trim()) || 0) + 1);
  }
  const q = query.trim().toLocaleLowerCase();
  return [...count].filter(([v]) => v.toLocaleLowerCase().includes(q) && v !== query).sort((a, b) => b[1] - a[1]).slice(0, 6).map(([v]) => v);
}
function Sheet({
  title,
  onClose,
  T,
  children,
  wide = false
}) {
  const ref = useRef(null);
  useKeyboardInset(ref);
  useEffect(() => {
    const previous = document.activeElement;
    const key = e => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        onClose();
      }
      if (e.key === 'Tab') {
        const a = [...ref.current.querySelectorAll('button,input,textarea,select,[tabindex="0"]')].filter(n => !n.disabled && n.getClientRects().length);
        if (!a.length) return;
        if (e.shiftKey && document.activeElement === a[0]) {
          e.preventDefault();
          a.at(-1).focus();
        } else if (!e.shiftKey && document.activeElement === a.at(-1)) {
          e.preventDefault();
          a[0].focus();
        }
      }
    };
    ref.current?.addEventListener('keydown', key);
    const el = ref.current;
    return () => {
      el?.removeEventListener('keydown', key);
      previous?.focus?.();
    };
  }, [onClose]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: "sheet-backdrop",
    onClick: e => e.target === e.currentTarget && onClose(),
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("section", {
      ref: ref,
      className: 'g-sheet' + (wide ? ' wide' : ''),
      role: "dialog",
      "aria-modal": "true",
      "aria-label": title,
      style: {
        background: T.surface,
        color: T.text
      },
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("header", {
        className: "g-sheet-head",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("h2", {
          children: title
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
          className: "quiet",
          "aria-label": "\uB2EB\uAE30",
          onClick: onClose,
          children: "\u2715"
        })]
      }), children]
    })
  });
}
function FieldInput({
  field,
  value,
  onChange,
  suggestions = [],
  T
}) {
  const id = 'field-' + field.id;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("label", {
    className: "field",
    htmlFor: id,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      children: field.label || '이름 없는 항목'
    }), field.type === 'textarea' ? /*#__PURE__*/(0, _jsxRuntime.jsx)("textarea", {
      id: id,
      value: value || '',
      onChange: e => onChange(e.target.value),
      rows: 5
    }) : field.type === 'check' ? /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
      id: id,
      type: "checkbox",
      checked: !!value,
      onChange: e => onChange(e.target.checked)
    }) : field.type === 'rating' ? /*#__PURE__*/(0, _jsxRuntime.jsx)(Stars, {
      T: T,
      value: Number(value) || 0,
      onChange: onChange,
      size: 28
    }) : field.type === 'select' ? /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
        id: id,
        list: id + '-list',
        value: value || '',
        onChange: e => onChange(e.target.value),
        placeholder: "\uC120\uD0DD\uD558\uAC70\uB098 \uC9C1\uC811 \uC785\uB825"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("datalist", {
        id: id + '-list',
        children: (field.options || []).map(v => /*#__PURE__*/(0, _jsxRuntime.jsx)("option", {
          value: v
        }, v))
      })]
    }) : /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
      id: id,
      type: field.type === 'date' ? 'date' : field.type === 'number' ? 'number' : 'text',
      value: value ?? '',
      onChange: e => onChange(e.target.value),
      autoComplete: "off"
    }), field.type === 'text' && suggestions.length > 0 && /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      className: "suggestions",
      children: suggestions.map(s => /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
        type: "button",
        onMouseDown: e => e.preventDefault(),
        onClick: () => onChange(s),
        children: s
      }, s))
    })]
  });
}
function FolderModal({
  folder,
  onSave,
  onDelete,
  onClose,
  T,
  templates = [],
  onSaveTemplate
}) {
  const [busy, setBusy] = useState(false),
    [name, setName] = useState(folder?.name || ''),
    [type, setType] = useState(folder?.folderType || 'custom'),
    [color, setColor] = useState(folder?.color || '#C084FC');
  const [fields, setFields] = useState(structuredClone(folder?.fields || [])),
    [locked, setLocked] = useState(!!folder?.locked),
    [pin, setPin] = useState(''),
    [pin2, setPin2] = useState(''),
    [err, setErr] = useState(''),
    [showRec, setShowRec] = useState(false),
    [view, setView] = useState('edit');
  const [cover, setCover] = useState(folder?.showCover ?? true),
    [rating, setRating] = useState(folder?.showRating ?? false),
    [ratio, setRatio] = useState(folder?.coverRatio || '1/1');
  const apply = preset => {
    if (fields.length && !window.confirm('현재 항목 구성을 선택한 템플릿으로 바꿀까요?')) return;
    setFields((preset.fields || templateFields(preset.folderType)).map(f => ({
      ...f,
      id: uid()
    })));
    setType(preset.folderType);
    setColor(preset.color || FOLDER_TYPES[preset.folderType].color);
    setCover(preset.showCover ?? true);
    setRating(preset.showRating ?? true);
    setRatio(preset.coverRatio || FOLDER_TYPES[preset.folderType].coverRatio);
    setShowRec(false);
  };
  const change = (id, p) => setFields(fs => fs.map(f => f.id === id ? {
    ...f,
    ...p
  } : f));
  const move = (i, d) => setFields(fs => {
    const a = [...fs];
    if (i + d < 0 || i + d >= a.length) return a;
    [a[i], a[i + d]] = [a[i + d], a[i]];
    return a;
  });
  const model = () => ({
    name: name.trim() || '새 폴더',
    folderType: type,
    color: /^#[0-9a-f]{6}$/i.test(color) ? color : '#C084FC',
    fields,
    showCover: cover,
    showRating: rating,
    coverRatio: ratio,
    locked,
    pin: locked ? folder?.pin || pin : null
  });
  const save = async () => {
    if (busy) return;
    if (fields.some(f => !f.label.trim())) {
      setErr('항목 이름을 적어주세요.');
      return;
    }
    if (locked && !folder?.pin && (!/^\d{4}$/.test(pin) || pin !== pin2)) {
      setErr('PIN 4자리를 동일하게 두 번 입력해주세요.');
      return;
    }
    setBusy(true);
    try {
      const ok = await onSave(model());
      if (ok === false) setErr('저장하지 못했어요. 다시 시도해주세요.');
    } finally {
      setBusy(false);
    }
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(Sheet, {
    title: folder ? '폴더와 템플릿 수정' : '첫 항목부터 자유롭게',
    onClose: onClose,
    T: T,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
      className: "hint",
      children: "\uD544\uC694\uD55C \uD56D\uBAA9\uB9CC \uB9CC\uB4E4\uC5B4\uBCF4\uC138\uC694. \uCD94\uCC9C \uC591\uC2DD\uC744 \uAC00\uC838\uC640 \uBC14\uAFD4\uB3C4 \uC88B\uC544\uC694."
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("label", {
      className: "field",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        children: "\uD3F4\uB354 \uC774\uB984"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
        value: name,
        onChange: e => setName(e.target.value),
        placeholder: "\uB098\uC758 \uC74C\uBC18\uC7A5, \uBCF8 \uC601\uD654\uB4E4\u2026"
      })]
    }), !folder && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("button", {
        className: "secondary",
        onClick: () => setShowRec(!showRec),
        children: ["\uCD94\uCC9C \uD15C\uD50C\uB9BF \xB7 \uB0B4 \uD15C\uD50C\uB9BF ", showRec ? '접기' : '보기']
      }), showRec && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "preset-grid",
        children: [Object.entries(FOLDER_TYPES).filter(([k]) => k !== 'custom').map(([k, f]) => /*#__PURE__*/(0, _jsxRuntime.jsxs)("button", {
          onClick: () => apply({
            folderType: k,
            ...f
          }),
          children: [f.emoji, " ", f.label]
        }, k)), templates.map(t => /*#__PURE__*/(0, _jsxRuntime.jsxs)("button", {
          onClick: () => apply(t),
          children: ["\u2606 ", t.name]
        }, t.id))]
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "segmented",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
        className: view === 'edit' ? 'selected' : '',
        onClick: () => setView('edit'),
        children: "\uD56D\uBAA9 \uB9CC\uB4E4\uAE30"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
        className: view === 'preview' ? 'selected' : '',
        onClick: () => setView('preview'),
        children: "\uBBF8\uB9AC\uBCF4\uAE30"
      })]
    }), view === 'edit' ? /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [!fields.length && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "empty-small",
        children: ["\uC544\uC9C1 \uD56D\uBAA9\uC774 \uC5C6\uC5B4\uC694.", /*#__PURE__*/(0, _jsxRuntime.jsx)("br", {}), "\u2018\uAC00\uC218\u2019, \u2018\uB144\uB3C4\u2019\uCC98\uB7FC \uC6D0\uD558\uB294 \uC774\uB984\uC744 \uC801\uC5B4\uBCF4\uC138\uC694."]
      }), fields.map((f, i) => !f.hidden && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "field-builder",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
          "aria-label": "\uD56D\uBAA9 \uC774\uB984",
          value: f.label,
          onChange: e => change(f.id, {
            label: e.target.value
          }),
          placeholder: "\uD56D\uBAA9 \uC774\uB984 \xB7 \uC608: \uAC00\uC218"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("select", {
          "aria-label": "\uC785\uB825 \uBC29\uC2DD",
          value: f.type,
          onChange: e => change(f.id, {
            type: e.target.value
          }),
          children: FIELD_TYPES.map(([v, l]) => /*#__PURE__*/(0, _jsxRuntime.jsx)("option", {
            value: v,
            children: l
          }, v))
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          className: "builder-actions",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
            disabled: !i,
            onClick: () => move(i, -1),
            "aria-label": "\uC704\uB85C",
            children: "\u2191"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
            disabled: i === fields.length - 1,
            onClick: () => move(i, 1),
            "aria-label": "\uC544\uB798\uB85C",
            children: "\u2193"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
            onClick: () => change(f.id, {
              hidden: true
            }),
            children: "\uD56D\uBAA9 \uC228\uAE30\uAE30"
          })]
        }), f.type === 'select' && /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
          "aria-label": "\uC120\uD0DD\uC9C0",
          value: (f.options || []).join(', '),
          placeholder: "\uC120\uD0DD\uC9C0 \xB7 \uC27C\uD45C\uB85C \uAD6C\uBD84",
          onChange: e => change(f.id, {
            options: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "input-example",
          children: f.type === 'textarea' ? '여기에 길게 기록해요' : '여기에 값을 입력해요'
        })]
      }, f.id)), fields.some(f => f.hidden) && /*#__PURE__*/(0, _jsxRuntime.jsxs)("details", {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("summary", {
          children: "\uC228\uAE34 \uD56D\uBAA9 \uB2E4\uC2DC \uD45C\uC2DC"
        }), fields.filter(f => f.hidden).map(f => /*#__PURE__*/(0, _jsxRuntime.jsxs)("button", {
          className: "secondary",
          onClick: () => change(f.id, {
            hidden: false
          }),
          children: [f.label || '이름 없는 항목', " \uFF0B"]
        }, f.id))]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
        className: "secondary",
        onClick: () => setFields([...fields, {
          id: uid(),
          label: '',
          type: 'text'
        }]),
        children: "\uFF0B \uD56D\uBAA9 \uCD94\uAC00"
      })]
    }) : /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "preview-fields",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
        className: "hint",
        children: "\uAE30\uB85D\uD560 \uB54C \uBCF4\uC774\uB294 \uD56D\uBAA9\uC774\uC5D0\uC694."
      }), fields.filter(f => !f.hidden).map(f => /*#__PURE__*/(0, _jsxRuntime.jsx)(FieldInput, {
        field: f,
        value: "",
        onChange: () => {},
        T: T
      }, f.id)), /*#__PURE__*/(0, _jsxRuntime.jsxs)("label", {
        className: "field",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          children: "\uC790\uC720\uB85C\uC6B4 \uAE30\uB85D"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("textarea", {
          placeholder: "\uD615\uC2DD\uC5D0 \uC5BD\uB9E4\uC774\uC9C0 \uC54A\uACE0 \uC801\uC5B4\uBCF4\uC138\uC694",
          readOnly: true
        })]
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("details", {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("summary", {
        children: "\uBCF4\uAE30\uC640 \uAE30\uB2A5"
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "detail-controls",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("label", {
          className: "field",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
            children: ["\uD3F4\uB354 \uAE30\uB2A5 ", folder ? '· 기존 기록 보호를 위해 유지' : '']
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("select", {
            value: type,
            disabled: !!folder,
            onChange: e => setType(e.target.value),
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("option", {
              value: "custom",
              children: "\uC790\uC720 \uAE30\uB85D"
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("option", {
              value: "album",
              children: "\uC568\uBC94 \xB7 \uC74C\uBC18\uC7A5\uACFC \uC7AC\uAC10\uC0C1"
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("option", {
              value: "movie",
              children: "\uC601\uD654"
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("option", {
              value: "book",
              children: "\uCC45"
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("option", {
              value: "anime",
              children: "\uC560\uB2C8"
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("option", {
              value: "manga",
              children: "\uB9CC\uD654"
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("option", {
              value: "webtoon",
              children: "\uC6F9\uD230"
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("option", {
              value: "game",
              children: "\uAC8C\uC784"
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("option", {
              value: "toku",
              children: "\uD2B9\uCD2C\uBB3C"
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("option", {
              value: "memo",
              children: "\uBA54\uBAA8 \uD3B8\uC9D1\uAE30"
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("option", {
              value: "diary",
              children: "\uD558\uB8E8\uC640 \uC21C\uAC04 \uC77C\uAE30"
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("option", {
              value: "ledger",
              children: "\uAC00\uACC4\uBD80"
            })]
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("label", {
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
            type: "checkbox",
            checked: cover,
            onChange: e => setCover(e.target.checked)
          }), " \uCEE4\uBC84 \uC0AC\uC9C4"]
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("label", {
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
            type: "checkbox",
            checked: rating,
            onChange: e => setRating(e.target.checked)
          }), " \uB300\uD45C \uBCC4\uC810"]
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("label", {
          className: "field",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            children: "\uCEE4\uBC84 \uBAA8\uC591"
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("select", {
            value: ratio,
            onChange: e => setRatio(e.target.value),
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("option", {
              value: "1/1",
              children: "\uC815\uC0AC\uAC01\uD615"
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("option", {
              value: "2/3",
              children: "\uC138\uB85C \uD3EC\uC2A4\uD130"
            })]
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(ColorPicker, {
          value: color,
          onChange: setColor,
          T: T
        })]
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("label", {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
        type: "checkbox",
        checked: locked,
        onChange: e => setLocked(e.target.checked)
      }), " PIN\uC73C\uB85C \uD3F4\uB354 \uC7A0\uADF8\uAE30"]
    }), locked && !folder?.pin && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "two-col",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
        "aria-label": "\uC0C8 PIN",
        type: "password",
        inputMode: "numeric",
        maxLength: 4,
        placeholder: "PIN 4\uC790\uB9AC",
        value: pin,
        onChange: e => setPin(e.target.value.replace(/\D/g, ''))
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
        "aria-label": "PIN \uD655\uC778",
        type: "password",
        inputMode: "numeric",
        maxLength: 4,
        placeholder: "\uD55C \uBC88 \uB354",
        value: pin2,
        onChange: e => setPin2(e.target.value.replace(/\D/g, ''))
      })]
    }), folder && /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
      className: "hint",
      children: "\uC228\uAE34 \uD56D\uBAA9\uC758 \uAE30\uC874 \uAC12\uC740 \uBCF4\uAD00\uB429\uB2C8\uB2E4. \uD3F4\uB354 \uC885\uB958\uB294 \uC0C8 \uD3F4\uB354\uC5D0\uC11C \uC120\uD0DD\uD574\uC8FC\uC138\uC694."
    }), err && /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
      role: "alert",
      className: "error",
      children: err
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "two-col",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
        className: "secondary",
        onClick: () => {
          if (fields.some(f => !f.label.trim())) {
            setErr('항목 이름을 채워주세요');
            return;
          }
          onSaveTemplate?.({
            ...model(),
            id: uid(),
            locked: false,
            pin: null
          });
        },
        children: "\uB0B4 \uD15C\uD50C\uB9BF\uC5D0 \uC800\uC7A5"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
        className: "primary",
        disabled: busy,
        onClick: save,
        children: "\uD3F4\uB354 \uC800\uC7A5"
      })]
    }), folder && onDelete && /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
      className: "danger quiet",
      onClick: onDelete,
      children: "\uD3F4\uB354 \uC0AD\uC81C"
    })]
  });
}
function ItemModal({
  item,
  folder,
  folders,
  onSave,
  onClose,
  onDelete,
  onImgError,
  T,
  allItems = []
}) {
  const [form, setForm] = useState(() => ({
    ...item,
    id: item?.id || uid(),
    folderId: item?.folderId || folder?.id,
    title: item?.title || '',
    notes: item?.notes || '',
    values: {
      ...item?.values
    },
    _displayType: item?._displayType || (folder?.folderType === 'all' ? 'custom' : folder?.folderType) || 'custom',
    createdAt: item?.createdAt || new Date().toISOString()
  }));
  const done = useRef(false);
  const [saving, setSaving] = useState(false),
    [err, setErr] = useState(''),
    [recovered, setRecovered] = useState(false),
    [ready, setReady] = useState(false);
  const key = 'item:' + (item?.id || folder?.id),
    latest = useRef(form);
  latest.current = form;
  const active = folders.find(f => f.id === form.folderId) || folder,
    fields = folderFields(active);
  useEffect(() => {
    let alive = true;
    draftRead(key).then(d => {
      if (!alive) return;
      if (d && (!item?.updatedAt || d.updatedAt > item.updatedAt)) {
        setForm(d.form);
        setRecovered(true);
      }
      setReady(true);
    });
    return () => {
      alive = false;
    };
  }, []);
  useEffect(() => {
    if (!ready) return;
    const t = setTimeout(() => {
      if (!done.current) draftWrite(key, {
        form,
        updatedAt: new Date().toISOString()
      });
    }, 600);
    return () => clearTimeout(t);
  }, [form, ready]);
  const set = (k, v) => setForm(f => ({
    ...f,
    [k]: v
  }));
  const close = async () => {
    if (!ready) {
      onClose();
      return;
    }
    const ok = await draftWrite(key, {
      form: latest.current,
      updatedAt: new Date().toISOString()
    });
    if (ok || window.confirm('임시 저장에 실패했어요. 그래도 닫을까요?')) onClose();
  };
  const save = async () => {
    if (saving) return;
    if (!form.title.trim() && !form.notes.trim() && !form.coverId && !Object.values(form.values).some(Boolean)) {
      setErr('제목, 본문, 사진 또는 항목을 하나 남겨주세요.');
      return;
    }
    setSaving(true);
    const updated = {
      ...form,
      title: form.title.trim() || form.notes.trim().split('\n')[0].slice(0, 60) || '제목 없는 기록',
      updatedAt: new Date().toISOString()
    };
    const ok = await onSave(updated);
    if (ok !== false) {
      done.current = true;
      await draftDelete(key);
    } else setErr('저장하지 못했어요. 입력 내용은 유지됩니다.');
    setSaving(false);
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(Sheet, {
    title: item ? '기록 수정' : '새 기록',
    onClose: close,
    T: T,
    children: [recovered && /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
      className: "notice",
      children: "\uC791\uC131 \uC911\uC774\uB358 \uB0B4\uC6A9\uC744 \uBCF5\uAD6C\uD588\uC5B4\uC694."
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("label", {
      className: "field",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        children: "\uC81C\uBAA9 \xB7 \uC120\uD0DD"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
        value: form.title,
        onChange: e => set('title', e.target.value),
        placeholder: "\uC5B4\uB5A4 \uAE30\uB85D\uC778\uAC00\uC694?"
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("label", {
      className: "field",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        children: "\uC790\uC720\uB85C\uC6B4 \uAE30\uB85D"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("textarea", {
        rows: 7,
        value: form.notes,
        onChange: e => set('notes', e.target.value),
        placeholder: "\uD55C \uBB38\uC7A5\uB3C4 \uC88B\uC544\uC694. \uBA3C\uC800 \uC801\uC5B4\uBCF4\uC138\uC694."
      })]
    }), fields.filter(f => !f.hidden).map(f => /*#__PURE__*/(0, _jsxRuntime.jsx)(FieldInput, {
      field: f,
      value: fieldValue(form, f),
      onChange: v => set('values', {
        ...form.values,
        [f.id]: v
      }),
      suggestions: fieldSuggestions(allItems, active, f, String(fieldValue(form, f) || '')),
      T: T
    }, f.id)), active?.showRating && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "field",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        children: "\uBCC4\uC810 \xB7 \uC120\uD0DD"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(Stars, {
        T: T,
        value: form.rating,
        onChange: v => set('rating', v),
        size: 30
      })]
    }), getStatusMeta(active?.folderType) && /*#__PURE__*/(0, _jsxRuntime.jsxs)("label", {
      className: "field",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        children: "\uC0C1\uD0DC"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("select", {
        value: form.itemStatus || defaultStatus(active?.folderType),
        onChange: e => set('itemStatus', e.target.value),
        children: Object.entries(getStatusMeta(active.folderType)).map(([k, v]) => /*#__PURE__*/(0, _jsxRuntime.jsx)("option", {
          value: k,
          children: v.label
        }, k))
      })]
    }), active?.showCover !== false && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      style: {
        width: 140
      },
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(CoverUpload, {
        imgId: form.coverId,
        ratio: active?.coverRatio || '1/1',
        onChange: v => set('coverId', v),
        onError: onImgError,
        T: T
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("details", {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("summary", {
        children: "\uD55C\uC904\uD3C9\uACFC \uD3F4\uB354"
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "detail-controls",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
          "aria-label": "\uD55C\uC904\uD3C9",
          value: form.oneLiner || '',
          onChange: e => set('oneLiner', e.target.value),
          placeholder: "\uAE30\uC5B5\uD558\uACE0 \uC2F6\uC740 \uD55C \uBB38\uC7A5"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("select", {
          "aria-label": "\uD3F4\uB354",
          value: form.folderId,
          onChange: e => set('folderId', e.target.value),
          children: folders.filter(f => f.id === form.folderId || f.folderType === active?.folderType && !f.locked).map(f => /*#__PURE__*/(0, _jsxRuntime.jsx)("option", {
            value: f.id,
            children: f.name
          }, f.id))
        })]
      })]
    }), err && /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
      role: "alert",
      className: "error",
      children: err
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
      className: "primary",
      disabled: saving || !ready,
      onClick: save,
      children: saving ? '저장 중…' : '저장하기'
    }), item && onDelete && /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
      className: "quiet danger",
      disabled: saving,
      onClick: async () => {
        done.current = true;
        setSaving(true);
        try {
          if (await onDelete(item)) await draftDelete(key);else done.current = false;
        } finally {
          setSaving(false);
        }
      },
      children: "\uC774 \uAE30\uB85D \uC0AD\uC81C"
    })]
  });
}

// SOURCE: memo.jsx
// ── 메모 HTML의 이미지 처리 ──
// 저장할 땐 src(무거운 Base64)를 지우고 data-gid(짧은 id)만 남긴다 → 데이터 가벼움
function stripImgSrc(html) {
  if (!html || html.indexOf("<img") === -1) return html;
  const d = document.createElement("div");
  d.innerHTML = html;
  d.querySelectorAll("img").forEach(im => {
    const gid = im.dataset.gid;
    if (gid) im.removeAttribute("src"); // id 있으면 src 제거 (id로 다시 찾을 수 있음)
    else if ((im.getAttribute("src") || "").startsWith("data:")) im.remove(); // 외부에서 붙여넣은 Base64는 버림
  });
  return d.innerHTML;
}
// 보여줄 땐 id로 IndexedDB 캐시에서 실제 이미지를 찾아 src에 넣는다
function hydrateImgs(html) {
  if (!html || html.indexOf("<img") === -1) return html;
  const d = document.createElement("div");
  d.innerHTML = html;
  d.querySelectorAll("img[data-gid]").forEach(im => {
    const u = _urlCache[im.dataset.gid];
    if (u) im.setAttribute("src", u);
  });
  return d.innerHTML;
}
// 메모 HTML에 쓰인 이미지 id 전부 뽑기 (미리 불러오기용)
function imgIdsInHtml(html) {
  if (!html || html.indexOf("<img") === -1) return [];
  const d = document.createElement("div");
  d.innerHTML = html;
  return [...d.querySelectorAll("img[data-gid]")].map(im => im.dataset.gid).filter(Boolean);
}

// 예전 메모(notes 문자열)를 블록 배열로 변환 — 하위호환
function memoToBlocks(memo) {
  if (memo && Array.isArray(memo.blocks) && memo.blocks.length) return memo.blocks;
  const t = memo?.notes || "";
  const html = t ? t.split("\n").map(l => `<p>${l.replace(/&/g, "&amp;").replace(/</g, "&lt;") || "<br>"}</p>`).join("") : "";
  return [{
    id: uid(),
    type: "text",
    html
  }];
}
// 여러 블록을 에디터 하나짜리 HTML로 합치기 (구버전 메모 → 신버전)
function blocksToHtml(blocks) {
  // 구버전 토글 블록 → 소제목(h2) + 내용. Quill이 <details>를 지워버려서(실측 확인)
  // 접기 기능은 못 살리지만, 제목과 내용은 하나도 안 잃는다.
  return (blocks || []).map(b => {
    if (b.type === "toggle") {
      const t = (b.title || "").replace(/&/g, "&amp;").replace(/</g, "&lt;");
      return (t ? `<h2>${t}</h2>` : "") + (b.html || "");
    }
    return b.html || "";
  }).join("") || "<p><br></p>";
}
// 검색·미리보기용 순수 텍스트
function htmlToText(html) {
  return plainText(html);
}
// 메모의 본문 HTML 얻기 (구/신버전 모두 대응)
function memoHtml(memo) {
  if (memo && typeof memo.html === "string" && memo.html) return sanitizeHtml(memo.html);
  return sanitizeHtml(blocksToHtml(memoToBlocks(memo)));
}

// iOS 키보드 대응: 키보드가 올라와도 100vh는 안 변해서 바텀시트가 가려진다.
// visualViewport가 "실제로 보이는 높이"를 알려준다.
//
// ⚠️ 중요: setState로 처리하면 키보드가 움직이는 매 프레임마다 React가 리렌더돼서
//    뚝뚝 끊긴다. 그래서 ref로 받은 DOM에 직접 스타일을 쓴다 (리렌더 0회).
//    transition도 주지 않는다 — iOS 키보드 자체 애니메이션과 박자가 어긋나기 때문.
// iOS 키보드 대응.
// ⚠️ height를 줄이면 시트가 "찌그러질" 뿐이라 툴바가 키보드 뒤로 깔린다.
//    대신 시트 전체를 키보드 높이만큼 위로 밀어 올린다(transform).
//    transform은 GPU가 처리해서 키보드 애니메이션과 잘 붙는다.
// ⚠️ setState를 쓰면 매 프레임 리렌더돼서 끊긴다 → ref로 DOM에 직접 쓴다.
function useKeyboardInset(ref) {
  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;
    let frame = 0;
    const apply = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const gap = Math.max(0, window.innerHeight - vv.height - vv.offsetTop);
        el.style.transform = gap > 70 ? `translateY(-${gap}px)` : '';
        el.style.height = gap > 70 ? `${vv.height - 8}px` : '';
        el.style.maxHeight = `${Math.max(180, vv.height - 12)}px`;
      });
    };
    vv.addEventListener('resize', apply);
    vv.addEventListener('scroll', apply);
    apply();
    return () => {
      cancelAnimationFrame(frame);
      vv.removeEventListener('resize', apply);
      vv.removeEventListener('scroll', apply);
    };
  }, []);
}

// 툴바 버튼. MemoModal 안에 정의하면 렌더될 때마다 새 컴포넌트로 인식돼
// React가 버튼을 통째로 재생성한다(→ 깜빡임/포커스 손실). 그래서 밖에 둔다.
// onMouseDown/onTouchStart의 preventDefault가 에디터 포커스를 지켜준다(키보드 유지).
function TBtn({
  on,
  label,
  onPress,
  T
}) {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
    onMouseDown: e => e.preventDefault(),
    onPointerDown: e => {
      if (e.pointerType === 'mouse') e.preventDefault();
    },
    onClick: onPress,
    style: {
      flex: 1,
      minWidth: 34,
      height: 34,
      borderRadius: 8,
      border: "none",
      background: on ? "rgba(192,132,252,0.18)" : "transparent",
      color: on ? "#C084FC" : T.muted,
      fontSize: 14,
      fontWeight: 700,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    children: label
  });
}
function MemoModal({
  memo,
  folderId,
  onSave,
  onClose,
  onDelete,
  onImgError,
  T,
  folder,
  allItems = []
}) {
  const [values, setValues] = useState(memo?.values || {});
  const valuesRef = useRef(values);
  valuesRef.current = values;
  const createdRef = useRef(memo?.createdAt || new Date().toISOString());
  const stableId = useRef(memo?.id || uid());
  const draftKey = 'memo:' + (memo?.id || folderId);
  const [title, setTitle] = useState(memo?.title || '');
  const titleRef = useRef(title);
  titleRef.current = title;
  const [saveState, setSaveState] = useState('ready');
  const [recovered, setRecovered] = useState(false);
  const [chars, setChars] = useState(0);
  const [editorError, setEditorError] = useState('');
  const deleting = useRef(false),
    composing = useRef(false);
  const loadedRef = useRef(null),
    changeTimer = useRef(null),
    mounted = useRef(true),
    savingRef = useRef(Promise.resolve()),
    revision = useRef(0),
    savedRevision = useRef(0);
  const saveCallback = useRef(onSave);
  saveCallback.current = onSave;
  const makeValue = () => {
    const html = sanitizeHtml(htmlRef.current || '');
    return {
      ...memo,
      id: stableId.current,
      folderId: memo?.folderId || folderId,
      title: titleRef.current.trim(),
      values: valuesRef.current,
      html,
      notes: htmlToText(html),
      blocks: null,
      _kind: 'memo',
      createdAt: createdRef.current,
      updatedAt: new Date().toISOString()
    };
  };
  const flush = () => {
    if (deleting.current || composing.current || !quillRef.current) return Promise.resolve(false);
    const value = makeValue();
    if (!memo && savedRevision.current === 0 && !value.title && !value.notes && !value.html.includes('<img')) return Promise.resolve(true);
    const n = revision.current;
    setSaveState('saving');
    const job = savingRef.current.then(async () => {
      const draftOK = await draftWrite(draftKey, {
        ...value,
        updatedAt: new Date().toISOString()
      });
      const ok = await saveCallback.current(value, {
        silent: true
      });
      if (ok !== false) {
        savedRevision.current = n;
        if (revision.current === n) await draftDelete(draftKey);
      }
      if (mounted.current) setSaveState(ok === false ? draftOK ? 'draft' : 'error' : 'saved');
      return ok !== false;
    });
    savingRef.current = job.catch(() => {
      if (mounted.current) setSaveState('error');
      return false;
    });
    return savingRef.current;
  };
  const changed = () => {
    if (deleting.current) return;
    revision.current++;
    setSaveState('dirty');
    clearTimeout(changeTimer.current);
    const value = makeValue();
    draftWrite(draftKey, value).then(ok => {
      if (!ok && mounted.current) setSaveState('error');
    });
    changeTimer.current = setTimeout(() => {
      setChars(htmlToText(htmlRef.current).length);
      flush();
    }, 900);
  };
  useEffect(() => {
    mounted.current = true;
    const hide = () => {
      if (!deleting.current && quillRef.current && revision.current !== savedRevision.current) {
        draftWrite(draftKey, makeValue());
        flush();
      }
    };
    const before = e => {
      if (revision.current !== savedRevision.current) {
        draftWrite(draftKey, makeValue());
        e.preventDefault();
        e.returnValue = '';
      }
    };
    document.addEventListener('visibilitychange', hide);
    window.addEventListener('pagehide', hide);
    window.addEventListener('beforeunload', before);
    return () => {
      mounted.current = false;
      clearTimeout(changeTimer.current);
      document.removeEventListener('visibilitychange', hide);
      window.removeEventListener('pagehide', hide);
      window.removeEventListener('beforeunload', before);
    };
  }, []);
  const [imgReady, setImgReady] = useState(false);
  const holderRef = useRef(null);
  const quillRef = useRef(null);
  const htmlRef = useRef(""); // 최신 본문 (저장할 때 읽음)
  const [active, setActive] = useState({}); // 툴바 버튼 눌림 표시
  const sheetRef = useRef(null);
  useKeyboardInset(sheetRef);
  const MC = "#94A3B8";
  useEffect(() => {
    let alive = true;
    (async () => {
      const draft = await draftRead(draftKey);
      const source = draft && (!memo?.updatedAt || draft.updatedAt > memo.updatedAt) ? draft : memo;
      if (!alive) return;
      loadedRef.current = source;
      if (source && source !== memo) {
        setTitle(source.title || '');
        titleRef.current = source.title || '';
        setRecovered(true);
        stableId.current = source.id;
        createdRef.current = source.createdAt || createdRef.current;
        setValues(source.values || {});
        valuesRef.current = source.values || {};
        revision.current++;
      }
      for (const id of imgIdsInHtml(memoHtml(source))) {
        try {
          await getImgUrl(id);
        } catch {}
      }
      if (alive) setImgReady(true);
    })();
    return () => {
      alive = false;
    };
  }, []);
  useEffect(() => {
    if (!imgReady || !holderRef.current || quillRef.current) return;
    if (typeof Quill === "undefined") {
      setEditorError("편집기를 불러오지 못했어요. 인터넷 연결 후 다시 열어주세요. 기존 내용은 보존돼요.");
      return;
    }
    // ⚠️ Quill은 화이트리스트에 없는 폰트/크기를 조용히 버린다(실측 확인).
    //    그래서 쓰려는 값을 미리 등록해야 한다. 앱 전체에서 딱 1번만.
    if (!Quill.__girokFmt) {
      try {
        const Font = Quill.import("formats/font");
        Font.whitelist = ["sans", "serif", "mono"];
        Quill.register(Font, true);
        // 크기는 class 대신 style(px)로 — CSS가 없어도 크기가 살아있음
        const Size = Quill.import("attributors/style/size");
        Size.whitelist = ["13px", "15px", "18px", "22px", "28px"];
        Quill.register(Size, true);
        const BaseImage = Quill.import('formats/image');
        class StoredImage extends BaseImage {
          static create(value) {
            const n = super.create(typeof value === 'object' ? value.src : value);
            if (value && typeof value === 'object' && value.gid) n.setAttribute('data-gid', value.gid);
            return n;
          }
          static formats(n) {
            return {
              ...super.formats(n),
              gid: n.getAttribute('data-gid') || undefined
            };
          }
          format(name, value) {
            if (name === 'gid') {
              if (value) this.domNode.setAttribute('data-gid', value);else this.domNode.removeAttribute('data-gid');
            } else super.format(name, value);
          }
        }
        Quill.register(StoredImage, true);
        Quill.__girokFmt = true;
      } catch (e) {
        console.warn("서식 등록 실패:", e);
      }
    }
    const q = new Quill(holderRef.current, {
      theme: "snow",
      placeholder: "자유롭게 적어보세요...",
      modules: {
        toolbar: false,
        history: {
          delay: 800,
          maxStack: 100,
          userOnly: true
        }
      } // 툴바는 우리가 아래에 직접 만든다
    });
    const init = hydrateImgs(memoHtml(loadedRef.current || memo));
    q.clipboard.dangerouslyPasteHTML(init);
    htmlRef.current = stripImgSrc(q.root.innerHTML);
    initialRef.current = htmlRef.current; // 변경 감지 기준점
    q.root.addEventListener("compositionstart", () => {
      composing.current = true;
      clearTimeout(changeTimer.current);
    });
    q.root.addEventListener("compositionend", () => {
      composing.current = false;
      htmlRef.current = stripImgSrc(q.root.innerHTML);
      changed();
    });
    q.on("text-change", () => {
      htmlRef.current = stripImgSrc(q.root.innerHTML);
      changed();
    });
    // 커서 위치가 바뀌면 현재 서식 상태를 툴바에 반영
    q.on("selection-change", () => {
      try {
        setActive(q.getFormat() || {});
      } catch {}
    });
    quillRef.current = q;
    q.history.clear();
    setChars(htmlToText(htmlRef.current).length);
    if (!memo && !recovered) q.focus();
  }, [imgReady]);

  // 서식 적용. onMouseDown에서 preventDefault → 에디터 포커스 유지(키보드 안 내려감)
  const fmt = (name, val) => {
    const q = quillRef.current;
    if (!q) return;
    q.focus();
    const cur = q.getFormat();
    const next = val === undefined ? !cur[name] : cur[name] === val ? false : val;
    q.format(name, next, "user");
    setActive(q.getFormat() || {});
    htmlRef.current = stripImgSrc(q.root.innerHTML);
  };
  // 체크리스트 켜고 끄기. 이미 체크리스트(checked/unchecked 둘 다)면 해제한다.
  const toggleCheck = () => {
    const q = quillRef.current;
    if (!q) return;
    q.focus();
    const cur = q.getFormat();
    const isCheck = cur.list === "unchecked" || cur.list === "checked";
    q.format("list", isCheck ? false : "unchecked", "user");
    setActive(q.getFormat() || {});
    htmlRef.current = stripImgSrc(q.root.innerHTML);
  };
  // 들여쓰기: +1 / -1 (Quill은 0~8단계 지원)
  const indent = dir => {
    const q = quillRef.current;
    if (!q) return;
    q.focus();
    const cur = q.getFormat();
    const now = cur.indent || 0;
    const next = Math.max(0, Math.min(8, now + dir));
    q.format("indent", next || false, "user");
    setActive(q.getFormat() || {});
    htmlRef.current = stripImgSrc(q.root.innerHTML);
  };
  // 형광펜: 배경만 칠하면 다크테마 흰 글자가 안 보인다 → 글자색도 같이 어둡게
  const highlight = (bg, fg) => {
    const q = quillRef.current;
    if (!q) return;
    q.focus();
    const cur = q.getFormat();
    const same = (cur.background || "").toLowerCase() === String(bg).toLowerCase();
    if (bg === false || same) {
      // 끄기 (같은 색 다시 누르면 해제)
      q.format("background", false, "user");
      q.format("color", false, "user");
    } else {
      q.format("background", bg, "user");
      q.format("color", fg || "#1A1A1A", "user"); // 배경과 어울리는 진한 글자색
    }
    setActive(q.getFormat() || {});
    htmlRef.current = stripImgSrc(q.root.innerHTML);
  };
  const pickImage = () => {
    const q = quillRef.current;
    if (!q) return;
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async () => {
      const f = input.files && input.files[0];
      if (!f) return;
      try {
        const dataUrl = await compressImage(f, 900, 0.82);
        const id = uid();
        await idbPut(id, dataUrl);
        _urlCache[id] = dataUrl;
        const range = q.getSelection(true);
        const at = range ? range.index : q.getLength();
        q.insertEmbed(at, "image", {
          src: dataUrl,
          gid: id
        }, "user");
        setTimeout(() => {
          q.root.querySelectorAll('img[src^="data:"]').forEach(im => {
            if (im.src === dataUrl && !im.dataset.gid) im.dataset.gid = id;
          });
          htmlRef.current = stripImgSrc(q.root.innerHTML);
          changed();
        }, 0);
        q.setSelection(at + 1, 0);
      } catch (err) {
        onImgError && onImgError("이미지를 저장할 수 없어요. 공간을 확인해주세요.");
      }
    };
    input.click();
  };
  const addLink = () => {
    const q = quillRef.current;
    if (!q) return;
    const range = q.getSelection(true);
    if (!range || range.length === 0) {
      onImgError && onImgError("링크를 걸 글자를 먼저 선택해주세요");
      return;
    }
    const url = prompt("링크 주소를 입력하세요", "https://");
    if (url && url !== "https://") {
      q.format("link", url, "user");
      htmlRef.current = stripImgSrc(q.root.innerHTML);
    }
  };
  // 처음 내용을 기억해뒀다가, 닫을 때 바뀌었으면 물어본다 (실수로 날리는 것 방지)
  const initialRef = useRef(null);
  const tryClose = async () => {
    clearTimeout(changeTimer.current);
    if (!quillRef.current) {
      onClose();
      return;
    }
    const ok = await flush();
    if (ok || window.confirm('기록 저장에 실패했어요. 임시 저장 상태를 확인한 뒤 닫을까요?')) onClose();
  };
  const save = tryClose;
  const remove = async () => {
    if (deleting.current) return;
    deleting.current = true;
    clearTimeout(changeTimer.current);
    await savingRef.current;
    try {
      const ok = await onDelete(makeValue());
      if (ok) await draftDelete(draftKey);else {
        deleting.current = false;
        changed();
      }
    } catch {
      deleting.current = false;
      setSaveState('error');
    }
  };
  useEffect(() => {
    const close = e => {
      e.preventDefault();
      tryClose();
    };
    window.addEventListener('girok:close-editor', close);
    return () => window.removeEventListener('girok:close-editor', close);
  });

  // 형광펜: 배경색마다 어울리는 진한 글자색을 짝지어 둔다 (같은 계열 어두운 톤)
  const HL = [{
    bg: "#A7F3D0",
    fg: "#065F46",
    name: "민트"
  }, {
    bg: "#FEF08A",
    fg: "#713F12",
    name: "노랑"
  }, {
    bg: "#BFDBFE",
    fg: "#1E3A8A",
    name: "파랑"
  }, {
    bg: "#FBCFE8",
    fg: "#831843",
    name: "분홍"
  }, {
    bg: "#FED7AA",
    fg: "#7C2D12",
    name: "주황"
  }];
  // 글자색 팔레트 (형광펜 없이 글자만)
  const FG = ["#F4F2F7", "#F87171", "#FBBF24", "#34D399", "#60A5FA", "#C084FC"];
  const SIZES = [["13px", "작게"], ["15px", "보통"], ["18px", "크게"], ["22px", "제목"], ["28px", "대제목"]];
  const FONTS = [["sans", "고딕"], ["serif", "명조"], ["mono", "코드"]];
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    style: {
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.8)",
      zIndex: 300,
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "center",
      backdropFilter: "blur(6px)"
    },
    onClick: e => e.target === e.currentTarget && tryClose(),
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      ref: sheetRef,
      style: {
        width: "100%",
        maxWidth: 560,
        height: "93vh",
        maxHeight: "93vh",
        display: "flex",
        flexDirection: "column",
        minHeight: 0,
        willChange: "transform",
        // 위로 밀렸을 때 아래에 배경이 비지 않도록 시트 색 그림자를 아래로 길게
        boxShadow: `0 50vh 0 0 ${T.surface2}`
      },
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        style: {
          background: T.surface,
          borderRadius: "24px 24px 0 0",
          width: "100%",
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          animation: "slideUp .3s cubic-bezier(.32,1.1,.58,1) both",
          boxSizing: "border-box",
          overflow: "hidden"
        },
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          style: {
            padding: "14px 20px 10px",
            flexShrink: 0
          },
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            style: {
              width: 40,
              height: 4,
              background: T.surface2,
              borderRadius: 2,
              margin: "0 auto 12px"
            }
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            style: {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            },
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
              style: {
                fontFamily: "'Noto Serif KR',serif",
                fontSize: 18,
                fontWeight: 700,
                color: T.text
              },
              children: memo ? "메모" : "새 메모"
            }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
              style: {
                display: "flex",
                gap: 8,
                alignItems: "center"
              },
              children: [memo && /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
                onClick: remove,
                style: {
                  background: "transparent",
                  border: `1px solid rgba(190,30,30,0.3)`,
                  borderRadius: 8,
                  color: "#F87171",
                  fontSize: 12,
                  fontWeight: 600,
                  padding: "5px 10px",
                  cursor: "pointer"
                },
                children: "\uC0AD\uC81C"
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
                onClick: save,
                style: {
                  background: `linear-gradient(135deg,${MC},#64748B)`,
                  border: "none",
                  borderRadius: 8,
                  color: "#fff",
                  fontSize: 13,
                  fontWeight: 700,
                  padding: "6px 14px",
                  cursor: "pointer"
                },
                children: "\uC644\uB8CC"
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
                onClick: tryClose,
                style: {
                  background: T.surface2,
                  border: "none",
                  borderRadius: "50%",
                  width: 30,
                  height: 30,
                  color: T.muted,
                  fontSize: 16,
                  cursor: "pointer"
                },
                children: "\u2715"
              })]
            })]
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          style: {
            padding: '0 20px 10px'
          },
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
            className: "memo-title-input",
            "aria-label": "\uBA54\uBAA8 \uC81C\uBAA9",
            placeholder: "\uC81C\uBAA9 \xB7 \uC120\uD0DD",
            value: title,
            onChange: e => {
              setTitle(e.target.value);
              titleRef.current = e.target.value;
              changed();
            }
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            className: "memo-save-line",
            "aria-live": "polite",
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
              children: editorError || {
                ready: '자유롭게 적어보세요',
                dirty: '작성 중',
                saving: '저장 중…',
                saved: '기기에 저장됨',
                draft: '초안 보관됨 · 저장 재시도 필요',
                error: '저장 실패 · 내용을 복사해 보관해주세요'
              }[saveState]
            }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
              children: [chars.toLocaleString(), "\uC790"]
            })]
          }), recovered && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            className: "hint",
            children: "\uC791\uC131 \uC911\uC774\uB358 \uBA54\uBAA8\uB97C \uBCF5\uAD6C\uD588\uC5B4\uC694."
          })]
        }), folderFields(folder).length > 0 && /*#__PURE__*/(0, _jsxRuntime.jsxs)("details", {
          style: {
            padding: '0 20px 8px',
            maxHeight: '28vh',
            overflowY: 'auto'
          },
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("summary", {
            children: "\uAE30\uB85D \uD56D\uBAA9"
          }), folderFields(folder).map(f => /*#__PURE__*/(0, _jsxRuntime.jsx)(FieldInput, {
            field: f,
            value: values[f.id] || '',
            T: T,
            suggestions: fieldSuggestions(allItems, folder, f, String(values[f.id] || '')),
            onChange: v => {
              const next = {
                ...values,
                [f.id]: v
              };
              setValues(next);
              valuesRef.current = next;
              changed();
            }
          }, f.id))]
        }), editorError && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          style: {
            padding: '12px 20px',
            overflow: 'auto'
          },
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
            children: memo?.notes || '인터넷 연결을 확인한 뒤 다시 열어주세요.'
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          style: {
            flex: 1,
            minHeight: 0,
            overflowY: "auto",
            WebkitOverflowScrolling: "touch",
            padding: "0 8px"
          },
          children: [!imgReady && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            style: {
              padding: "30px 0",
              textAlign: "center",
              color: T.dim,
              fontSize: 13
            },
            children: "\uBD88\uB7EC\uC624\uB294 \uC911..."
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            ref: holderRef,
            style: {
              color: T.text,
              display: imgReady ? "block" : "none"
            }
          })]
        }), imgReady && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          style: {
            flexShrink: 0,
            borderTop: `1px solid ${T.border}`,
            background: T.surface2,
            padding: "6px 8px",
            display: "flex",
            flexDirection: "column",
            gap: 5
          },
          children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            style: {
              display: "flex",
              gap: 3,
              alignItems: "center",
              overflowX: "auto",
              WebkitOverflowScrolling: "touch"
            },
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(TBtn, {
              T: T,
              on: active.bold,
              label: "B",
              onPress: () => fmt("bold")
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(TBtn, {
              T: T,
              on: active.italic,
              label: /*#__PURE__*/(0, _jsxRuntime.jsx)("i", {
                children: "I"
              }),
              onPress: () => fmt("italic")
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(TBtn, {
              T: T,
              on: active.underline,
              label: /*#__PURE__*/(0, _jsxRuntime.jsx)("u", {
                children: "U"
              }),
              onPress: () => fmt("underline")
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(TBtn, {
              T: T,
              on: active.strike,
              label: /*#__PURE__*/(0, _jsxRuntime.jsx)("s", {
                children: "S"
              }),
              onPress: () => fmt("strike")
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
              style: {
                width: 1,
                height: 20,
                background: T.border,
                flexShrink: 0,
                margin: "0 2px"
              }
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(TBtn, {
              T: T,
              label: "\u21B6",
              onPress: () => quillRef.current?.history.undo()
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(TBtn, {
              T: T,
              label: "\u21B7",
              onPress: () => quillRef.current?.history.redo()
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(TBtn, {
              T: T,
              on: active.list === "bullet",
              label: "\u2022",
              onPress: () => fmt("list", "bullet")
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(TBtn, {
              T: T,
              label: "\u21B6",
              onPress: () => quillRef.current?.history.undo()
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(TBtn, {
              T: T,
              label: "\u21B7",
              onPress: () => quillRef.current?.history.redo()
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(TBtn, {
              T: T,
              on: active.list === "ordered",
              label: "1.",
              onPress: () => fmt("list", "ordered")
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(TBtn, {
              T: T,
              label: "\u21B6",
              onPress: () => quillRef.current?.history.undo()
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(TBtn, {
              T: T,
              label: "\u21B7",
              onPress: () => quillRef.current?.history.redo()
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(TBtn, {
              T: T,
              on: active.list === "unchecked" || active.list === "checked",
              label: "\u2611",
              onPress: () => toggleCheck()
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(TBtn, {
              T: T,
              label: "\u21E5",
              onPress: () => indent(1)
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(TBtn, {
              T: T,
              label: "\u21E4",
              onPress: () => indent(-1)
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
              style: {
                width: 1,
                height: 20,
                background: T.border,
                flexShrink: 0,
                margin: "0 2px"
              }
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(TBtn, {
              T: T,
              on: !active.align,
              label: "\u2B05",
              onPress: () => fmt("align", false)
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(TBtn, {
              T: T,
              on: active.align === "center",
              label: "\u2B0C",
              onPress: () => fmt("align", "center")
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(TBtn, {
              T: T,
              on: active.align === "right",
              label: "\u27A1",
              onPress: () => fmt("align", "right")
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
              style: {
                width: 1,
                height: 20,
                background: T.border,
                flexShrink: 0,
                margin: "0 2px"
              }
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(TBtn, {
              T: T,
              label: "\uD83D\uDD17",
              onPress: addLink
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(TBtn, {
              T: T,
              label: "\uD83D\uDDBC",
              onPress: pickImage
            })]
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            style: {
              display: "flex",
              gap: 3,
              alignItems: "center",
              overflowX: "auto",
              WebkitOverflowScrolling: "touch"
            },
            children: [SIZES.map(([v, l]) => /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
              onMouseDown: e => e.preventDefault(),
              onTouchStart: e => e.preventDefault(),
              onClick: () => fmt("size", v),
              style: {
                flexShrink: 0,
                padding: "0 9px",
                height: 30,
                borderRadius: 7,
                cursor: "pointer",
                border: "none",
                fontWeight: 700,
                fontSize: 12,
                background: active.size === v ? "rgba(192,132,252,0.18)" : "transparent",
                color: active.size === v ? "#C084FC" : T.muted
              },
              children: l
            }, v)), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
              style: {
                width: 1,
                height: 18,
                background: T.border,
                flexShrink: 0,
                margin: "0 3px"
              }
            }), FONTS.map(([v, l]) => /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
              onMouseDown: e => e.preventDefault(),
              onTouchStart: e => e.preventDefault(),
              onClick: () => fmt("font", v),
              style: {
                flexShrink: 0,
                padding: "0 9px",
                height: 30,
                borderRadius: 7,
                cursor: "pointer",
                border: "none",
                fontWeight: 700,
                fontSize: 12,
                fontFamily: v === "serif" ? "'Noto Serif KR',serif" : v === "mono" ? "monospace" : "'Noto Sans KR',sans-serif",
                background: active.font === v ? "rgba(192,132,252,0.18)" : "transparent",
                color: active.font === v ? "#C084FC" : T.muted
              },
              children: l
            }, v))]
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            style: {
              display: "flex",
              gap: 5,
              alignItems: "center"
            },
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
              style: {
                fontSize: 10,
                color: T.dim,
                fontWeight: 700,
                width: 32,
                flexShrink: 0
              },
              children: "\uAE00\uC790\uC0C9"
            }), FG.map(col => /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
              onMouseDown: e => e.preventDefault(),
              onTouchStart: e => e.preventDefault(),
              onClick: () => fmt("color", col),
              style: {
                width: 24,
                height: 24,
                borderRadius: "50%",
                cursor: "pointer",
                background: col,
                flexShrink: 0,
                border: (active.color || "").toLowerCase() === col.toLowerCase() ? "2px solid #C084FC" : `1px solid ${T.border}`
              }
            }, col))]
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            style: {
              display: "flex",
              gap: 5,
              alignItems: "center"
            },
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
              style: {
                fontSize: 10,
                color: T.dim,
                fontWeight: 700,
                width: 32,
                flexShrink: 0
              },
              children: "\uD615\uAD11\uD39C"
            }), HL.map(h => /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
              title: h.name,
              onMouseDown: e => e.preventDefault(),
              onTouchStart: e => e.preventDefault(),
              onClick: () => highlight(h.bg, h.fg),
              style: {
                width: 24,
                height: 24,
                borderRadius: 6,
                cursor: "pointer",
                background: h.bg,
                flexShrink: 0,
                border: (active.background || "").toLowerCase() === h.bg.toLowerCase() ? "2px solid #C084FC" : `1px solid ${T.border}`
              }
            }, h.bg)), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
              onMouseDown: e => e.preventDefault(),
              onTouchStart: e => e.preventDefault(),
              onClick: () => highlight(false),
              style: {
                width: 24,
                height: 24,
                borderRadius: 6,
                cursor: "pointer",
                background: "transparent",
                border: `1px solid ${T.border}`,
                color: T.dim,
                fontSize: 11,
                flexShrink: 0
              },
              children: "\u2715"
            })]
          })]
        })]
      })
    })
  });
}

// 메모 전체보기 (읽기 전용). 카드를 누르면 열림 → 잘린 내용 다 볼 수 있음
function MemoDetail({
  memo,
  onClose,
  onEdit,
  onChange,
  T
}) {
  const [history, setHistory] = useState(false);
  const html = memoHtml(memo);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    (async () => {
      for (const id of imgIdsInHtml(html)) {
        try {
          await getImgUrl(id);
        } catch {}
      }
      setReady(true);
    })();
  }, [html]);
  const MC = "#94A3B8";
  const d = new Date(memo.createdAt);
  const dateStr = `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    style: {
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.8)",
      zIndex: 300,
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "center",
      backdropFilter: "blur(6px)"
    },
    onClick: e => e.target === e.currentTarget && onClose(),
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: {
        background: T.surface,
        borderRadius: "24px 24px 0 0",
        width: "100%",
        maxWidth: 560,
        maxHeight: "93vh",
        padding: "20px 20px 36px",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 14,
        animation: "slideUp .3s cubic-bezier(.32,1.1,.58,1) both",
        boxSizing: "border-box",
        WebkitOverflowScrolling: "touch"
      },
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        style: {
          width: 40,
          height: 4,
          background: T.surface2,
          borderRadius: 2,
          margin: "0 auto"
        }
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        },
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
          style: {
            fontSize: 11.5,
            color: T.dim
          },
          children: [dateStr, memo.updatedAt && memo.updatedAt !== memo.createdAt ? " · 수정됨" : ""]
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
          onClick: onClose,
          style: {
            background: T.surface2,
            border: "none",
            borderRadius: "50%",
            width: 30,
            height: 30,
            color: T.muted,
            fontSize: 16,
            cursor: "pointer"
          },
          children: "\u2715"
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("h2", {
        className: "memo-heading",
        children: memoTitle(memo)
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        onClick: async e => {
          if (e.target.closest('a') || window.getSelection?.().toString()) return;
          const li = e.target.closest('ul[data-checked] > li');
          if (!li || !e.currentTarget.contains(li)) return;
          const index = [...e.currentTarget.querySelectorAll('ul[data-checked] > li')].indexOf(li);
          const next = toggleChecklist(html, index);
          await onChange?.({
            ...memo,
            html: next,
            notes: htmlToText(next),
            updatedAt: new Date().toISOString()
          });
        },
        className: "memo-html checklist-interactive",
        style: {
          fontSize: 14.5,
          color: T.text,
          lineHeight: 1.8
        },
        dangerouslySetInnerHTML: {
          __html: ready ? hydrateImgs(html) : html
        }
      }), (memo.history || []).length > 0 && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("button", {
          className: "quiet",
          onClick: () => setHistory(!history),
          children: ["\uC774\uC804 \uB0B4\uC6A9 ", history ? '접기' : '보기']
        }), history && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "history-list",
          children: memo.history.map((h, i) => /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("small", {
              children: new Date(h.savedAt).toLocaleString('ko-KR')
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
              children: h.title || htmlToText(h.html).slice(0, 80)
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
              className: "secondary",
              onClick: () => {
                if (window.confirm('이 내용으로 복원할까요? 현재 내용도 이전 기록에 보관됩니다.')) onChange?.({
                  ...memo,
                  title: h.title || '',
                  html: h.html,
                  notes: htmlToText(h.html),
                  updatedAt: new Date().toISOString()
                }, {
                  forceHistory: true
                });
              },
              children: "\uC774 \uBC84\uC804 \uBCF5\uC6D0"
            })]
          }, i))
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
        onClick: () => onEdit(memo),
        style: {
          padding: "13px",
          borderRadius: 12,
          border: "none",
          background: `linear-gradient(135deg,${MC},#64748B)`,
          color: "#fff",
          fontSize: 14,
          fontWeight: 700,
          cursor: "pointer",
          marginTop: 4
        },
        children: "\u270F\uFE0F \uC218\uC815\uD558\uAE30"
      })]
    })
  });
}
function MemoCard({
  memo,
  onOpen,
  onEdit,
  onPin,
  T
}) {
  const d = new Date(memo.createdAt);
  const dateStr = `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
  const html = memoHtml(memo);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let alive = true;
    (async () => {
      const ids = imgIdsInHtml(html).filter(id => !_urlCache[id]);
      if (!ids.length) {
        setReady(true);
        return;
      }
      for (const id of ids) {
        try {
          await getImgUrl(id);
        } catch {}
      }
      if (alive) setReady(true);
    })();
    return () => {
      alive = false;
    };
  }, [html]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    onClick: () => onOpen(memo),
    className: "gcard",
    style: {
      background: T.cardBg,
      border: `1px solid ${T.border}`,
      borderRadius: 14,
      padding: "14px 16px",
      minWidth: 0,
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
      gap: 8,
      cursor: "pointer"
    },
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("strong", {
      className: "memo-card-title",
      children: [memo.pinned ? "📌 " : "", memoTitle(memo)]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "memo-html memo-clip",
      style: {
        fontSize: 13.5,
        color: T.text,
        lineHeight: 1.7
      },
      dangerouslySetInnerHTML: {
        __html: hydrateImgs(html)
      }
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 2
      },
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
        style: {
          fontSize: 10.5,
          color: T.dim
        },
        children: [dateStr, memo.updatedAt && memo.updatedAt !== memo.createdAt ? " · 수정됨" : ""]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
        className: "quiet",
        "aria-label": memo.pinned ? "고정 해제" : "메모 고정",
        onClick: e => {
          e.stopPropagation();
          onPin?.(memo);
        },
        children: memo.pinned ? "고정 해제" : "고정"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
        onClick: e => {
          e.stopPropagation();
          onEdit(memo);
        },
        style: {
          background: "transparent",
          border: `1px solid ${T.border}`,
          borderRadius: 8,
          color: T.dim2,
          fontSize: 11,
          fontWeight: 600,
          padding: "4px 10px",
          cursor: "pointer"
        },
        children: "\u270F\uFE0F \uC218\uC815"
      })]
    })]
  });
}

// SOURCE: diary.jsx
function DiaryCard({
  entry,
  onOpen,
  onEdit,
  onDelete,
  T
}) {
  const mood = MOODS.find(m => m.label === entry.mood);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    onClick: () => onOpen(entry),
    style: {
      background: `linear-gradient(135deg, rgba(232,162,61,0.07), ${T.cardBg} 70%)`,
      border: `1px solid rgba(232,162,61,0.18)`,
      borderRadius: 16,
      padding: "14px 16px",
      cursor: "pointer",
      display: "flex",
      gap: 12,
      alignItems: "center",
      animation: "fadeUp .25s ease both",
      position: "relative"
    },
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(DiaryThumb, {
      coverId: entry.coverId,
      mood: mood
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: {
        flex: 1,
        minWidth: 0
      },
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 6,
          marginBottom: 3
        },
        children: [entry.coverId && mood && /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          style: {
            fontSize: 18,
            flexShrink: 0
          },
          children: mood.e
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          style: {
            fontFamily: "'Noto Serif KR',serif",
            fontSize: 15,
            fontWeight: 700,
            color: T.text,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap"
          },
          children: entry.title || "무제"
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        style: {
          fontSize: 11,
          color: "#E8A23D",
          fontWeight: 600,
          marginBottom: 4
        },
        children: [fmtDiaryDate(entry.dateKey), mood ? ` · ${mood.label}` : "", entry.weather ? ` · ${(WEATHERS.find(w => w.label === entry.weather) || {}).e || ""}` : ""]
      }), entry.notes && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        style: {
          fontSize: 12,
          color: T.dim2,
          lineHeight: 1.5,
          overflow: "hidden",
          display: "-webkit-box",
          WebkitLineClamp: 1,
          WebkitBoxOrient: "vertical"
        },
        children: entry.notes
      }), Array.isArray(entry.activities) && entry.activities.length > 0 && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        style: {
          display: "flex",
          gap: 5,
          flexWrap: "wrap",
          marginTop: 5,
          overflow: "hidden",
          maxHeight: 22
        },
        children: [entry.activities.slice(0, 3).map(a => /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
          style: {
            fontSize: 10.5,
            fontWeight: 600,
            color: "#E8A23D",
            background: "#E8A23D14",
            padding: "2px 7px",
            borderRadius: 10,
            whiteSpace: "nowrap"
          },
          children: ["# ", a]
        }, a)), entry.activities.length > 3 && /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
          style: {
            fontSize: 10.5,
            color: T.dim2,
            padding: "2px 2px"
          },
          children: ["+", entry.activities.length - 3]
        })]
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      style: {
        flexShrink: 0,
        color: "#E8A23D",
        fontSize: 18,
        opacity: 0.5
      },
      children: "\u203A"
    })]
  });
}
function DiaryModal({
  entry,
  folderId,
  onSave,
  onClose,
  onDelete,
  onImgError,
  pastActivities,
  moments = [],
  folder,
  allItems = [],
  T
}) {
  const [title, setTitle] = useState(entry?.title || "");
  const [values, setValues] = useState(entry?.values || {});
  const [draftReady, setDraftReady] = useState(false),
    [saving, setSaving] = useState(false);
  const done = useRef(false),
    recordId = useRef(entry?.id || uid());
  const draftKey = 'diary:' + (entry?.id || folderId);
  const [mood, setMood] = useState(entry?.mood || "보통");
  const [weather, setWeather] = useState(entry?.weather || "");
  const [activities, setActivities] = useState(entry?.activities || []);
  const [actInput, setActInput] = useState("");
  const [coverId, setCoverId] = useState(entry?.coverId || null);
  const [notes, setNotes] = useState(entry?.notes || "");
  const addAct = kw => {
    const k = (kw || actInput).trim();
    if (!k || activities.includes(k)) return;
    setActivities([...activities, k]);
    setActInput("");
  };
  const lbl = {
    fontSize: 11,
    fontWeight: 600,
    color: T.muted,
    letterSpacing: "0.06em",
    marginBottom: 8,
    display: "block"
  };
  const inp = {
    width: "100%",
    background: T.inputBg,
    border: `1px solid ${T.borderStrong}`,
    borderRadius: 12,
    color: T.text,
    padding: "11px 14px",
    fontSize: 14,
    outline: "none",
    boxSizing: "border-box"
  };
  const [dateKey, setDateKey] = useState(entry?.dateKey || diaryDateKey());
  const todayKey = diaryDateKey();
  useEffect(() => {
    let alive = true;
    draftRead(draftKey).then(d => {
      if (!alive) return;
      if (d && (!entry?.updatedAt || d.updatedAt > entry.updatedAt)) {
        setTitle(d.title || '');
        setNotes(d.notes || '');
        setMood(d.mood || '');
        setWeather(d.weather || '');
        setActivities(d.activities || []);
        setCoverId(d.coverId || null);
        setDateKey(d.dateKey || diaryDateKey());
        setValues(d.values || {});
      }
      setDraftReady(true);
    });
    return () => {
      alive = false;
    };
  }, []);
  const currentDraft = () => ({
    title,
    notes,
    mood,
    weather,
    activities,
    coverId,
    dateKey,
    values,
    updatedAt: new Date().toISOString()
  });
  useEffect(() => {
    if (!draftReady) return;
    const t = setTimeout(() => {
      if (!done.current) draftWrite(draftKey, currentDraft());
    }, 600);
    return () => clearTimeout(t);
  }, [title, notes, mood, weather, activities, coverId, dateKey, values, draftReady]);
  const close = async () => {
    if (!draftReady || (await draftWrite(draftKey, currentDraft())) || window.confirm('초안 저장에 실패했어요. 닫을까요?')) onClose();
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    style: {
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.8)",
      zIndex: 300,
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "center",
      backdropFilter: "blur(6px)"
    },
    onClick: e => e.target === e.currentTarget && close(),
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "sheet-kb",
      style: {
        background: T.surface,
        borderRadius: "24px 24px 0 0",
        width: "100%",
        maxWidth: 560,
        maxHeight: "93vh",
        padding: "20px 20px 36px",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 16,
        animation: "slideUp .3s cubic-bezier(.32,1.1,.58,1) both"
      },
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        style: {
          width: 40,
          height: 4,
          background: T.surface2,
          borderRadius: 2,
          margin: "0 auto"
        }
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        },
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
          style: {
            fontFamily: "'Noto Serif KR',serif",
            fontSize: 18,
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            gap: 8,
            color: T.text
          },
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            style: {
              fontSize: 22
            },
            children: "\uD83D\uDCD4"
          }), entry ? "일기 수정" : "일기 쓰기"]
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
          onClick: close,
          style: {
            background: T.surface2,
            border: "none",
            borderRadius: "50%",
            width: 30,
            height: 30,
            color: T.muted,
            fontSize: 16,
            cursor: "pointer"
          },
          children: "\u2715"
        })]
      }), !entry && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("label", {
          style: lbl,
          children: "\uB0A0\uC9DC"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
          type: "date",
          value: dateKey,
          max: todayKey,
          onChange: e => {
            if (e.target.value) setDateKey(e.target.value);
          },
          style: {
            ...inp,
            width: "100%",
            maxWidth: "100%",
            boxSizing: "border-box",
            WebkitAppearance: "none",
            appearance: "none",
            minWidth: 0,
            cursor: "pointer",
            colorScheme: "dark"
          }
        }), dateKey !== todayKey && /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
          onClick: () => setDateKey(todayKey),
          style: {
            marginTop: 7,
            padding: "7px 12px",
            borderRadius: 9,
            fontSize: 12,
            fontWeight: 700,
            cursor: "pointer",
            border: `1px solid ${T.border}`,
            background: "transparent",
            color: T.dim2
          },
          children: "\uC624\uB298\uB85C"
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        style: {
          fontSize: 13,
          color: "#E8A23D",
          fontWeight: 600
        },
        children: fmtDiaryDate(dateKey)
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        style: {
          fontSize: 11,
          color: T.dim2,
          marginTop: -8,
          lineHeight: 1.5
        },
        children: ["\uD83D\uDCA1 ", dateKey === todayKey ? "새벽 4시 전까지는 전날 일기로 기록돼요 (밤늦게 써도 괜찮아요)" : "지난 날짜의 일기는 기록으로 남지만 🔥 연속 기록엔 포함되지 않아요"]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("label", {
          style: lbl,
          children: "\uC81C\uBAA9"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
          value: title,
          onChange: e => setTitle(e.target.value),
          placeholder: "\uC624\uB298\uC758 \uC81C\uBAA9",
          style: inp
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("label", {
          style: lbl,
          children: "\uC624\uB298\uC758 \uAE30\uBD84"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          style: {
            display: "flex",
            flexWrap: "wrap",
            gap: 8
          },
          children: MOODS.map(m => /*#__PURE__*/(0, _jsxRuntime.jsxs)("button", {
            onClick: () => setMood(m.label),
            style: {
              padding: "8px 10px",
              borderRadius: 12,
              border: `1px solid ${mood === m.label ? "#E8A23D" : T.border}`,
              background: mood === m.label ? "#E8A23D22" : "transparent",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              minWidth: 52
            },
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
              style: {
                fontSize: 22
              },
              children: m.e
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
              style: {
                fontSize: 10,
                color: mood === m.label ? "#E8A23D" : T.dim2,
                fontWeight: 600
              },
              children: m.label
            })]
          }, m.label))
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("label", {
          style: lbl,
          children: ["\uC624\uB298\uC758 \uB0A0\uC528 ", /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            style: {
              color: T.dim,
              fontWeight: 400
            },
            children: "(\uC120\uD0DD)"
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          style: {
            display: "flex",
            flexWrap: "wrap",
            gap: 8
          },
          children: WEATHERS.map(w => /*#__PURE__*/(0, _jsxRuntime.jsxs)("button", {
            onClick: () => setWeather(weather === w.label ? "" : w.label),
            style: {
              padding: "8px 10px",
              borderRadius: 12,
              border: `1px solid ${weather === w.label ? "#60A5FA" : T.border}`,
              background: weather === w.label ? "#60A5FA22" : "transparent",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              minWidth: 52
            },
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
              style: {
                fontSize: 20
              },
              children: w.e
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
              style: {
                fontSize: 10,
                color: weather === w.label ? "#60A5FA" : T.dim2,
                fontWeight: 600
              },
              children: w.label
            })]
          }, w.label))
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("label", {
          style: lbl,
          children: ["\uC624\uB298\uC758 \uD65C\uB3D9 ", /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            style: {
              color: T.dim,
              fontWeight: 400
            },
            children: "(\uC120\uD0DD)"
          })]
        }), activities.length > 0 && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          style: {
            display: "flex",
            flexWrap: "wrap",
            gap: 6,
            marginBottom: 8
          },
          children: activities.map(a => /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
            onClick: () => setActivities(activities.filter(x => x !== a)),
            style: {
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              padding: "6px 10px",
              borderRadius: 20,
              fontSize: 12.5,
              fontWeight: 600,
              background: "#E8A23D1a",
              color: "#E8A23D",
              border: "1px solid #E8A23D33",
              cursor: "pointer"
            },
            children: ["# ", a, " ", /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
              style: {
                fontSize: 14,
                opacity: 0.7
              },
              children: "\xD7"
            })]
          }, a))
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          style: {
            display: "flex",
            gap: 8
          },
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
            value: actInput,
            onChange: e => setActInput(e.target.value),
            onKeyDown: e => {
              if (e.key === "Enter") {
                e.preventDefault();
                addAct();
              }
            },
            placeholder: "\uC6B4\uB3D9, \uCE74\uD398, \uB3C5\uC11C...",
            style: {
              ...inp,
              flex: 1,
              minWidth: 0
            }
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
            onClick: () => addAct(),
            style: {
              flexShrink: 0,
              background: "#E8A23D",
              border: "none",
              borderRadius: 10,
              color: "#fff",
              padding: "0 16px",
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer"
            },
            children: "+"
          })]
        }), pastActivities && pastActivities.filter(a => !activities.includes(a)).length > 0 && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          style: {
            display: "flex",
            flexWrap: "wrap",
            gap: 6,
            marginTop: 8
          },
          children: pastActivities.filter(a => !activities.includes(a)).slice(0, 10).map(a => /*#__PURE__*/(0, _jsxRuntime.jsxs)("button", {
            onClick: () => addAct(a),
            style: {
              padding: "5px 11px",
              borderRadius: 20,
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              border: `1px solid ${T.border}`,
              background: "transparent",
              color: T.dim2
            },
            children: ["# ", a]
          }, a))
        })]
      }), moments.some(m => m.dateKey === dateKey) && /*#__PURE__*/(0, _jsxRuntime.jsxs)("details", {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("summary", {
          children: ["\uC774\uB0A0 \uB0A8\uAE34 \uC21C\uAC04 ", moments.filter(m => m.dateKey === dateKey).length, "\uAC1C \uBCF4\uAE30"]
        }), moments.filter(m => m.dateKey === dateKey).sort((a, b) => (a.occurredAt || '').localeCompare(b.occurredAt || '')).map(m => /*#__PURE__*/(0, _jsxRuntime.jsxs)("p", {
          className: "moment-reference",
          children: [new Date(m.occurredAt).toLocaleTimeString('ko-KR', {
            hour: '2-digit',
            minute: '2-digit'
          }), " \xB7 ", m.mood, " ", m.notes]
        }, m.id))]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("label", {
          style: lbl,
          children: "\uC624\uB298 \uD558\uB8E8"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("textarea", {
          value: notes,
          onChange: e => setNotes(e.target.value),
          placeholder: "\uC624\uB298 \uC788\uC5C8\uB358 \uC77C, \uB290\uB080 \uC810\uC744 \uC790\uC720\uB86D\uAC8C \uC801\uC5B4\uBCF4\uC138\uC694...",
          style: {
            ...inp,
            resize: "vertical",
            minHeight: 280,
            fontSize: 16,
            lineHeight: 1.9,
            padding: "16px 16px"
          }
        })]
      }), folderFields(folder).map(f => /*#__PURE__*/(0, _jsxRuntime.jsx)(FieldInput, {
        field: f,
        value: values[f.id] ?? '',
        onChange: v => setValues({
          ...values,
          [f.id]: v
        }),
        suggestions: fieldSuggestions(allItems, folder, f, String(values[f.id] || '')),
        T: T
      }, f.id)), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("label", {
          style: lbl,
          children: ["\uC624\uB298\uC758 \uC0AC\uC9C4 ", /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            style: {
              color: T.dim,
              fontWeight: 400
            },
            children: "(1\uC7A5, \uC120\uD0DD)"
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          style: {
            width: "45%"
          },
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(CoverUpload, {
            imgId: coverId,
            ratio: "1/1",
            onChange: setCoverId,
            onError: onImgError,
            T: T
          })
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
        disabled: saving || !draftReady,
        onClick: async () => {
          setSaving(true);
          const onTime = entry ? entry.onTime !== false : dateKey === todayKey;
          const ok = await onSave({
            id: recordId.current,
            folderId: entry?.folderId || folderId,
            dateKey,
            onTime,
            title: title.trim(),
            mood,
            weather,
            activities,
            notes,
            coverId,
            values,
            createdAt: entry?.createdAt || new Date().toISOString()
          });
          if (ok !== false) {
            done.current = true;
            await draftDelete(draftKey);
          }
          setSaving(false);
        },
        style: {
          padding: "14px",
          borderRadius: 14,
          border: "none",
          background: "linear-gradient(135deg,#D98324,#F2B765)",
          color: "#fff",
          fontSize: 15,
          fontWeight: 700,
          cursor: "pointer"
        },
        children: entry ? "수정 완료" : "일기 저장"
      }), entry && onDelete && /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
        disabled: saving,
        onClick: async () => {
          done.current = true;
          setSaving(true);
          try {
            if (await onDelete(entry)) await draftDelete(draftKey);else done.current = false;
          } finally {
            setSaving(false);
          }
        },
        style: {
          padding: "12px",
          borderRadius: 12,
          border: `1px solid rgba(248,113,113,0.3)`,
          background: "transparent",
          color: "#F87171",
          fontSize: 13.5,
          fontWeight: 600,
          cursor: "pointer",
          marginTop: 2
        },
        children: "\uD83D\uDDD1\uFE0F \uC774 \uC77C\uAE30 \uC0AD\uC81C"
      })]
    })
  });
}
function DiaryDetail({
  entry,
  onClose,
  onEdit,
  wide,
  T
}) {
  const mood = MOODS.find(m => m.label === entry.mood);
  const maxW = wide ? 720 : 560;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: {
      position: "fixed",
      inset: 0,
      background: T.bg,
      zIndex: 400,
      overflowY: "auto",
      animation: "fadeIn .2s ease",
      maxWidth: maxW,
      margin: "0 auto"
    },
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      style: {
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        maxWidth: maxW,
        margin: "0 auto",
        background: `radial-gradient(circle 600px at 50% 8%, #E8A23D38, #E8A23D12 45%, transparent 70%)`
      }
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: {
        position: "sticky",
        top: 0,
        zIndex: 10,
        background: T.headerBg,
        backdropFilter: "blur(20px)",
        padding: "calc(env(safe-area-inset-top, 0px) + 14px) 20px 14px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: `1px solid ${T.border}`
      },
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
        onClick: onClose,
        style: {
          background: T.inputBg,
          border: `1px solid ${T.border}`,
          borderRadius: 10,
          color: T.muted,
          padding: "8px 14px",
          fontSize: 14,
          cursor: "pointer"
        },
        children: "\u2190 \uB2EB\uAE30"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
        onClick: () => onEdit(entry),
        style: {
          background: T.inputBg,
          border: `1px solid ${T.border}`,
          borderRadius: 10,
          color: T.muted,
          padding: "8px 14px",
          fontSize: 14,
          cursor: "pointer",
          fontWeight: 600
        },
        children: "\u270F\uFE0F \uC218\uC815"
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: {
        padding: wide ? "44px 40px 80px" : "32px 24px 60px",
        position: "relative",
        zIndex: 1,
        display: "flex",
        flexDirection: "column",
        gap: wide ? 26 : 20
      },
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        style: {
          textAlign: "center"
        },
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          style: {
            fontSize: wide ? 80 : 60,
            marginBottom: 14
          },
          children: mood ? mood.e : "📝"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          style: {
            fontFamily: "'Noto Serif KR',serif",
            fontSize: wide ? 32 : 24,
            fontWeight: 700,
            color: T.text,
            marginBottom: 8
          },
          children: entry.title || "무제"
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          style: {
            fontSize: 14,
            color: "#E8A23D",
            fontWeight: 600
          },
          children: [fmtDiaryDate(entry.dateKey), mood ? ` · ${mood.label}` : "", entry.weather ? ` · ${(WEATHERS.find(w => w.label === entry.weather) || {}).e || ""} ${entry.weather}` : ""]
        })]
      }), Array.isArray(entry.activities) && entry.activities.length > 0 && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        style: {
          display: "flex",
          flexWrap: "wrap",
          gap: 7,
          justifyContent: "center"
        },
        children: entry.activities.map(a => /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
          style: {
            padding: "6px 12px",
            borderRadius: 20,
            fontSize: 12.5,
            fontWeight: 600,
            background: "#E8A23D1a",
            color: "#E8A23D",
            border: "1px solid #E8A23D33"
          },
          children: ["# ", a]
        }, a))
      }), entry.coverId && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        style: {
          maxWidth: wide ? 460 : 380,
          width: "100%",
          margin: "0 auto"
        },
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(DiaryPhoto, {
          coverId: entry.coverId
        })
      }), entry.notes && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        style: {
          background: T.cardBg,
          borderRadius: 16,
          border: `1px solid ${T.border}`,
          padding: wide ? "28px 32px" : "20px"
        },
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          style: {
            fontSize: wide ? 17 : 15,
            color: T.text,
            lineHeight: 1.9,
            whiteSpace: "pre-wrap"
          },
          children: entry.notes
        })
      })]
    })]
  });
}
function DiaryPhoto({
  coverId
}) {
  const [url, setUrl] = useState(null);
  useEffect(() => {
    let ok = true;
    getImgUrl(coverId).then(u => {
      if (ok) setUrl(u);
    });
    return () => {
      ok = false;
    };
  }, [coverId]);
  if (!url) return null;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
    src: url,
    style: {
      width: "100%",
      aspectRatio: "1/1",
      objectFit: "cover",
      borderRadius: 16,
      border: "1px solid rgba(232,162,61,0.35)",
      boxShadow: "0 8px 30px rgba(232,162,61,0.22)"
    }
  });
}

// ── 가계부 컴포넌트 ──

// SOURCE: ledger.jsx
const LG = "#5BA873";
// 하위 폴더 카드
function LedgerSubCard({
  sub,
  total,
  onOpen,
  onRename,
  onDelete,
  T
}) {
  const [menu, setMenu] = useState(false);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    onClick: () => onOpen(sub),
    className: "gcard",
    style: {
      background: T.cardBg,
      border: `1px solid ${LG}2a`,
      borderRadius: 16,
      padding: "16px 18px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: 14,
      position: "relative",
      zIndex: menu ? 40 : 1,
      transform: menu ? "translateY(-3px)" : "none",
      boxShadow: menu ? `0 10px 30px ${LG}30` : "none"
    },
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      style: {
        width: 46,
        height: 46,
        borderRadius: 12,
        background: `${LG}18`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 22,
        flexShrink: 0
      },
      children: "\uD83E\uDDFE"
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: {
        flex: 1,
        minWidth: 0
      },
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        style: {
          fontFamily: "'Noto Serif KR',serif",
          fontSize: 16,
          fontWeight: 700,
          color: T.text,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap"
        },
        children: sub.title
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        style: {
          fontSize: 12,
          marginTop: 3,
          display: "flex",
          gap: 10
        },
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
          style: {
            color: "#F87171"
          },
          children: ["\uC9C0\uCD9C ", wonFmt(total.expense)]
        }), total.income > 0 && /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
          style: {
            color: LG
          },
          children: ["\uC218\uC785 ", wonFmt(total.income)]
        })]
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
      onClick: e => {
        e.stopPropagation();
        setMenu(m => !m);
      },
      style: {
        flexShrink: 0,
        width: 28,
        height: 28,
        borderRadius: 8,
        border: "none",
        background: menu ? `${LG}22` : "transparent",
        color: T.muted,
        fontSize: 16,
        cursor: "pointer",
        lineHeight: 1,
        padding: 0
      },
      children: "\u22EF"
    }), menu && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        onClick: e => {
          e.stopPropagation();
          setMenu(false);
        },
        style: {
          position: "fixed",
          inset: 0,
          zIndex: 30
        }
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        style: {
          position: "absolute",
          top: 46,
          right: 14,
          zIndex: 50,
          background: T.surface,
          border: `1px solid ${T.borderStrong}`,
          borderRadius: 12,
          padding: 6,
          boxShadow: "0 8px 28px rgba(0,0,0,0.4)",
          minWidth: 130,
          display: "flex",
          flexDirection: "column",
          gap: 2
        },
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
          onClick: e => {
            e.stopPropagation();
            setMenu(false);
            onRename(sub);
          },
          style: {
            display: "flex",
            alignItems: "center",
            gap: 9,
            background: "transparent",
            border: "none",
            color: T.text,
            padding: "10px 12px",
            fontSize: 13.5,
            fontWeight: 600,
            cursor: "pointer",
            borderRadius: 8,
            textAlign: "left"
          },
          children: "\u270F\uFE0F \uC774\uB984 \uC218\uC815"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
          onClick: e => {
            e.stopPropagation();
            setMenu(false);
            onDelete(sub.id);
          },
          style: {
            display: "flex",
            alignItems: "center",
            gap: 9,
            background: "transparent",
            border: "none",
            color: "#F87171",
            padding: "10px 12px",
            fontSize: 13.5,
            fontWeight: 600,
            cursor: "pointer",
            borderRadius: 8,
            textAlign: "left"
          },
          children: "\uD83D\uDDD1\uFE0F \uC0AD\uC81C"
        })]
      })]
    })]
  });
}

// 가계부 홈: 고정지출 요약 + 하위 폴더 목록
function LedgerHome({
  ledgerFolder,
  subs,
  subTotal,
  fixedExpenses,
  accounts,
  accountBalance,
  onOpenSub,
  onAddSub,
  onDeleteSub,
  onRenameSub,
  onManageFixed,
  onManageAccounts,
  wide,
  T
}) {
  const fixedTotal = fixedExpenses.reduce((s, f) => s + (f.amount || 0), 0);
  const accs = accounts && accounts.length ? accounts : [];
  const [sel, setSel] = useState("_all"); // "_all" 또는 계좌 id
  const selAcc = accs.find(a => a.id === sel);
  const bal = accountBalance(sel === "_all" ? null : sel);
  const accent = sel === "_all" ? LG : selAcc?.color || LG;
  const label = sel === "_all" ? "총 잔액" : selAcc?.name;
  const sub2 = sel === "_all" ? "모든 계좌 합계" : "이 계좌 잔액";
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 14
    },
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: {
        background: `linear-gradient(135deg, ${accent}2b, ${accent}0a 55%, ${T.cardBg})`,
        border: `1px solid ${accent}44`,
        borderRadius: 18,
        padding: wide ? "26px 26px 20px" : "22px 22px 18px",
        transition: "background .4s ease,border-color .4s ease"
      },
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 8
        },
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: 7,
            fontSize: 13,
            fontWeight: 700,
            color: accent
          },
          children: [sel !== "_all" && /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            style: {
              width: 9,
              height: 9,
              borderRadius: "50%",
              background: accent
            }
          }), label]
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
          onClick: onManageAccounts,
          style: {
            background: "rgba(255,255,255,0.07)",
            border: `1px solid ${T.border}`,
            borderRadius: 8,
            color: T.muted,
            padding: "4px 10px",
            fontSize: 11,
            cursor: "pointer"
          },
          children: "\uACC4\uC88C \uAD00\uB9AC"
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        style: {
          fontSize: 11,
          color: T.dim2,
          marginBottom: 4
        },
        children: sub2
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        style: {
          fontFamily: "'Noto Serif KR',serif",
          fontSize: wide ? 40 : 34,
          fontWeight: 700,
          color: bal.balance >= 0 ? T.text : "#F87171",
          letterSpacing: "-0.02em",
          animation: "balPop .35s ease both"
        },
        children: wonFmt(bal.balance)
      }, sel), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        style: {
          display: "flex",
          gap: 16,
          marginTop: 12
        },
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            style: {
              fontSize: 11,
              color: T.dim2
            },
            children: "\uC218\uC785 "
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            style: {
              fontSize: 13,
              fontWeight: 700,
              color: LG
            },
            children: wonFmt(bal.income)
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            style: {
              fontSize: 11,
              color: T.dim2
            },
            children: "\uC9C0\uCD9C "
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            style: {
              fontSize: 13,
              fontWeight: 700,
              color: "#F87171"
            },
            children: wonFmt(bal.expense)
          })]
        })]
      }), accs.length > 0 && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        style: {
          display: "flex",
          gap: 7,
          flexWrap: "wrap",
          marginTop: 18,
          paddingTop: 16,
          borderTop: `1px solid ${T.border}`
        },
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
          onClick: () => setSel("_all"),
          style: {
            padding: "7px 13px",
            borderRadius: 20,
            fontSize: 12.5,
            fontWeight: 700,
            cursor: "pointer",
            border: `1px solid ${sel === "_all" ? LG : T.border}`,
            background: sel === "_all" ? `${LG}22` : "transparent",
            color: sel === "_all" ? LG : T.dim2,
            transition: "all .2s"
          },
          children: "\uC804\uCCB4"
        }), accs.map(a => /*#__PURE__*/(0, _jsxRuntime.jsxs)("button", {
          onClick: () => setSel(a.id),
          style: {
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "7px 13px",
            borderRadius: 20,
            fontSize: 12.5,
            fontWeight: 700,
            cursor: "pointer",
            border: `1px solid ${sel === a.id ? a.color : T.border}`,
            background: sel === a.id ? `${a.color}22` : "transparent",
            color: sel === a.id ? a.color : T.dim2,
            transition: "all .2s"
          },
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            style: {
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: a.color
            }
          }), a.name]
        }, a.id))]
      })]
    }), accs.length === 0 && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      onClick: onManageAccounts,
      style: {
        background: T.cardBg,
        border: `1px dashed ${T.borderStrong}`,
        borderRadius: 12,
        padding: "14px",
        textAlign: "center",
        cursor: "pointer",
        color: T.dim2,
        fontSize: 13
      },
      children: "\uD83D\uDCB3 \uACC4\uC88C\uB97C \uCD94\uAC00\uD558\uBA74 \uACC4\uC88C\uBCC4\uB85C \uB098\uB220\uC11C \uAD00\uB9AC\uD560 \uC218 \uC788\uC5B4\uC694"
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      onClick: onManageFixed,
      style: {
        background: T.cardBg,
        border: `1px solid ${T.border}`,
        borderRadius: 12,
        padding: "12px 16px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: 10
      },
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        style: {
          fontSize: 16
        },
        children: "\uD83D\uDD04"
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        style: {
          flex: 1,
          minWidth: 0
        },
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          style: {
            fontSize: 13,
            fontWeight: 600,
            color: T.text
          },
          children: "\uACE0\uC815 \uC9C0\uCD9C"
        }), " ", /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
          style: {
            fontSize: 12,
            color: T.dim2
          },
          children: [fixedExpenses.length, "\uAC1C \xB7 \uB9E4\uB2EC ", wonFmt(fixedTotal)]
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        style: {
          color: T.dim,
          fontSize: 16
        },
        children: "\u203A"
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 4
      },
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        style: {
          fontSize: 13,
          fontWeight: 700,
          color: T.muted
        },
        children: "\uD83D\uDCC2 \uAC00\uACC4\uBD80 \uBAA9\uB85D"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
        onClick: onAddSub,
        style: {
          background: `${LG}`,
          border: "none",
          borderRadius: 9,
          color: "#fff",
          padding: "7px 14px",
          fontSize: 13,
          fontWeight: 700,
          cursor: "pointer"
        },
        children: "+ \uC0C8 \uAC00\uACC4\uBD80"
      })]
    }), subs.length === 0 ? /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: {
        textAlign: "center",
        padding: "40px 20px",
        color: T.dim
      },
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        style: {
          fontSize: 40,
          marginBottom: 10
        },
        children: "\uD83E\uDDFE"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        style: {
          fontSize: 14,
          color: T.dim2
        },
        children: "\uC544\uC9C1 \uAC00\uACC4\uBD80\uAC00 \uC5C6\uC5B4\uC694"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        style: {
          fontSize: 12,
          marginTop: 6
        },
        children: "\"26\uB144 7\uC6D4 \uAC00\uACC4\uBD80\"\uCC98\uB7FC \uB9CC\uB4E4\uC5B4\uBCF4\uC138\uC694"
      })]
    }) : /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      style: {
        display: wide ? "grid" : "flex",
        gridTemplateColumns: wide ? "repeat(auto-fill,minmax(300px,1fr))" : undefined,
        flexDirection: wide ? undefined : "column",
        gap: 12
      },
      children: subs.map(sub => /*#__PURE__*/(0, _jsxRuntime.jsx)(LedgerSubCard, {
        sub: sub,
        total: subTotal(sub.id),
        onOpen: onOpenSub,
        onRename: onRenameSub,
        onDelete: onDeleteSub,
        T: T
      }, sub.id))
    })]
  });
}

// 하위 폴더 안: 합계 + 거래 목록
// 달력 셀용 압축 금액 (좁은 칸에 맞게)
function compactWon(n) {
  if (n >= 100000) return Math.round(n / 10000) + "만";
  if (n >= 10000) return Math.round(n / 1000) / 10 + "만";
  return n.toLocaleString("ko-KR");
}

// 공용 달력 그리드
function CalendarView({
  year,
  month,
  cellContent,
  onPickDay,
  pickedDay,
  accent,
  T
}) {
  const first = new Date(year, month, 1);
  const startDow = first.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < startDow; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  const p = n => String(n).padStart(2, "0");
  const nd = new Date();
  const todayKey = `${nd.getFullYear()}-${p(nd.getMonth() + 1)}-${p(nd.getDate())}`;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(7,1fr)",
        gap: 2,
        marginBottom: 4
      },
      children: ["일", "월", "화", "수", "목", "금", "토"].map((d, i) => /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        style: {
          textAlign: "center",
          fontSize: 10.5,
          fontWeight: 700,
          color: i === 0 ? "#F87171" : i === 6 ? "#60A5FA" : T.dim2,
          padding: "4px 0"
        },
        children: d
      }, d))
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(7,1fr)",
        gap: 2
      },
      children: cells.map((d, idx) => {
        if (d === null) return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {}, "x" + idx);
        const key = `${year}-${p(month + 1)}-${p(d)}`;
        const content = cellContent ? cellContent(key) : null;
        const isToday = key === todayKey;
        const isPicked = pickedDay === key;
        return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          onClick: () => onPickDay && onPickDay(key),
          style: {
            minHeight: 50,
            borderRadius: 9,
            padding: "4px 1px",
            cursor: onPickDay ? "pointer" : "default",
            background: isPicked ? `${accent}22` : isToday ? `${accent}10` : "transparent",
            border: isPicked ? `1px solid ${accent}` : isToday ? `1px solid ${accent}44` : "1px solid transparent",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            overflow: "hidden"
          },
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            style: {
              fontSize: 11,
              fontWeight: isToday ? 800 : 600,
              color: isToday ? accent : T.dim2,
              lineHeight: 1
            },
            children: d
          }), content]
        }, key);
      })
    })]
  });
}

// 일기 달력: 일기 쓴 날에 기분 이모지, 누르면 그 일기 열기
function DiaryCalendar({
  entries,
  onOpen,
  T
}) {
  const latest = entries.map(e => e.dateKey).filter(Boolean).sort().pop();
  const nd = new Date();
  const [y, setY] = useState(latest ? +latest.slice(0, 4) : nd.getFullYear());
  const [m, setM] = useState(latest ? +latest.slice(5, 7) - 1 : nd.getMonth());
  const byDate = {};
  entries.forEach(e => {
    byDate[e.dateKey] = e;
  });
  const navB = {
    background: T.inputBg,
    border: `1px solid ${T.border}`,
    borderRadius: 8,
    color: T.muted,
    width: 30,
    height: 30,
    fontSize: 12,
    cursor: "pointer"
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: {
      background: T.cardBg,
      border: `1px solid ${T.border}`,
      borderRadius: 16,
      padding: "14px 10px"
    },
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 14,
        marginBottom: 10
      },
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
        onClick: () => {
          if (m === 0) {
            setY(y - 1);
            setM(11);
          } else setM(m - 1);
        },
        style: navB,
        children: "\u25C0"
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
        style: {
          fontFamily: "'Noto Serif KR',serif",
          fontSize: 15,
          fontWeight: 700,
          color: T.text,
          minWidth: 96,
          textAlign: "center"
        },
        children: [y, "\uB144 ", m + 1, "\uC6D4"]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
        onClick: () => {
          if (m === 11) {
            setY(y + 1);
            setM(0);
          } else setM(m + 1);
        },
        style: navB,
        children: "\u25B6"
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(CalendarView, {
      year: y,
      month: m,
      accent: "#E8A23D",
      T: T,
      onPickDay: key => {
        const e = byDate[key];
        if (e) onOpen(e);
      },
      cellContent: key => {
        const e = byDate[key];
        if (!e) return null;
        const mood = MOODS.find(mm => mm.label === e.mood);
        return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          style: {
            fontSize: 15,
            lineHeight: 1.1
          },
          children: mood ? mood.e : "📔"
        });
      }
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      style: {
        fontSize: 10.5,
        color: T.dim,
        textAlign: "center",
        marginTop: 8
      },
      children: "\uC77C\uAE30 \uC4F4 \uB0A0\uC744 \uB204\uB974\uBA74 \uC5F4\uB824\uC694"
    })]
  });
}
function LedgerSubView({
  sub,
  entries,
  accounts,
  customCats,
  balanceMap,
  onClose,
  onAddEntry,
  onEditEntry,
  onDeleteEntry,
  onManageBudget,
  onOpenStats,
  wide,
  T
}) {
  const [q, setQ] = useState("");
  const _latestD = entries.map(e => e.lDate).filter(Boolean).sort().pop();
  const _nd = new Date();
  const [calMode, setCalMode] = useState(false);
  const [calY, setCalY] = useState(_latestD ? +_latestD.slice(0, 4) : _nd.getFullYear());
  const [calM, setCalM] = useState(_latestD ? +_latestD.slice(5, 7) - 1 : _nd.getMonth());
  const [calDay, setCalDay] = useState(null);
  const income = entries.filter(e => !e.isPlanned && e.lType === "income").reduce((s, e) => s + (e.amount || 0), 0);
  const expense = entries.filter(e => !e.isPlanned && e.lType === "expense").reduce((s, e) => s + (e.amount || 0), 0);
  const accName = id => (accounts || []).find(a => a.id === id)?.name || "";
  const budgets = sub.budgets || {};
  // 카테고리별 지출 (예산 비교용)
  const catSpend = {};
  entries.filter(e => !e.isPlanned && e.lType === "expense").forEach(e => {
    catSpend[e.lCat] = (catSpend[e.lCat] || 0) + (e.amount || 0);
  });
  const budgetRows = Object.keys(budgets).filter(k => budgets[k] > 0).map(k => ({
    k,
    cat: ledgerCat("expense", k, customCats),
    budget: budgets[k],
    spent: catSpend[k] || 0
  }));
  const ql = q.trim().toLowerCase();
  const filtered = entries.filter(e => {
    if (!ql) return true;
    const cat = e.lType === "transfer" ? {
      label: "이체"
    } : ledgerCat(e.lType, e.lCat, customCats);
    return [e.memo, cat.label, e.lDate].join(" ").toLowerCase().includes(ql);
  });
  const sorted = [...filtered].sort((a, b) => (b.lDate || "").localeCompare(a.lDate || ""));
  const shown = calMode && calDay ? sorted.filter(e => e.lDate === calDay) : sorted;
  const maxW = wide ? 760 : 520;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: {
      position: "fixed",
      inset: 0,
      background: T.bg,
      zIndex: 400,
      overflowY: "auto",
      animation: "fadeIn .2s ease",
      maxWidth: maxW,
      margin: "0 auto"
    },
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      style: {
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        maxWidth: maxW,
        margin: "0 auto",
        background: `radial-gradient(circle 600px at 50% 8%, ${LG}22, ${LG}08 45%, transparent 70%)`
      }
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: {
        position: "sticky",
        top: 0,
        zIndex: 10,
        background: T.headerBg,
        backdropFilter: "blur(20px)",
        padding: "calc(env(safe-area-inset-top, 0px) + 14px) 20px 14px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: `1px solid ${T.border}`
      },
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
        onClick: onClose,
        style: {
          background: T.inputBg,
          border: `1px solid ${T.border}`,
          borderRadius: 10,
          color: T.muted,
          padding: "8px 14px",
          fontSize: 14,
          cursor: "pointer"
        },
        children: "\u2190 \uB2EB\uAE30"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        style: {
          fontFamily: "'Noto Serif KR',serif",
          fontSize: 16,
          fontWeight: 700,
          color: T.text,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          maxWidth: "45%"
        },
        children: sub.title
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
        onClick: onAddEntry,
        style: {
          background: LG,
          border: "none",
          borderRadius: 10,
          color: "#fff",
          padding: "8px 14px",
          fontSize: 14,
          fontWeight: 700,
          cursor: "pointer"
        },
        children: "+ \uAE30\uB85D"
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: {
        padding: wide ? "28px 32px 80px" : "20px 18px 60px",
        position: "relative",
        zIndex: 1
      },
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
        className: "hint",
        style: {
          marginBottom: 10
        },
        children: "\uD569\uACC4\uC640 \uC608\uC0B0\uC740 \uD655\uC815\uB41C \uAC70\uB798 \uAE30\uC900\uC785\uB2C8\uB2E4. \uC608\uC815 \uAC70\uB798\uB294 \uC218\uC815 \uD654\uBA74\uC5D0\uC11C \uD655\uC815\uD560 \uC218 \uC788\uC5B4\uC694."
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        style: {
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 10,
          marginBottom: 14
        },
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          style: {
            background: T.cardBg,
            borderRadius: 14,
            border: `1px solid ${T.border}`,
            padding: "14px"
          },
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            style: {
              fontSize: 11,
              color: T.dim2
            },
            children: "\uC218\uC785"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            style: {
              fontSize: 16,
              fontWeight: 700,
              color: LG,
              fontFamily: "'Noto Serif KR',serif",
              marginTop: 3
            },
            children: wonFmt(income)
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          style: {
            background: T.cardBg,
            borderRadius: 14,
            border: `1px solid ${T.border}`,
            padding: "14px"
          },
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            style: {
              fontSize: 11,
              color: T.dim2
            },
            children: "\uC9C0\uCD9C"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            style: {
              fontSize: 16,
              fontWeight: 700,
              color: "#F87171",
              fontFamily: "'Noto Serif KR',serif",
              marginTop: 3
            },
            children: wonFmt(expense)
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          style: {
            background: T.cardBg,
            borderRadius: 14,
            border: `1px solid ${T.border}`,
            padding: "14px"
          },
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            style: {
              fontSize: 11,
              color: T.dim2
            },
            children: "\uB0A8\uC740 \uB3C8"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            style: {
              fontSize: 16,
              fontWeight: 700,
              color: income - expense >= 0 ? T.text : "#F87171",
              fontFamily: "'Noto Serif KR',serif",
              marginTop: 3
            },
            children: wonFmt(income - expense)
          })]
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        style: {
          display: "flex",
          gap: 8,
          marginBottom: 14
        },
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
          onClick: onOpenStats,
          style: {
            flex: 1,
            background: T.cardBg,
            border: `1px solid ${T.border}`,
            borderRadius: 10,
            color: T.muted,
            padding: "9px",
            fontSize: 12.5,
            fontWeight: 600,
            cursor: "pointer"
          },
          children: "\uD83D\uDCCA \uD1B5\uACC4"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
          onClick: onManageBudget,
          style: {
            flex: 1,
            background: T.cardBg,
            border: `1px solid ${T.border}`,
            borderRadius: 10,
            color: T.muted,
            padding: "9px",
            fontSize: 12.5,
            fontWeight: 600,
            cursor: "pointer"
          },
          children: "\uD83C\uDFAF \uC608\uC0B0"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
          onClick: () => {
            setCalMode(c => !c);
            setCalDay(null);
          },
          style: {
            flex: 1,
            background: calMode ? `${LG}18` : T.cardBg,
            border: `1px solid ${calMode ? LG : T.border}`,
            borderRadius: 10,
            color: calMode ? LG : T.muted,
            padding: "9px",
            fontSize: 12.5,
            fontWeight: 600,
            cursor: "pointer"
          },
          children: "\uD83D\uDCC5 \uB2EC\uB825"
        })]
      }), calMode && (() => {
        const daySum = {};
        entries.filter(e => !e.isPlanned && e.lDate).forEach(e => {
          if (!daySum[e.lDate]) daySum[e.lDate] = {
            inc: 0,
            exp: 0
          };
          if (e.lType === "income") daySum[e.lDate].inc += e.amount || 0;else if (e.lType === "expense") daySum[e.lDate].exp += e.amount || 0;
        });
        const navB = {
          background: T.inputBg,
          border: `1px solid ${T.border}`,
          borderRadius: 8,
          color: T.muted,
          width: 30,
          height: 30,
          fontSize: 12,
          cursor: "pointer"
        };
        return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          style: {
            background: T.cardBg,
            border: `1px solid ${T.border}`,
            borderRadius: 16,
            padding: "14px 10px",
            marginBottom: 14
          },
          children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 14,
              marginBottom: 10
            },
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
              onClick: () => {
                if (calM === 0) {
                  setCalY(calY - 1);
                  setCalM(11);
                } else setCalM(calM - 1);
                setCalDay(null);
              },
              style: navB,
              children: "\u25C0"
            }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
              style: {
                fontFamily: "'Noto Serif KR',serif",
                fontSize: 15,
                fontWeight: 700,
                color: T.text,
                minWidth: 96,
                textAlign: "center"
              },
              children: [calY, "\uB144 ", calM + 1, "\uC6D4"]
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
              onClick: () => {
                if (calM === 11) {
                  setCalY(calY + 1);
                  setCalM(0);
                } else setCalM(calM + 1);
                setCalDay(null);
              },
              style: navB,
              children: "\u25B6"
            })]
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(CalendarView, {
            year: calY,
            month: calM,
            accent: LG,
            T: T,
            pickedDay: calDay,
            onPickDay: key => setCalDay(calDay === key ? null : key),
            cellContent: key => {
              const s = daySum[key];
              if (!s) return null;
              return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
                style: {
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 1,
                  lineHeight: 1
                },
                children: [s.inc > 0 && /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
                  style: {
                    fontSize: 8.5,
                    fontWeight: 700,
                    color: LG
                  },
                  children: ["+", compactWon(s.inc)]
                }), s.exp > 0 && /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
                  style: {
                    fontSize: 8.5,
                    fontWeight: 700,
                    color: "#F87171"
                  },
                  children: ["-", compactWon(s.exp)]
                })]
              });
            }
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            style: {
              fontSize: 10.5,
              color: T.dim,
              textAlign: "center",
              marginTop: 8
            },
            children: calDay ? "한 번 더 누르면 전체 기록으로 돌아가요" : "날짜를 누르면 그날 기록만 볼 수 있어요"
          })]
        });
      })(), budgetRows.length > 0 && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        style: {
          background: T.cardBg,
          border: `1px solid ${T.border}`,
          borderRadius: 14,
          padding: "14px 16px",
          marginBottom: 14,
          display: "flex",
          flexDirection: "column",
          gap: 11
        },
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          style: {
            fontSize: 12,
            fontWeight: 700,
            color: T.muted
          },
          children: "\uD83C\uDFAF \uC608\uC0B0"
        }), budgetRows.map(r => {
          const pct = Math.min(r.spent / r.budget * 100, 100);
          const over = r.spent > r.budget;
          return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
              style: {
                display: "flex",
                justifyContent: "space-between",
                fontSize: 12,
                marginBottom: 4
              },
              children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
                style: {
                  color: T.text
                },
                children: [r.cat.emoji, " ", r.cat.label]
              }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
                style: {
                  color: over ? "#F87171" : T.dim2
                },
                children: [wonFmt(r.spent), " / ", wonFmt(r.budget)]
              })]
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
              style: {
                height: 7,
                background: T.inputBg,
                borderRadius: 4,
                overflow: "hidden"
              },
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
                style: {
                  width: `${pct}%`,
                  height: "100%",
                  background: over ? "#F87171" : LG,
                  borderRadius: 4,
                  transition: "width .4s"
                }
              })
            }), over && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
              style: {
                fontSize: 10.5,
                color: "#F87171",
                marginTop: 3
              },
              children: ["\uC608\uC0B0 ", wonFmt(r.spent - r.budget), " \uCD08\uACFC"]
            })]
          }, r.k);
        })]
      }), entries.length > 0 && /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
        value: q,
        onChange: e => setQ(e.target.value),
        placeholder: "\uD83D\uDD0D \uBA54\uBAA8, \uCE74\uD14C\uACE0\uB9AC \uAC80\uC0C9...",
        style: {
          width: "100%",
          background: T.inputBg,
          border: `1px solid ${T.border}`,
          borderRadius: 12,
          color: T.text,
          padding: "11px 14px",
          fontSize: 14,
          outline: "none",
          boxSizing: "border-box",
          marginBottom: 14
        }
      }), shown.length === 0 ? /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        style: {
          textAlign: "center",
          padding: "50px 20px",
          color: T.dim
        },
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          style: {
            fontSize: 40,
            marginBottom: 10
          },
          children: q ? "🔍" : calDay ? "📅" : "💸"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          style: {
            fontSize: 14,
            color: T.dim2
          },
          children: q ? "검색 결과가 없어요" : calDay ? "이 날엔 기록이 없어요" : "아직 기록이 없어요"
        }), !q && !calDay && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          style: {
            fontSize: 12,
            marginTop: 6
          },
          children: "+ \uAE30\uB85D \uBC84\uD2BC\uC73C\uB85C \uCD94\uAC00\uD574\uBCF4\uC138\uC694"
        })]
      }) : /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        style: {
          display: "flex",
          flexDirection: "column",
          gap: 8
        },
        children: shown.map(e => {
          if (e.lType === "transfer") {
            return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
              onClick: () => onEditEntry(e),
              style: {
                background: T.cardBg,
                border: `1px solid ${T.border}`,
                borderRadius: 12,
                padding: "12px 14px",
                display: "flex",
                alignItems: "center",
                gap: 12,
                cursor: "pointer"
              },
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
                style: {
                  width: 38,
                  height: 38,
                  borderRadius: 10,
                  background: "rgba(59,130,246,0.13)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                  flexShrink: 0
                },
                children: "\uD83D\uDD04"
              }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
                style: {
                  flex: 1,
                  minWidth: 0
                },
                children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
                  style: {
                    fontSize: 14,
                    fontWeight: 600,
                    color: T.text,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap"
                  },
                  children: e.memo || "이체"
                }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
                  style: {
                    fontSize: 11,
                    color: T.dim2,
                    marginTop: 2
                  },
                  children: [accName(e.fromAccount), " \u2192 ", accName(e.toAccount), " \xB7 ", e.lDate || ""]
                })]
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
                style: {
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#3B82F6",
                  flexShrink: 0,
                  fontFamily: "'Noto Serif KR',serif"
                },
                children: wonFmt(e.amount)
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
                onClick: ev => {
                  ev.stopPropagation();
                  onDeleteEntry(e.id);
                },
                style: {
                  flexShrink: 0,
                  width: 26,
                  height: 26,
                  borderRadius: 7,
                  border: "none",
                  background: "rgba(190,30,30,0.1)",
                  color: "#F87171",
                  fontSize: 11,
                  cursor: "pointer"
                },
                children: "\u2715"
              })]
            }, e.id);
          }
          const cat = ledgerCat(e.lType, e.lCat, customCats);
          const isInc = e.lType === "income";
          return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            onClick: () => onEditEntry(e),
            style: {
              background: T.cardBg,
              border: e.isPlanned ? `1px dashed ${T.borderStrong}` : `1px solid ${T.border}`,
              borderRadius: 12,
              padding: "12px 14px",
              display: "flex",
              alignItems: "center",
              gap: 12,
              cursor: "pointer",
              opacity: e.isPlanned ? 0.6 : 1
            },
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
              style: {
                width: 38,
                height: 38,
                borderRadius: 10,
                background: isInc ? `${LG}18` : "rgba(248,113,113,0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
                flexShrink: 0
              },
              children: e.isFixed ? "🔄" : cat.emoji
            }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
              style: {
                flex: 1,
                minWidth: 0
              },
              children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
                style: {
                  fontSize: 14,
                  fontWeight: 600,
                  color: T.text,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap"
                },
                children: [e.memo || cat.label, e.isPlanned && /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
                  style: {
                    fontSize: 10,
                    fontWeight: 700,
                    color: "#60A5FA",
                    marginLeft: 6,
                    background: "#60A5FA1a",
                    padding: "1px 6px",
                    borderRadius: 6
                  },
                  children: "\uC608\uC815"
                })]
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
                style: {
                  fontSize: 11,
                  color: T.dim2,
                  marginTop: 2
                },
                children: e.isPlanned ? `${e.lDate}에 ${isInc ? "들어올" : "빠져나갈"} 예정이에요` : `${cat.label}${e.account ? ` · ${accName(e.account)}` : ""} · ${e.lDate || ""}`
              }), !e.isPlanned && balanceMap && balanceMap[e.id] != null && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
                style: {
                  fontSize: 10.5,
                  color: T.dim,
                  marginTop: 2,
                  fontWeight: 600
                },
                children: ["\uC794\uC561 ", wonFmt(balanceMap[e.id])]
              })]
            }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
              style: {
                fontSize: 15,
                fontWeight: 700,
                color: isInc ? LG : "#F87171",
                flexShrink: 0,
                fontFamily: "'Noto Serif KR',serif"
              },
              children: [isInc ? "+" : "-", wonFmt(e.amount)]
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
              onClick: ev => {
                ev.stopPropagation();
                onDeleteEntry(e.id);
              },
              style: {
                flexShrink: 0,
                width: 26,
                height: 26,
                borderRadius: 7,
                border: "none",
                background: "rgba(190,30,30,0.1)",
                color: "#F87171",
                fontSize: 11,
                cursor: "pointer"
              },
              children: "\u2715"
            })]
          }, e.id);
        })
      })]
    })]
  });
}

// 거래 입력 모달
function LedgerEntryModal({
  entry,
  subId,
  accounts,
  customCats,
  onManageCats,
  onSave,
  onClose,
  T
}) {
  const recordId = useRef(entry?.id || uid());
  const [planned, setPlanned] = useState(!!entry?.isPlanned);
  const [lType, setLType] = useState(entry?.lType || "expense");
  const [lCat, setLCat] = useState(entry?.lCat || "food");
  const [amount, setAmount] = useState(entry?.amount ? String(entry.amount) : "");
  const [memo, setMemo] = useState(entry?.memo || "");
  const [lDate, setLDate] = useState(entry?.lDate || localDateKey());
  const accs = accounts && accounts.length ? accounts : [];
  const [account, setAccount] = useState(entry?.account || (accs[0] ? accs[0].id : null));
  const [fromAccount, setFromAccount] = useState(entry?.fromAccount || (accs[0] ? accs[0].id : null));
  const [toAccount, setToAccount] = useState(entry?.toAccount || (accs[1] ? accs[1].id : accs[0] ? accs[0].id : null));
  const cats = lType === "transfer" ? [] : getCats(lType, customCats);
  useEffect(() => {
    if (lType !== "transfer" && !cats.find(c => c.k === lCat)) setLCat(cats[0]?.k);
  }, [lType]);
  const lbl = {
    fontSize: 11,
    fontWeight: 600,
    color: T.muted,
    letterSpacing: "0.06em",
    marginBottom: 8,
    display: "block"
  };
  const inp = {
    width: "100%",
    background: T.inputBg,
    border: `1px solid ${T.borderStrong}`,
    borderRadius: 12,
    color: T.text,
    padding: "12px 14px",
    fontSize: 15,
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "'Noto Sans KR',sans-serif"
  };
  const canTransfer = accs.length >= 2;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    style: {
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.8)",
      zIndex: 500,
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "center",
      backdropFilter: "blur(6px)"
    },
    onClick: e => e.target === e.currentTarget && onClose(),
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "sheet-kb",
      style: {
        background: T.surface,
        borderRadius: "24px 24px 0 0",
        width: "100%",
        maxWidth: 520,
        maxHeight: "93vh",
        padding: "20px 20px 36px",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 16,
        animation: "slideUp .3s cubic-bezier(.32,1.1,.58,1) both"
      },
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        style: {
          width: 40,
          height: 4,
          background: T.surface2,
          borderRadius: 2,
          margin: "0 auto"
        }
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        },
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
          style: {
            fontFamily: "'Noto Serif KR',serif",
            fontSize: 18,
            fontWeight: 700,
            color: T.text
          },
          children: ["\uD83D\uDCB0 ", entry ? "기록 수정" : "새 기록"]
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
          onClick: onClose,
          style: {
            background: T.surface2,
            border: "none",
            borderRadius: "50%",
            width: 30,
            height: 30,
            color: T.muted,
            fontSize: 16,
            cursor: "pointer"
          },
          children: "\u2715"
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        style: {
          display: "flex",
          gap: 8
        },
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
          onClick: () => setLType("expense"),
          style: {
            flex: 1,
            padding: "12px",
            borderRadius: 12,
            fontSize: 14,
            fontWeight: 700,
            cursor: "pointer",
            border: `1px solid ${lType === "expense" ? "#F87171" : T.border}`,
            background: lType === "expense" ? "rgba(248,113,113,0.15)" : "transparent",
            color: lType === "expense" ? "#F87171" : T.dim2
          },
          children: "\uC9C0\uCD9C"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
          onClick: () => setLType("income"),
          style: {
            flex: 1,
            padding: "12px",
            borderRadius: 12,
            fontSize: 14,
            fontWeight: 700,
            cursor: "pointer",
            border: `1px solid ${lType === "income" ? LG : T.border}`,
            background: lType === "income" ? `${LG}22` : "transparent",
            color: lType === "income" ? LG : T.dim2
          },
          children: "\uC218\uC785"
        }), canTransfer && /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
          onClick: () => setLType("transfer"),
          style: {
            flex: 1,
            padding: "12px",
            borderRadius: 12,
            fontSize: 14,
            fontWeight: 700,
            cursor: "pointer",
            border: `1px solid ${lType === "transfer" ? "#3B82F6" : T.border}`,
            background: lType === "transfer" ? "rgba(59,130,246,0.15)" : "transparent",
            color: lType === "transfer" ? "#3B82F6" : T.dim2
          },
          children: "\uC774\uCCB4"
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("label", {
          style: lbl,
          children: "\uAE08\uC561"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
          value: commaFmt(amount),
          onChange: e => setAmount(e.target.value.replace(/[^0-9]/g, "")),
          inputMode: "numeric",
          placeholder: "0",
          style: {
            ...inp,
            fontSize: 20,
            fontWeight: 700,
            textAlign: "right"
          }
        }), amount && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          style: {
            textAlign: "right",
            fontSize: 12,
            color: T.dim2,
            marginTop: 4
          },
          children: wonFmt(Number(amount))
        })]
      }), lType === "transfer" ? /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        style: {
          display: "flex",
          gap: 8,
          alignItems: "flex-end"
        },
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          style: {
            flex: 1
          },
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("label", {
            style: lbl,
            children: "\uBCF4\uB0B4\uB294 \uACC4\uC88C"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("select", {
            value: fromAccount,
            onChange: e => setFromAccount(e.target.value),
            style: {
              ...inp,
              cursor: "pointer"
            },
            children: accs.map(a => /*#__PURE__*/(0, _jsxRuntime.jsx)("option", {
              value: a.id,
              children: a.name
            }, a.id))
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          style: {
            paddingBottom: 12,
            color: "#3B82F6",
            fontSize: 18
          },
          children: "\u2192"
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          style: {
            flex: 1
          },
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("label", {
            style: lbl,
            children: "\uBC1B\uB294 \uACC4\uC88C"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("select", {
            value: toAccount,
            onChange: e => setToAccount(e.target.value),
            style: {
              ...inp,
              cursor: "pointer"
            },
            children: accs.map(a => /*#__PURE__*/(0, _jsxRuntime.jsx)("option", {
              value: a.id,
              children: a.name
            }, a.id))
          })]
        })]
      }) : /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [accs.length > 0 && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("label", {
            style: lbl,
            children: "\uACC4\uC88C"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            style: {
              display: "flex",
              flexWrap: "wrap",
              gap: 8
            },
            children: accs.map(a => /*#__PURE__*/(0, _jsxRuntime.jsxs)("button", {
              onClick: () => setAccount(a.id),
              style: {
                padding: "8px 14px",
                borderRadius: 10,
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                border: `1px solid ${account === a.id ? a.color : T.border}`,
                background: account === a.id ? `${a.color}1f` : "transparent",
                color: account === a.id ? a.color : T.dim2
              },
              children: ["\uD83D\uDCB3 ", a.name]
            }, a.id))
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            style: {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 8
            },
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("label", {
              style: {
                ...lbl,
                marginBottom: 0
              },
              children: "\uCE74\uD14C\uACE0\uB9AC"
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
              onClick: onManageCats,
              style: {
                background: T.inputBg,
                border: `1px solid ${T.border}`,
                borderRadius: 7,
                color: T.muted,
                padding: "3px 9px",
                fontSize: 11,
                cursor: "pointer"
              },
              children: "+ \uD3B8\uC9D1"
            })]
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            style: {
              display: "flex",
              flexWrap: "wrap",
              gap: 8
            },
            children: cats.map(c => /*#__PURE__*/(0, _jsxRuntime.jsxs)("button", {
              onClick: () => setLCat(c.k),
              style: {
                padding: "8px 12px",
                borderRadius: 10,
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                border: `1px solid ${lCat === c.k ? LG : T.border}`,
                background: lCat === c.k ? `${LG}1a` : "transparent",
                color: lCat === c.k ? LG : T.dim2
              },
              children: [c.emoji, " ", c.label]
            }, c.k))
          })]
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("label", {
          style: lbl,
          children: "\uB0A0\uC9DC"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
          type: "date",
          value: lDate,
          onChange: e => setLDate(e.target.value),
          style: {
            ...inp,
            cursor: "pointer",
            width: "100%",
            maxWidth: "100%",
            boxSizing: "border-box",
            WebkitAppearance: "none",
            appearance: "none",
            minWidth: 0
          }
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("label", {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
          type: "checkbox",
          checked: planned,
          onChange: e => setPlanned(e.target.checked)
        }), " \uC608\uC815 \uAC70\uB798 \xB7 \uD574\uC81C\uD558\uBA74 \uC794\uC561\uC5D0 \uBC18\uC601"]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("label", {
          style: lbl,
          children: ["\uBA54\uBAA8 ", /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            style: {
              color: T.dim,
              fontWeight: 400
            },
            children: "(\uC120\uD0DD)"
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
          value: memo,
          onChange: e => setMemo(e.target.value),
          placeholder: lType === "transfer" ? "예: 비상금 이체" : "예: 점심 김밥",
          style: inp
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
        onClick: () => {
          if (!Number.isFinite(Number(amount)) || Number(amount) <= 0 || !lDate) return;
          if (lType === "transfer") {
            if (fromAccount === toAccount) return;
            onSave({
              id: recordId.current,
              ledgerSubId: entry?.ledgerSubId || subId,
              _kind: "ledgerEntry",
              lType: "transfer",
              fromAccount,
              toAccount,
              isPlanned: planned,
              amount: Number(amount),
              memo: memo.trim(),
              lDate,
              createdAt: entry?.createdAt || new Date().toISOString()
            });
          } else onSave({
            id: recordId.current,
            ledgerSubId: entry?.ledgerSubId || subId,
            _kind: "ledgerEntry",
            lType,
            lCat,
            account,
            amount: Number(amount),
            memo: memo.trim(),
            lDate,
            isFixed: entry?.isFixed || false,
            isPlanned: planned,
            createdAt: entry?.createdAt || new Date().toISOString()
          });
        },
        style: {
          padding: "14px",
          borderRadius: 14,
          border: "none",
          background: lType === "transfer" ? "linear-gradient(135deg,#3B82F6,#2563EB)" : `linear-gradient(135deg,${LG},#4A8C60)`,
          color: "#fff",
          fontSize: 15,
          fontWeight: 700,
          cursor: "pointer"
        },
        children: entry ? "수정 완료" : "저장하기"
      })]
    })
  });
}

// 고정 지출 관리 모달
function FixedExpenseModal({
  fixedExpenses,
  onSave,
  onClose,
  showToast,
  T
}) {
  const [list, setList] = useState(fixedExpenses || []);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [kind, setKind] = useState("expense");
  const [cycleType, setCycleType] = useState("monthly");
  const [monthDay, setMonthDay] = useState("25");
  const [weekday, setWeekday] = useState(1);
  const WD = ["일", "월", "화", "수", "목", "금", "토"];
  const inp = {
    background: T.inputBg,
    border: `1px solid ${T.borderStrong}`,
    borderRadius: 10,
    color: T.text,
    padding: "11px 12px",
    fontSize: 14,
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "'Noto Sans KR',sans-serif"
  };
  const cycleLabel = c => {
    if (!c) return "";
    if (c.type === "monthly") return `매달 ${c.day}일`;
    if (c.type === "weekly") return `매주 ${WD[c.weekday]}요일`;
    if (c.type === "biweekly") return `격주 ${WD[c.weekday]}요일`;
    return "";
  };
  const add = () => {
    if (!name.trim()) {
      showToast && showToast("이름을 입력해주세요");
      return;
    }
    if (!amount || Number(amount) <= 0) {
      showToast && showToast("금액을 입력해주세요");
      return;
    }
    const cycle = cycleType === "monthly" ? {
      type: "monthly",
      day: Math.min(Math.max(Number(monthDay) || 1, 1), 31)
    } : {
      type: cycleType,
      weekday,
      anchorDate: localDateKey()
    };
    const next = [...list, {
      id: uid(),
      name: name.trim(),
      amount: Number(amount),
      kind,
      cycle
    }];
    setList(next);
    onSave(next, true);
    setName("");
    setAmount("");
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    style: {
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.8)",
      zIndex: 500,
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "center",
      backdropFilter: "blur(6px)"
    },
    onClick: e => e.target === e.currentTarget && onClose(),
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "sheet-kb",
      style: {
        background: T.surface,
        borderRadius: "24px 24px 0 0",
        width: "100%",
        maxWidth: 520,
        maxHeight: "93vh",
        padding: "20px 20px 36px",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 16,
        animation: "slideUp .3s cubic-bezier(.32,1.1,.58,1) both"
      },
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        style: {
          width: 40,
          height: 4,
          background: T.surface2,
          borderRadius: 2,
          margin: "0 auto"
        }
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        },
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          style: {
            fontFamily: "'Noto Serif KR',serif",
            fontSize: 18,
            fontWeight: 700,
            color: T.text
          },
          children: "\uBC18\uBCF5\uB418\uB294 \uC218\uC785\uACFC \uC9C0\uCD9C"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
          onClick: onClose,
          style: {
            background: T.surface2,
            border: "none",
            borderRadius: "50%",
            width: 30,
            height: 30,
            color: T.muted,
            fontSize: 16,
            cursor: "pointer"
          },
          children: "\u2715"
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        style: {
          fontSize: 12.5,
          color: T.dim2,
          lineHeight: 1.7
        },
        children: ["\uB137\uD50C\uB9AD\uC2A4\xB7\uD1B5\uC2E0\uBE44\uCC98\uB7FC ", /*#__PURE__*/(0, _jsxRuntime.jsx)("b", {
          style: {
            color: T.text
          },
          children: "\uB9E4\uBC88 \uB098\uAC00\uB294 \uB3C8"
        }), ", \uC6D4\uAE09\xB7\uC6A9\uB3C8\uCC98\uB7FC ", /*#__PURE__*/(0, _jsxRuntime.jsx)("b", {
          style: {
            color: T.text
          },
          children: "\uC815\uAE30\uC801\uC73C\uB85C \uB4E4\uC5B4\uC624\uB294 \uB3C8"
        }), "\uC744 \uB4F1\uB85D\uD574\uB450\uBA74, \uC0C8 \uAC00\uACC4\uBD80\uB97C \uB9CC\uB4E4 \uB54C \uC54C\uC544\uC11C \uB2F4\uACA8\uC694."]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        style: {
          display: "flex",
          flexDirection: "column",
          gap: 8
        },
        children: [list.length === 0 && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          style: {
            textAlign: "center",
            padding: "28px 20px",
            color: T.dim
          },
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            style: {
              fontSize: 34,
              marginBottom: 8
            },
            children: "\uD83D\uDDD3\uFE0F"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            style: {
              fontSize: 13,
              color: T.dim2
            },
            children: "\uC544\uC9C1 \uB4F1\uB85D\uD55C \uAC8C \uC5C6\uC5B4\uC694"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            style: {
              fontSize: 11.5,
              marginTop: 4
            },
            children: "\uC544\uB798\uC5D0\uC11C \uBC18\uBCF5\uB418\uB294 \uC218\uC785\xB7\uC9C0\uCD9C\uC744 \uCD94\uAC00\uD574\uBCF4\uC138\uC694"
          })]
        }), list.map(f => {
          const isInc = f.kind === "income";
          const cc = isInc ? LG : "#F87171";
          return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            style: {
              display: "flex",
              alignItems: "center",
              gap: 11,
              background: T.inputBg,
              borderRadius: 12,
              padding: "12px 14px"
            },
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
              style: {
                width: 38,
                height: 38,
                borderRadius: 11,
                background: `${cc}18`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 17,
                flexShrink: 0
              },
              children: isInc ? "💰" : "💸"
            }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
              style: {
                flex: 1,
                minWidth: 0
              },
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
                style: {
                  fontSize: 14,
                  color: T.text,
                  fontWeight: 600,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap"
                },
                children: f.name
              }), f.cycle && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
                style: {
                  fontSize: 11.5,
                  color: cc,
                  marginTop: 2,
                  fontWeight: 500
                },
                children: cycleLabel(f.cycle)
              })]
            }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
              style: {
                fontSize: 14.5,
                color: cc,
                fontWeight: 700,
                flexShrink: 0,
                fontFamily: "'Noto Serif KR',serif"
              },
              children: [isInc ? "+" : "-", wonFmt(f.amount)]
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
              onClick: () => {
                const next = list.filter(x => x.id !== f.id);
                setList(next);
                onSave(next, true);
              },
              style: {
                flexShrink: 0,
                width: 26,
                height: 26,
                borderRadius: 8,
                border: "none",
                background: "transparent",
                color: T.dim,
                fontSize: 14,
                cursor: "pointer"
              },
              children: "\u2715"
            })]
          }, f.id);
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        style: {
          borderTop: `1px solid ${T.border}`,
          paddingTop: 14,
          display: "flex",
          flexDirection: "column",
          gap: 8
        },
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          style: {
            fontSize: 11,
            fontWeight: 600,
            color: T.muted
          },
          children: "\uC0C8 \uACE0\uC815 \uD56D\uBAA9 \uCD94\uAC00"
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          style: {
            display: "flex",
            gap: 8
          },
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
            onClick: () => setKind("expense"),
            style: {
              flex: 1,
              padding: "9px",
              borderRadius: 9,
              fontSize: 12.5,
              fontWeight: 700,
              cursor: "pointer",
              border: `1px solid ${kind === "expense" ? "#F87171" : T.border}`,
              background: kind === "expense" ? "rgba(248,113,113,0.13)" : "transparent",
              color: kind === "expense" ? "#F87171" : T.dim2
            },
            children: "\uACE0\uC815 \uC9C0\uCD9C"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
            onClick: () => setKind("income"),
            style: {
              flex: 1,
              padding: "9px",
              borderRadius: 9,
              fontSize: 12.5,
              fontWeight: 700,
              cursor: "pointer",
              border: `1px solid ${kind === "income" ? LG : T.border}`,
              background: kind === "income" ? `${LG}1d` : "transparent",
              color: kind === "income" ? LG : T.dim2
            },
            children: "\uC815\uAE30 \uC218\uC785"
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          style: {
            display: "flex",
            gap: 8
          },
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
            value: name,
            onChange: e => setName(e.target.value),
            placeholder: kind === "income" ? "이름 (예: 월급)" : "이름 (예: 넷플릭스)",
            style: {
              ...inp,
              flex: 1,
              minWidth: 0
            }
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
            value: commaFmt(amount),
            onChange: e => setAmount(e.target.value.replace(/[^0-9]/g, "")),
            inputMode: "numeric",
            placeholder: "\uAE08\uC561",
            style: {
              ...inp,
              width: 90,
              flexShrink: 0
            }
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          style: {
            display: "flex",
            gap: 6
          },
          children: [["monthly", "매달"], ["weekly", "매주"], ["biweekly", "격주"]].map(([k, l]) => /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
            onClick: () => setCycleType(k),
            style: {
              flex: 1,
              padding: "8px",
              borderRadius: 9,
              fontSize: 12.5,
              fontWeight: 700,
              cursor: "pointer",
              border: `1px solid ${cycleType === k ? "#60A5FA" : T.border}`,
              background: cycleType === k ? "#60A5FA1d" : "transparent",
              color: cycleType === k ? "#60A5FA" : T.dim2
            },
            children: l
          }, k))
        }), cycleType === "monthly" ? /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: 8
          },
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            style: {
              fontSize: 12.5,
              color: T.dim2
            },
            children: "\uB9E4\uB2EC"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
            value: monthDay,
            onChange: e => setMonthDay(e.target.value.replace(/[^0-9]/g, "")),
            inputMode: "numeric",
            placeholder: "25",
            style: {
              ...inp,
              width: 70,
              textAlign: "center"
            }
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
            style: {
              fontSize: 12.5,
              color: T.dim2
            },
            children: ["\uC77C\uC5D0 ", kind === "income" ? "입금" : "결제"]
          })]
        }) : /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          style: {
            display: "flex",
            gap: 5
          },
          children: WD.map((d, i) => /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
            onClick: () => setWeekday(i),
            style: {
              flex: 1,
              padding: "8px 0",
              borderRadius: 8,
              fontSize: 12.5,
              fontWeight: 700,
              cursor: "pointer",
              border: `1px solid ${weekday === i ? "#60A5FA" : T.border}`,
              background: weekday === i ? "#60A5FA1d" : "transparent",
              color: weekday === i ? "#60A5FA" : T.dim2
            },
            children: d
          }, i))
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
          onClick: add,
          style: {
            background: LG,
            border: "none",
            borderRadius: 10,
            color: "#fff",
            padding: "11px",
            fontSize: 13.5,
            fontWeight: 700,
            cursor: "pointer"
          },
          children: "+ \uCD94\uAC00"
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
        onClick: onClose,
        style: {
          padding: "14px",
          borderRadius: 14,
          border: "none",
          background: `linear-gradient(135deg,${LG},#4A8C60)`,
          color: "#fff",
          fontSize: 15,
          fontWeight: 700,
          cursor: "pointer"
        },
        children: "\uC644\uB8CC"
      })]
    })
  });
}

// 하위 폴더 생성 모달
// 이름 수정 모달 (가계부 하위폴더 등)
function RenameModal({
  title,
  onSave,
  onClose,
  T
}) {
  const [val, setVal] = useState(title || "");
  const inp = {
    width: "100%",
    background: T.inputBg,
    border: `1px solid ${T.borderStrong}`,
    borderRadius: 12,
    color: T.text,
    padding: "12px 14px",
    fontSize: 15,
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "'Noto Sans KR',sans-serif"
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    style: {
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.8)",
      zIndex: 520,
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "center",
      backdropFilter: "blur(6px)"
    },
    onClick: e => e.target === e.currentTarget && onClose(),
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: {
        background: T.surface,
        borderRadius: "24px 24px 0 0",
        width: "100%",
        maxWidth: 520,
        padding: "20px 20px 36px",
        display: "flex",
        flexDirection: "column",
        gap: 14,
        animation: "slideUp .3s cubic-bezier(.32,1.1,.58,1) both"
      },
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        style: {
          width: 40,
          height: 4,
          background: T.surface2,
          borderRadius: 2,
          margin: "0 auto"
        }
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        },
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          style: {
            fontFamily: "'Noto Serif KR',serif",
            fontSize: 18,
            fontWeight: 700,
            color: T.text
          },
          children: "\u270F\uFE0F \uC774\uB984 \uC218\uC815"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
          onClick: onClose,
          style: {
            background: T.surface2,
            border: "none",
            borderRadius: "50%",
            width: 30,
            height: 30,
            color: T.muted,
            fontSize: 16,
            cursor: "pointer"
          },
          children: "\u2715"
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
        value: val,
        onChange: e => setVal(e.target.value),
        autoFocus: true,
        style: inp
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
        onClick: () => {
          if (!val.trim()) return;
          onSave(val.trim());
        },
        style: {
          padding: "14px",
          borderRadius: 14,
          border: "none",
          background: `linear-gradient(135deg,${LG},#4A8C60)`,
          color: "#fff",
          fontSize: 15,
          fontWeight: 700,
          cursor: "pointer"
        },
        children: "\uC800\uC7A5"
      })]
    })
  });
}
function LedgerSubModal({
  onSave,
  onClose,
  fixedCount,
  T
}) {
  const now = new Date();
  const [title, setTitle] = useState(`${String(now.getFullYear()).slice(2)}년 ${now.getMonth() + 1}월 가계부`);
  const inp = {
    width: "100%",
    background: T.inputBg,
    border: `1px solid ${T.borderStrong}`,
    borderRadius: 12,
    color: T.text,
    padding: "12px 14px",
    fontSize: 15,
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "'Noto Sans KR',sans-serif"
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    style: {
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.8)",
      zIndex: 500,
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "center",
      backdropFilter: "blur(6px)"
    },
    onClick: e => e.target === e.currentTarget && onClose(),
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: {
        background: T.surface,
        borderRadius: "24px 24px 0 0",
        width: "100%",
        maxWidth: 520,
        padding: "20px 20px 36px",
        display: "flex",
        flexDirection: "column",
        gap: 16,
        animation: "slideUp .3s cubic-bezier(.32,1.1,.58,1) both"
      },
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        style: {
          width: 40,
          height: 4,
          background: T.surface2,
          borderRadius: 2,
          margin: "0 auto"
        }
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        },
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          style: {
            fontFamily: "'Noto Serif KR',serif",
            fontSize: 18,
            fontWeight: 700,
            color: T.text
          },
          children: "\uD83E\uDDFE \uC0C8 \uAC00\uACC4\uBD80"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
          onClick: onClose,
          style: {
            background: T.surface2,
            border: "none",
            borderRadius: "50%",
            width: 30,
            height: 30,
            color: T.muted,
            fontSize: 16,
            cursor: "pointer"
          },
          children: "\u2715"
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("label", {
          style: {
            fontSize: 11,
            fontWeight: 600,
            color: T.muted,
            marginBottom: 8,
            display: "block"
          },
          children: "\uC774\uB984"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
          value: title,
          onChange: e => setTitle(e.target.value),
          placeholder: "26\uB144 7\uC6D4 \uAC00\uACC4\uBD80",
          style: inp
        })]
      }), fixedCount > 0 && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        style: {
          fontSize: 12,
          color: LG,
          background: `${LG}10`,
          borderRadius: 10,
          padding: "10px 12px"
        },
        children: ["\uD83D\uDD04 \uB4F1\uB85D\uB41C \uACE0\uC815 \uC9C0\uCD9C ", fixedCount, "\uAC1C\uAC00 \uC790\uB3D9\uC73C\uB85C \uB4E4\uC5B4\uAC00\uC694"]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
        onClick: () => {
          if (!title.trim()) return;
          onSave(title.trim());
        },
        style: {
          padding: "14px",
          borderRadius: 14,
          border: "none",
          background: `linear-gradient(135deg,${LG},#4A8C60)`,
          color: "#fff",
          fontSize: 15,
          fontWeight: 700,
          cursor: "pointer"
        },
        children: "\uB9CC\uB4E4\uAE30"
      })]
    })
  });
}

// 계좌 관리 모달
const ACC_COLORS = ["#22C55E", "#3B82F6", "#F59E0B", "#EC4899", "#A78BFA", "#14B8A6", "#EF4444", "#F97316"];
function AccountModal({
  accounts,
  onSave,
  onClose,
  T
}) {
  const [list, setList] = useState(accounts && accounts.length ? accounts : []);
  const [name, setName] = useState("");
  const [initial, setInitial] = useState("");
  const [color, setColor] = useState(ACC_COLORS[0]);
  const inp = {
    background: T.inputBg,
    border: `1px solid ${T.borderStrong}`,
    borderRadius: 10,
    color: T.text,
    padding: "11px 12px",
    fontSize: 14,
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "'Noto Sans KR',sans-serif"
  };
  const [accErr, setAccErr] = useState("");
  const add = () => {
    const nm = name.trim();
    if (!nm) {
      setAccErr("계좌 이름을 입력해주세요");
      return;
    }
    if (list.some(a => a.name === nm)) {
      setAccErr("같은 이름의 계좌가 이미 있어요");
      return;
    }
    setAccErr("");
    setList([...list, {
      id: uid(),
      name: nm,
      color,
      initial: Number(initial) || 0
    }]);
    setName("");
    setInitial("");
    setColor(ACC_COLORS[(list.length + 1) % ACC_COLORS.length]);
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    style: {
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.8)",
      zIndex: 500,
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "center",
      backdropFilter: "blur(6px)"
    },
    onClick: e => e.target === e.currentTarget && onClose(),
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: {
        background: T.surface,
        borderRadius: "24px 24px 0 0",
        width: "100%",
        maxWidth: 520,
        maxHeight: "93vh",
        overflowY: "auto",
        padding: "20px 20px 36px",
        display: "flex",
        flexDirection: "column",
        gap: 14,
        animation: "slideUp .3s cubic-bezier(.32,1.1,.58,1) both"
      },
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        style: {
          width: 40,
          height: 4,
          background: T.surface2,
          borderRadius: 2,
          margin: "0 auto"
        }
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        },
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          style: {
            fontFamily: "'Noto Serif KR',serif",
            fontSize: 18,
            fontWeight: 700,
            color: T.text
          },
          children: "\uD83D\uDCB3 \uACC4\uC88C \uAD00\uB9AC"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
          onClick: onClose,
          style: {
            background: T.surface2,
            border: "none",
            borderRadius: "50%",
            width: 30,
            height: 30,
            color: T.muted,
            fontSize: 16,
            cursor: "pointer"
          },
          children: "\u2715"
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        style: {
          fontSize: 12,
          color: T.dim2,
          lineHeight: 1.6,
          background: `${LG}10`,
          borderRadius: 10,
          padding: "10px 12px"
        },
        children: "\uD83D\uDCA1 \uACC4\uC88C\uB97C \uB098\uB204\uBA74 \uAE30\uB85D\uD560 \uB54C \uC5B4\uB290 \uACC4\uC88C\uC5D0\uC11C \uB098\uAC00\uB294\uC9C0 \uACE0\uB97C \uC218 \uC788\uC5B4\uC694. (\uC608: \uC0DD\uD65C\uBE44 \uACC4\uC88C, \uBE44\uC0C1\uAE08 \uACC4\uC88C)"
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        style: {
          display: "flex",
          flexDirection: "column",
          gap: 8
        },
        children: [list.length === 0 && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          style: {
            textAlign: "center",
            padding: "16px",
            color: T.dim,
            fontSize: 13
          },
          children: "\uC544\uC9C1 \uACC4\uC88C\uC774 \uC5C6\uC5B4\uC694. \uC544\uB798\uC5D0\uC11C \uCD94\uAC00\uD574\uBCF4\uC138\uC694."
        }), list.map(a => /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: T.inputBg,
            borderRadius: 10,
            padding: "10px 12px"
          },
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            style: {
              width: 14,
              height: 14,
              borderRadius: "50%",
              background: a.color,
              flexShrink: 0
            }
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            style: {
              flex: 1,
              minWidth: 0
            },
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
              style: {
                fontSize: 14,
                fontWeight: 600,
                color: T.text
              },
              children: a.name
            }), a.initial > 0 && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
              style: {
                fontSize: 11,
                color: T.dim2,
                marginTop: 1
              },
              children: ["\uC2DC\uC791 \uC794\uC561 ", wonFmt(a.initial)]
            })]
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
            onClick: () => setList(list.filter(x => x.id !== a.id)),
            style: {
              flexShrink: 0,
              width: 26,
              height: 26,
              borderRadius: 7,
              border: "none",
              background: "rgba(190,30,30,0.12)",
              color: "#F87171",
              fontSize: 11,
              cursor: "pointer"
            },
            children: "\u2715"
          })]
        }, a.id))]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        style: {
          borderTop: `1px solid ${T.border}`,
          paddingTop: 14,
          display: "flex",
          flexDirection: "column",
          gap: 10
        },
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          style: {
            fontSize: 11,
            fontWeight: 600,
            color: T.muted
          },
          children: "\uC0C8 \uACC4\uC88C \uCD94\uAC00"
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          style: {
            display: "flex",
            gap: 8
          },
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
            value: name,
            onChange: e => {
              setName(e.target.value);
              if (accErr) setAccErr("");
            },
            placeholder: "\uACC4\uC88C \uC774\uB984 (\uC608: \uC0DD\uD65C\uBE44)",
            style: {
              ...inp,
              flex: 1,
              minWidth: 0
            }
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
            onClick: add,
            style: {
              flexShrink: 0,
              background: color,
              border: "none",
              borderRadius: 10,
              color: "#fff",
              padding: "0 16px",
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer"
            },
            children: "+"
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
          value: commaFmt(initial),
          onChange: e => setInitial(e.target.value.replace(/[^0-9]/g, "")),
          inputMode: "numeric",
          placeholder: "\uD604\uC7AC \uC794\uC561 (\uC120\uD0DD \xB7 \uC608: 500,000)",
          style: {
            ...inp,
            width: "100%"
          }
        }), accErr && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          style: {
            fontSize: 11.5,
            color: "#F87171",
            marginTop: -2
          },
          children: accErr
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          style: {
            display: "flex",
            gap: 8,
            flexWrap: "wrap"
          },
          children: ACC_COLORS.map(c => /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
            onClick: () => setColor(c),
            style: {
              width: 30,
              height: 30,
              borderRadius: "50%",
              background: c,
              border: color === c ? `3px solid ${T.text}` : `2px solid ${T.border}`,
              cursor: "pointer"
            }
          }, c))
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
        onClick: () => onSave(list),
        style: {
          padding: "14px",
          borderRadius: 14,
          border: "none",
          background: `linear-gradient(135deg,${LG},#4A8C60)`,
          color: "#fff",
          fontSize: 15,
          fontWeight: 700,
          cursor: "pointer"
        },
        children: "\uC800\uC7A5"
      })]
    })
  });
}

// 카테고리 편집 모달 (커스텀 카테고리 추가/삭제)
function CategoryModal({
  customCats,
  onSave,
  onClose,
  T
}) {
  const [tab, setTab] = useState("expense");
  const [custom, setCustom] = useState({
    expense: [...(customCats && customCats.expense || [])],
    income: [...(customCats && customCats.income || [])]
  });
  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState(CAT_EMOJIS[0]);
  const inp = {
    background: T.inputBg,
    border: `1px solid ${T.borderStrong}`,
    borderRadius: 10,
    color: T.text,
    padding: "11px 12px",
    fontSize: 14,
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "'Noto Sans KR',sans-serif"
  };
  const baseCount = LEDGER_CATS[tab].length;
  const add = () => {
    if (!name.trim()) return;
    setCustom({
      ...custom,
      [tab]: [...custom[tab], {
        k: "c" + uid(),
        label: name.trim(),
        emoji
      }]
    });
    setName("");
  };
  const del = k => setCustom({
    ...custom,
    [tab]: custom[tab].filter(c => c.k !== k)
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    style: {
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.8)",
      zIndex: 550,
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "center",
      backdropFilter: "blur(6px)"
    },
    onClick: e => e.target === e.currentTarget && onClose(),
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: {
        background: T.surface,
        borderRadius: "24px 24px 0 0",
        width: "100%",
        maxWidth: 520,
        maxHeight: "93vh",
        overflowY: "auto",
        padding: "20px 20px 36px",
        display: "flex",
        flexDirection: "column",
        gap: 14,
        animation: "slideUp .3s cubic-bezier(.32,1.1,.58,1) both"
      },
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        style: {
          width: 40,
          height: 4,
          background: T.surface2,
          borderRadius: 2,
          margin: "0 auto"
        }
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        },
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          style: {
            fontFamily: "'Noto Serif KR',serif",
            fontSize: 18,
            fontWeight: 700,
            color: T.text
          },
          children: "\uD83C\uDFF7\uFE0F \uCE74\uD14C\uACE0\uB9AC \uD3B8\uC9D1"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
          onClick: onClose,
          style: {
            background: T.surface2,
            border: "none",
            borderRadius: "50%",
            width: 30,
            height: 30,
            color: T.muted,
            fontSize: 16,
            cursor: "pointer"
          },
          children: "\u2715"
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        style: {
          display: "flex",
          gap: 8
        },
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
          onClick: () => setTab("expense"),
          style: {
            flex: 1,
            padding: "10px",
            borderRadius: 10,
            fontSize: 13,
            fontWeight: 700,
            cursor: "pointer",
            border: `1px solid ${tab === "expense" ? "#F87171" : T.border}`,
            background: tab === "expense" ? "rgba(248,113,113,0.15)" : "transparent",
            color: tab === "expense" ? "#F87171" : T.dim2
          },
          children: "\uC9C0\uCD9C \uCE74\uD14C\uACE0\uB9AC"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
          onClick: () => setTab("income"),
          style: {
            flex: 1,
            padding: "10px",
            borderRadius: 10,
            fontSize: 13,
            fontWeight: 700,
            cursor: "pointer",
            border: `1px solid ${tab === "income" ? LG : T.border}`,
            background: tab === "income" ? `${LG}22` : "transparent",
            color: tab === "income" ? LG : T.dim2
          },
          children: "\uC218\uC785 \uCE74\uD14C\uACE0\uB9AC"
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        style: {
          fontSize: 11,
          color: T.dim2
        },
        children: "\uAE30\uBCF8 \uCE74\uD14C\uACE0\uB9AC"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        style: {
          display: "flex",
          flexWrap: "wrap",
          gap: 6
        },
        children: LEDGER_CATS[tab].map(c => /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
          style: {
            fontSize: 12.5,
            background: T.inputBg,
            color: T.muted,
            borderRadius: 8,
            padding: "6px 10px"
          },
          children: [c.emoji, " ", c.label]
        }, c.k))
      }), custom[tab].length > 0 && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          style: {
            fontSize: 11,
            color: T.dim2,
            marginTop: 4
          },
          children: "\uB0B4\uAC00 \uCD94\uAC00\uD55C \uCE74\uD14C\uACE0\uB9AC"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          style: {
            display: "flex",
            flexDirection: "column",
            gap: 6
          },
          children: custom[tab].map(c => /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            style: {
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: `${LG}12`,
              borderRadius: 10,
              padding: "9px 12px"
            },
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
              style: {
                fontSize: 16
              },
              children: c.emoji
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
              style: {
                flex: 1,
                fontSize: 14,
                fontWeight: 600,
                color: T.text
              },
              children: c.label
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
              onClick: () => del(c.k),
              style: {
                width: 24,
                height: 24,
                borderRadius: 6,
                border: "none",
                background: "rgba(190,30,30,0.12)",
                color: "#F87171",
                fontSize: 11,
                cursor: "pointer"
              },
              children: "\u2715"
            })]
          }, c.k))
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        style: {
          borderTop: `1px solid ${T.border}`,
          paddingTop: 14,
          display: "flex",
          flexDirection: "column",
          gap: 10
        },
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          style: {
            fontSize: 11,
            fontWeight: 600,
            color: T.muted
          },
          children: "\uC0C8 \uCE74\uD14C\uACE0\uB9AC \uCD94\uAC00"
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          style: {
            display: "flex",
            gap: 8
          },
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            style: {
              width: 46,
              height: 46,
              borderRadius: 10,
              background: T.inputBg,
              border: `1px solid ${T.borderStrong}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22
            },
            children: emoji
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
            value: name,
            onChange: e => setName(e.target.value),
            placeholder: "\uCE74\uD14C\uACE0\uB9AC \uC774\uB984",
            style: {
              ...inp,
              flex: 1,
              minWidth: 0
            }
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
            onClick: add,
            style: {
              background: LG,
              border: "none",
              borderRadius: 10,
              color: "#fff",
              padding: "0 18px",
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer"
            },
            children: "+"
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          style: {
            display: "flex",
            gap: 6,
            flexWrap: "wrap"
          },
          children: CAT_EMOJIS.map(e => /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
            onClick: () => setEmoji(e),
            style: {
              width: 34,
              height: 34,
              borderRadius: 8,
              fontSize: 18,
              cursor: "pointer",
              border: emoji === e ? `2px solid ${LG}` : `1px solid ${T.border}`,
              background: emoji === e ? `${LG}1a` : "transparent"
            },
            children: e
          }, e))
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
        onClick: () => onSave(custom),
        style: {
          padding: "14px",
          borderRadius: 14,
          border: "none",
          background: `linear-gradient(135deg,${LG},#4A8C60)`,
          color: "#fff",
          fontSize: 15,
          fontWeight: 700,
          cursor: "pointer"
        },
        children: "\uC800\uC7A5"
      })]
    })
  });
}

// 예산 설정 모달 (카테고리별)
function BudgetModal({
  sub,
  customCats,
  onSave,
  onClose,
  T
}) {
  const [budgets, setBudgets] = useState({
    ...(sub.budgets || {})
  });
  const cats = getCats("expense", customCats);
  const inp = {
    width: "100%",
    background: T.inputBg,
    border: `1px solid ${T.borderStrong}`,
    borderRadius: 10,
    color: T.text,
    padding: "10px 12px",
    fontSize: 14,
    outline: "none",
    boxSizing: "border-box",
    textAlign: "right",
    fontFamily: "'Noto Sans KR',sans-serif"
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    style: {
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.8)",
      zIndex: 550,
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "center",
      backdropFilter: "blur(6px)"
    },
    onClick: e => e.target === e.currentTarget && onClose(),
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: {
        background: T.surface,
        borderRadius: "24px 24px 0 0",
        width: "100%",
        maxWidth: 520,
        maxHeight: "93vh",
        overflowY: "auto",
        padding: "20px 20px 36px",
        display: "flex",
        flexDirection: "column",
        gap: 14,
        animation: "slideUp .3s cubic-bezier(.32,1.1,.58,1) both"
      },
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        style: {
          width: 40,
          height: 4,
          background: T.surface2,
          borderRadius: 2,
          margin: "0 auto"
        }
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        },
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          style: {
            fontFamily: "'Noto Serif KR',serif",
            fontSize: 18,
            fontWeight: 700,
            color: T.text
          },
          children: "\uD83C\uDFAF \uC608\uC0B0 \uC124\uC815"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
          onClick: onClose,
          style: {
            background: T.surface2,
            border: "none",
            borderRadius: "50%",
            width: 30,
            height: 30,
            color: T.muted,
            fontSize: 16,
            cursor: "pointer"
          },
          children: "\u2715"
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        style: {
          fontSize: 12,
          color: T.dim2,
          lineHeight: 1.6,
          background: `${LG}10`,
          borderRadius: 10,
          padding: "10px 12px"
        },
        children: "\uD83D\uDCA1 \uCE74\uD14C\uACE0\uB9AC\uBCC4\uB85C \uC774 \uAC00\uACC4\uBD80\uC758 \uC608\uC0B0\uC744 \uC815\uD574\uC694. \uBE44\uC6CC\uB450\uBA74 \uC608\uC0B0 \uC5C6\uC74C\uC774\uC5D0\uC694."
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        style: {
          display: "flex",
          flexDirection: "column",
          gap: 9
        },
        children: cats.map(c => /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: 10
          },
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            style: {
              fontSize: 17,
              width: 24
            },
            children: c.emoji
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            style: {
              flex: 1,
              fontSize: 14,
              color: T.text
            },
            children: c.label
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
            value: budgets[c.k] ? commaFmt(budgets[c.k]) : "",
            onChange: e => {
              const v = e.target.value.replace(/[^0-9]/g, "");
              setBudgets({
                ...budgets,
                [c.k]: v ? Number(v) : 0
              });
            },
            inputMode: "numeric",
            placeholder: "\uC608\uC0B0 \uC5C6\uC74C",
            style: {
              ...inp,
              width: "min(130px, 45%)",
              flexShrink: 0
            }
          })]
        }, c.k))
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
        onClick: () => {
          const clean = {};
          Object.keys(budgets).forEach(k => {
            if (budgets[k] > 0) clean[k] = budgets[k];
          });
          onSave(clean);
        },
        style: {
          padding: "14px",
          borderRadius: 14,
          border: "none",
          background: `linear-gradient(135deg,${LG},#4A8C60)`,
          color: "#fff",
          fontSize: 15,
          fontWeight: 700,
          cursor: "pointer"
        },
        children: "\uC800\uC7A5"
      })]
    })
  });
}

// 가계부 통계 (월별·카테고리별)
function LedgerStats({
  sub,
  entries,
  customCats,
  onClose,
  wide,
  T
}) {
  const expenses = entries.filter(e => !e.isPlanned && e.lType === "expense");
  const incomes = entries.filter(e => !e.isPlanned && e.lType === "income");
  const totalExp = expenses.reduce((s, e) => s + (e.amount || 0), 0);
  const totalInc = incomes.reduce((s, e) => s + (e.amount || 0), 0);
  // 카테고리별 지출
  const byCat = {};
  expenses.forEach(e => {
    byCat[e.lCat] = (byCat[e.lCat] || 0) + (e.amount || 0);
  });
  const catRows = Object.entries(byCat).map(([k, v]) => ({
    cat: ledgerCat("expense", k, customCats),
    amount: v,
    pct: totalExp ? Math.round(v / totalExp * 100) : 0
  })).sort((a, b) => b.amount - a.amount);
  // 일자별(월 안에서) 지출 추이 — 날짜별 합
  const byDate = {};
  expenses.forEach(e => {
    if (e.lDate) byDate[e.lDate] = (byDate[e.lDate] || 0) + (e.amount || 0);
  });
  const dateKeys = Object.keys(byDate).sort();
  const maxDay = Math.max(...Object.values(byDate), 1);
  const maxW = wide ? 760 : 520;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: {
      position: "fixed",
      inset: 0,
      background: T.bg,
      zIndex: 450,
      overflowY: "auto",
      animation: "fadeIn .2s ease",
      maxWidth: maxW,
      margin: "0 auto"
    },
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: {
        position: "sticky",
        top: 0,
        zIndex: 10,
        background: T.headerBg,
        backdropFilter: "blur(20px)",
        padding: "calc(env(safe-area-inset-top, 0px) + 14px) 20px 14px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: `1px solid ${T.border}`
      },
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
        onClick: onClose,
        style: {
          background: T.inputBg,
          border: `1px solid ${T.border}`,
          borderRadius: 10,
          color: T.muted,
          padding: "8px 14px",
          fontSize: 14,
          cursor: "pointer"
        },
        children: "\u2190 \uB2EB\uAE30"
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        style: {
          fontFamily: "'Noto Serif KR',serif",
          fontSize: 16,
          fontWeight: 700,
          color: T.text
        },
        children: ["\uD83D\uDCCA ", sub.title]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        style: {
          width: 60
        }
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: {
        padding: wide ? "28px 32px 80px" : "20px 18px 60px",
        display: "flex",
        flexDirection: "column",
        gap: 16
      },
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        style: {
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 10
        },
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          style: {
            background: T.cardBg,
            borderRadius: 14,
            border: `1px solid ${T.border}`,
            padding: "16px"
          },
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            style: {
              fontSize: 11,
              color: T.dim2
            },
            children: "\uCD1D \uC9C0\uCD9C"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            style: {
              fontSize: 20,
              fontWeight: 700,
              color: "#F87171",
              fontFamily: "'Noto Serif KR',serif",
              marginTop: 3
            },
            children: wonFmt(totalExp)
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          style: {
            background: T.cardBg,
            borderRadius: 14,
            border: `1px solid ${T.border}`,
            padding: "16px"
          },
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            style: {
              fontSize: 11,
              color: T.dim2
            },
            children: "\uCD1D \uC218\uC785"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            style: {
              fontSize: 20,
              fontWeight: 700,
              color: LG,
              fontFamily: "'Noto Serif KR',serif",
              marginTop: 3
            },
            children: wonFmt(totalInc)
          })]
        })]
      }), dateKeys.length > 0 && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        style: {
          background: T.cardBg,
          borderRadius: 14,
          border: `1px solid ${T.border}`,
          padding: "18px 16px"
        },
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          style: {
            fontSize: 12,
            fontWeight: 700,
            color: T.text,
            marginBottom: 14
          },
          children: "\uD83D\uDCC8 \uB0A0\uC9DC\uBCC4 \uC9C0\uCD9C"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          style: {
            display: "flex",
            alignItems: "flex-end",
            gap: 4,
            height: 110,
            overflowX: "auto"
          },
          children: dateKeys.map(d => {
            const h = byDate[d] / maxDay * 88 + 4;
            return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
              style: {
                flex: "1 0 22px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4
              },
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
                style: {
                  width: "100%",
                  maxWidth: 28,
                  height: `${h}px`,
                  background: "linear-gradient(180deg,#F87171,#DC2626)",
                  borderRadius: 4
                }
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
                style: {
                  fontSize: 9,
                  color: T.dim2,
                  transform: "rotate(-45deg)",
                  whiteSpace: "nowrap",
                  marginTop: 4
                },
                children: d.slice(5)
              })]
            }, d);
          })
        })]
      }), catRows.length > 0 && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        style: {
          background: T.cardBg,
          borderRadius: 14,
          border: `1px solid ${T.border}`,
          padding: "18px 16px"
        },
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          style: {
            fontSize: 12,
            fontWeight: 700,
            color: T.text,
            marginBottom: 14
          },
          children: "\uD83D\uDDC2\uFE0F \uCE74\uD14C\uACE0\uB9AC\uBCC4 \uC9C0\uCD9C"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          style: {
            display: "flex",
            flexDirection: "column",
            gap: 12
          },
          children: catRows.map(r => /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            style: {
              display: "flex",
              alignItems: "center",
              gap: 10
            },
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
              style: {
                fontSize: 16,
                width: 24
              },
              children: r.cat.emoji
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
              style: {
                fontSize: 13,
                color: T.text,
                width: 70,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap"
              },
              children: r.cat.label
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
              style: {
                flex: 1,
                height: 9,
                background: T.inputBg,
                borderRadius: 5,
                overflow: "hidden"
              },
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
                style: {
                  width: `${r.pct}%`,
                  height: "100%",
                  background: "#F87171",
                  borderRadius: 5,
                  transition: "width .4s"
                }
              })
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
              style: {
                fontSize: 12,
                color: T.dim2,
                width: 90,
                textAlign: "right"
              },
              children: wonFmt(r.amount)
            })]
          }, r.cat.k))
        })]
      }), entries.length === 0 && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        style: {
          textAlign: "center",
          padding: "50px 20px",
          color: T.dim
        },
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          style: {
            fontSize: 40,
            marginBottom: 10
          },
          children: "\uD83D\uDCCA"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          style: {
            fontSize: 14,
            color: T.dim2
          },
          children: "\uAE30\uB85D\uC774 \uC313\uC774\uBA74 \uD1B5\uACC4\uAC00 \uBCF4\uC5EC\uC694"
        })]
      })]
    })]
  });
}

// SOURCE: journal.jsx
function MomentModal({
  entry,
  folderId,
  onSave,
  onDelete,
  onClose,
  T
}) {
  const [text, setText] = useState(entry?.notes || ''),
    [mood, setMood] = useState(entry?.mood || ''),
    [photo, setPhoto] = useState(entry?.coverId || null),
    [when, setWhen] = useState(entry?.occurredAt ? localDateTime(new Date(entry.occurredAt)) : localDateTime(new Date())),
    [error, setError] = useState(''),
    [busy, setBusy] = useState(false),
    [ready, setReady] = useState(false);
  const done = useRef(false),
    id = useRef(entry?.id || uid()),
    key = 'moment:' + (entry?.id || folderId);
  const value = () => ({
    id: id.current,
    folderId,
    _kind: 'moment',
    notes: text,
    title: '',
    mood,
    coverId: photo,
    occurredAt: new Date(when).toISOString(),
    dateKey: diaryDateKey(new Date(when)),
    createdAt: entry?.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });
  useEffect(() => {
    let alive = true;
    draftRead(key).then(d => {
      if (!alive) return;
      if (d && (!entry?.updatedAt || d.updatedAt > entry.updatedAt)) {
        setText(d.notes || '');
        setMood(d.mood || '');
        setPhoto(d.coverId);
        setWhen(localDateTime(new Date(d.occurredAt)));
        id.current = d.id;
      }
      setReady(true);
    });
    return () => {
      alive = false;
    };
  }, []);
  useEffect(() => {
    if (!ready || !when || isNaN(new Date(when))) return;
    const t = setTimeout(() => {
      if (!done.current) draftWrite(key, value());
    }, 500);
    return () => clearTimeout(t);
  }, [text, mood, photo, when, ready]);
  const close = async () => {
    if (ready && when && !isNaN(new Date(when))) {
      const ok = await draftWrite(key, value());
      if (!ok && !window.confirm('초안을 저장하지 못했어요. 닫을까요?')) return;
    }
    onClose();
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(Sheet, {
    title: entry ? '그 순간 수정' : '지금, 이 순간',
    onClose: close,
    T: T,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
      className: "hint",
      children: "\uAC10\uC815\uB9CC \uB0A8\uACA8\uB3C4, \uD55C \uBB38\uC7A5\uB9CC \uC801\uC5B4\uB3C4 \uC88B\uC544\uC694."
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "mood-grid",
      children: MOODS.map(m => /*#__PURE__*/(0, _jsxRuntime.jsxs)("button", {
        className: mood === m.label ? 'selected' : '',
        onClick: () => setMood(mood === m.label ? '' : m.label),
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          children: m.e
        }), m.label]
      }, m.label))
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("textarea", {
      "aria-label": "\uC21C\uAC04 \uAE30\uB85D",
      rows: 5,
      placeholder: "\uC9C0\uAE08 \uC5B4\uB5A4 \uC0DD\uAC01\uC774 \uB4DC\uB098\uC694?",
      value: text,
      onChange: e => setText(e.target.value)
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("details", {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("summary", {
        children: "\uC0AC\uC9C4\uACFC \uC2DC\uAC04"
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "detail-controls",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
          "aria-label": "\uAE30\uB85D\uD55C \uC2DC\uAC04",
          type: "datetime-local",
          value: when,
          onChange: e => setWhen(e.target.value)
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          style: {
            width: 120
          },
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(CoverUpload, {
            imgId: photo,
            ratio: "1/1",
            onChange: setPhoto,
            onError: setError,
            T: T
          })
        })]
      })]
    }), error && /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
      role: "alert",
      className: "error",
      children: error
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
      disabled: busy || !ready,
      className: "primary",
      onClick: async () => {
        if (!text.trim() && !mood && !photo) {
          setError('감정, 글, 사진 중 하나만 남겨주세요');
          return;
        }
        if (!when || isNaN(new Date(when))) {
          setError('시간을 확인해주세요');
          return;
        }
        setBusy(true);
        try {
          const ok = await onSave(value());
          if (ok !== false) {
            done.current = true;
            await draftDelete(key);
          }
        } finally {
          setBusy(false);
        }
      },
      children: busy ? '저장 중…' : '이 순간 남기기'
    }), entry && onDelete && /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
      className: "quiet",
      disabled: busy,
      onClick: async () => {
        setBusy(true);
        try {
          if ((await onDelete(entry)) !== false) {
            done.current = true;
            await draftDelete(key);
          }
        } finally {
          setBusy(false);
        }
      },
      children: "\uC774 \uC21C\uAC04 \uC0AD\uC81C"
    })]
  });
}
function localDateTime(d) {
  return localDateKey(d) + 'T' + String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
}
function JournalView({
  entries,
  moments,
  onOpenDay,
  onEditDay,
  onDelete,
  onMoment,
  onNewDay,
  onNewMoment,
  T
}) {
  const [mode, setMode] = useState('all'),
    [day, setDay] = useState('');
  const days = [...new Set([...entries, ...moments].map(e => e.dateKey).filter(Boolean))].sort().reverse();
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: "journal-view",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "two-col",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
        className: "primary",
        onClick: onNewMoment,
        children: "\uFF0B \uC9C0\uAE08 \uAE30\uB85D"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
        className: "secondary",
        onClick: onNewDay,
        children: "\uD558\uB8E8 \uC77C\uAE30"
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "journal-tools",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "segmented",
        children: [['all', '모두'], ['moment', '순간'], ['day', '하루']].map(([v, l]) => /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
          className: mode === v ? 'selected' : '',
          onClick: () => setMode(v),
          children: l
        }, v))
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
        "aria-label": "\uB0A0\uC9DC\uB85C \uCC3E\uAE30",
        type: "date",
        value: day,
        onChange: e => setDay(e.target.value)
      }), day && /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
        className: "quiet",
        onClick: () => setDay(''),
        children: "\uC804\uCCB4 \uB0A0\uC9DC"
      })]
    }), days.filter(d => !day || d === day).map(d => {
      const ms = moments.filter(m => m.dateKey === d).sort((a, b) => (a.occurredAt || '').localeCompare(b.occurredAt || '')),
        ds = entries.filter(e => e.dateKey === d);
      if (mode === 'moment' && !ms.length || mode === 'day' && !ds.length) return null;
      return /*#__PURE__*/(0, _jsxRuntime.jsxs)("section", {
        className: "journal-day",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("h3", {
          children: fmtDiaryDate(d)
        }), mode !== 'day' && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "moment-timeline",
          children: ms.map(m => /*#__PURE__*/(0, _jsxRuntime.jsxs)("button", {
            className: "moment-row",
            onClick: () => onMoment(m),
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("time", {
              children: new Date(m.occurredAt).toLocaleTimeString('ko-KR', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
              })
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
              className: "moment-dot",
              children: MOODS.find(x => x.label === m.mood)?.e || '·'
            }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
              className: "moment-text",
              children: [m.notes || m.mood || '사진으로 남긴 순간', m.coverId && /*#__PURE__*/(0, _jsxRuntime.jsx)(DiaryThumb, {
                coverId: m.coverId,
                size: 64
              })]
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
              className: "sr-only",
              children: "\uC218\uC815"
            })]
          }, m.id))
        }), mode !== 'moment' && ds.map(e => /*#__PURE__*/(0, _jsxRuntime.jsx)(DiaryCard, {
          entry: e,
          T: T,
          onOpen: onOpenDay,
          onEdit: onEditDay,
          onDelete: onDelete
        }, e.id))]
      }, d);
    }), !days.length && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "empty-small",
      children: ["\uC624\uB298\uC758 \uC791\uC740 \uC21C\uAC04\uBD80\uD130 \uB0A8\uACA8\uBCF4\uC138\uC694.", /*#__PURE__*/(0, _jsxRuntime.jsx)("br", {}), "\uAE38\uAC8C \uC4F0\uC9C0 \uC54A\uC544\uB3C4 \uAD1C\uCC2E\uC544\uC694."]
    })]
  });
}
function AlbumShelf({
  items,
  onOpen,
  T
}) {
  const [selected, setSelected] = useState(null);
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);
  const open = item => {
    clearTimeout(timer.current);
    setSelected(item.id);
    timer.current = setTimeout(() => {
      onOpen(item);
      setSelected(null);
    }, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 200);
  };
  const rows = [];
  for (let i = 0; i < items.length; i += 8) rows.push(items.slice(i, i + 8));
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: "album-cabinet",
    "aria-label": "\uB098\uC758 \uC74C\uBC18\uC7A5",
    children: [rows.map((row, n) => /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "album-shelf",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "album-spines",
        children: row.map((a, i) => /*#__PURE__*/(0, _jsxRuntime.jsxs)("button", {
          className: 'album-spine' + (selected === a.id ? ' pulled' : ''),
          style: {
            '--spine-color': ['#56436b', '#42596b', '#625440', '#534457', '#49615b', '#645053'][i % 6]
          },
          onClick: () => open(a),
          "aria-label": a.title + ' 꺼내기',
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            className: "spine-number",
            children: String(n * 8 + i + 1).padStart(2, '0')
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            className: "spine-name",
            children: a.title
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            className: "spine-mark",
            children: a.rating > 0 ? '★ ' + a.rating : 'GIROK'
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            className: "spine-cover",
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(Cover, {
              imgId: a.coverId,
              ratio: "1/1",
              ft: FOLDER_TYPES.album,
              radius: 2
            })
          })]
        }, a.id))
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "shelf-edge"
      })]
    }, n)), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
      className: "hint",
      style: {
        textAlign: 'center'
      },
      children: "\uC568\uBC94\uC744 \uB204\uB974\uBA74 \uAEBC\uB0B4 \uBCFC \uC218 \uC788\uC5B4\uC694."
    })]
  });
}
function AlbumSessions({
  item,
  onSave,
  T
}) {
  const [text, setText] = useState(''),
    [track, setTrack] = useState(''),
    [open, setOpen] = useState(false),
    [busy, setBusy] = useState(false),
    [error, setError] = useState('');
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("section", {
    className: "album-sessions",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "section-heading",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("h3", {
        children: "\uB2E4\uC2DC \uB4E4\uC73C\uBA70"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
        className: "secondary",
        onClick: () => setOpen(!open),
        children: "\uFF0B \uAC10\uC0C1 \uB0A8\uAE30\uAE30"
      })]
    }), open && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "detail-controls",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("textarea", {
        "aria-label": "\uC7AC\uAC10\uC0C1",
        value: text,
        onChange: e => setText(e.target.value),
        placeholder: "\uC774\uBC88\uC5D0\uB294 \uC5B4\uB5BB\uAC8C \uB4E4\uB838\uB098\uC694? \uD55C \uBB38\uC7A5\uB3C4 \uC88B\uC544\uC694."
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
        "aria-label": "\uC88B\uC558\uB358 \uACE1",
        value: track,
        onChange: e => setTrack(e.target.value),
        placeholder: "\uC624\uB298 \uC88B\uC558\uB358 \uACE1 \xB7 \uC120\uD0DD"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
        className: "primary",
        disabled: busy,
        onClick: async () => {
          if (!text.trim() && !track.trim()) {
            setError('감상이나 좋았던 곡을 적어주세요');
            return;
          }
          setBusy(true);
          const ok = await onSave({
            ...item,
            sessions: [{
              id: uid(),
              notes: text.trim(),
              track: track.trim(),
              date: new Date().toISOString()
            }, ...(item.sessions || [])],
            updatedAt: new Date().toISOString()
          });
          setBusy(false);
          if (ok !== false) {
            setOpen(false);
            setText('');
            setTrack('');
          }
        },
        children: "\uAC10\uC0C1 \uC800\uC7A5"
      }), error && /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
        className: "error",
        children: error
      })]
    }), !(item.sessions || []).length && !open && /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
      className: "hint",
      children: "\uCC98\uC74C\uACFC \uB2E4\uB974\uAC8C \uB4E4\uB838\uB2E4\uBA74, \uADF8 \uB290\uB08C\uB3C4 \uC5EC\uAE30\uC5D0 \uB0A8\uACA8\uBCF4\uC138\uC694."
    }), (item.sessions || []).map(s => /*#__PURE__*/(0, _jsxRuntime.jsxs)("article", {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("time", {
        children: new Date(s.date).toLocaleDateString('ko-KR')
      }), s.track && /*#__PURE__*/(0, _jsxRuntime.jsxs)("strong", {
        children: ["\u266B ", s.track]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
        children: s.notes
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
        className: "quiet",
        onClick: () => {
          if (window.confirm('이 감상을 삭제할까요?')) onSave({
            ...item,
            sessions: item.sessions.filter(x => x.id !== s.id)
          });
        },
        children: "\uC0AD\uC81C"
      })]
    }, s.id))]
  });
}
function TrashView({
  trash,
  onRestore,
  onClose,
  T
}) {
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(Sheet, {
    title: "\uCD5C\uADFC \uC0AD\uC81C\uD55C \uAE30\uB85D",
    T: T,
    onClose: onClose,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
      className: "hint",
      children: "\uC0AD\uC81C\uD55C \uAE30\uB85D\uACFC \uD3F4\uB354\uB97C \uBCF4\uAD00\uD569\uB2C8\uB2E4. \uBC31\uC5C5\uC5D0\uB3C4 \uD568\uAED8 \uB2F4\uACA8\uC694."
    }), !trash.length && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "empty-small",
      children: "\uC0AD\uC81C\uD55C \uAE30\uB85D\uC774 \uC5C6\uC5B4\uC694."
    }), [...trash].reverse().map(t => /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "trash-row",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("strong", {
          children: (t.protectedFolders || t.folders || []).some(f => f.locked) ? '🔒 잠긴 기록' : t.folders?.[0]?.name || t.items?.[0]?.title || t.items?.[0]?.notes?.slice(0, 40) || '삭제한 기록'
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("small", {
          children: [new Date(t.deletedAt).toLocaleString('ko-KR'), " \xB7 ", t.items.length, "\uAC1C"]
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
        className: "secondary",
        onClick: () => onRestore(t),
        children: "\uBCF5\uC6D0"
      })]
    }, t.id))]
  });
}

// SOURCE: settings.jsx
function SettingsScreen({
  settings,
  onChange,
  onExport,
  onImport,
  onWipe,
  stats,
  user,
  onLogin,
  onLogout,
  syncing,
  syncFailed,
  onRetrySync,
  onTrash,
  trashCount,
  T
}) {
  // 저장 공간 사용량 조회 (브라우저가 알려주는 값)
  const [usage, setUsage] = useState(null);
  useEffect(() => {
    (async () => {
      const u = await storageUsage();
      if (u) setUsage(u);
    })();
  }, []);
  const Row = ({
    icon,
    title,
    desc,
    right
  }) => /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "14px 16px",
      background: T.cardBg,
      borderRadius: 14,
      border: `1px solid ${T.border}`
    },
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      style: {
        fontSize: 20
      },
      children: icon
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: {
        flex: 1
      },
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        style: {
          fontSize: 14,
          fontWeight: 600,
          color: T.text
        },
        children: title
      }), desc && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        style: {
          fontSize: 11,
          color: T.dim2,
          marginTop: 2
        },
        children: desc
      })]
    }), right]
  });
  const sl = {
    fontSize: 11,
    fontWeight: 700,
    color: T.dim,
    letterSpacing: "0.08em",
    margin: "8px 4px 4px"
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: {
      padding: "16px 16px 48px",
      position: "relative",
      zIndex: 1,
      display: "flex",
      flexDirection: "column",
      gap: 10
    },
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      style: sl,
      children: "\uACC4\uC815"
    }), user ? /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: {
        background: T.cardBg,
        borderRadius: 14,
        border: `1px solid ${T.border}`,
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        gap: 12
      },
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 12
        },
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          style: {
            fontSize: 20
          },
          children: "\u2601\uFE0F"
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          style: {
            flex: 1,
            minWidth: 0
          },
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            style: {
              fontSize: 14,
              fontWeight: 600,
              color: T.text,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap"
            },
            children: user.email
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            style: {
              fontSize: 11,
              color: syncing ? "#FBBF24" : syncFailed ? "#F87171" : "#34D399",
              marginTop: 2
            },
            children: syncing ? "동기화 중..." : syncFailed ? "⚠️ 동기화 실패 — 인터넷 확인 후 다시 시도하세요" : "계정별 동기화 · 기기 저장 우선"
          })]
        }), syncFailed && !syncing && /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
          onClick: onRetrySync,
          style: {
            flexShrink: 0,
            background: "#F87171",
            border: "none",
            borderRadius: 9,
            color: "#fff",
            padding: "7px 13px",
            fontSize: 12,
            fontWeight: 700,
            cursor: "pointer"
          },
          children: "\uB2E4\uC2DC \uC2DC\uB3C4"
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
        onClick: onLogout,
        style: {
          padding: "10px",
          borderRadius: 10,
          border: `1px solid ${T.border}`,
          background: T.inputBg,
          color: T.muted,
          fontSize: 13,
          fontWeight: 600,
          cursor: "pointer",
          fontFamily: "'Noto Sans KR',sans-serif"
        },
        children: "\uB85C\uADF8\uC544\uC6C3"
      })]
    }) : /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      onClick: onLogin,
      style: {
        cursor: "pointer"
      },
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(Row, {
        icon: "\u2601\uFE0F",
        title: "\uB85C\uADF8\uC778 / \uAC00\uC785",
        desc: "\uBAA8\uB4E0 \uAE30\uAE30\uC5D0\uC11C \uAC19\uC740 \uAE30\uB85D \uBCF4\uAE30",
        right: /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          style: {
            color: "#C084FC",
            fontSize: 18
          },
          children: "\u203A"
        })
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      style: sl,
      children: "\uD654\uBA74"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(Row, {
      icon: settings.theme === "dark" ? "🌙" : "☀️",
      title: "\uD14C\uB9C8",
      desc: settings.theme === "dark" ? "다크 모드" : "라이트 모드",
      right: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        style: {
          display: "flex",
          gap: 4,
          background: T.inputBg,
          borderRadius: 10,
          padding: 3
        },
        children: [["dark", "🌙"], ["light", "☀️"]].map(([k, e]) => /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
          onClick: () => onChange({
            ...settings,
            theme: k
          }),
          style: {
            padding: "6px 12px",
            borderRadius: 8,
            border: "none",
            background: settings.theme === k ? "#7C3AED" : "transparent",
            color: settings.theme === k ? "#fff" : T.dim2,
            fontSize: 14,
            cursor: "pointer"
          },
          children: e
        }, k))
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(Row, {
      icon: "\uD83D\uDD03",
      title: "\uAE30\uBCF8 \uC815\uB82C",
      desc: "\uAE30\uB85D \uD45C\uC2DC \uC21C\uC11C",
      right: /*#__PURE__*/(0, _jsxRuntime.jsxs)("select", {
        value: settings.sortBy,
        onChange: e => onChange({
          ...settings,
          sortBy: e.target.value
        }),
        style: {
          background: T.inputBg,
          border: `1px solid ${T.border}`,
          borderRadius: 8,
          color: T.text,
          padding: "6px 10px",
          fontSize: 12,
          outline: "none",
          cursor: "pointer"
        },
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("option", {
          value: "newest",
          children: "\uCD5C\uC2E0\uC21C"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("option", {
          value: "oldest",
          children: "\uC624\uB798\uB41C\uC21C"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("option", {
          value: "rating",
          children: "\uD3C9\uC810\uC21C"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("option", {
          value: "title",
          children: "\uC81C\uBAA9\uC21C"
        })]
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      style: sl,
      children: "\uB370\uC774\uD130"
    }), usage && (() => {
      const fmt = b => b >= 1073741824 ? (b / 1073741824).toFixed(1) + "GB" : b >= 1048576 ? (b / 1048576).toFixed(1) + "MB" : Math.round(b / 1024) + "KB";
      const pct = usage.quota > 0 ? Math.min(usage.used / usage.quota * 100, 100) : 0;
      const warn = pct >= 80;
      return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        style: {
          background: T.cardBg,
          border: `1px solid ${warn ? "#FBBF2444" : T.border}`,
          borderRadius: 14,
          padding: "14px 16px",
          display: "flex",
          flexDirection: "column",
          gap: 9
        },
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          style: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          },
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            style: {
              fontSize: 13.5,
              fontWeight: 600,
              color: T.text
            },
            children: "\uD83D\uDCBE \uC800\uC7A5 \uACF5\uAC04"
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
            style: {
              fontSize: 12,
              color: warn ? "#FBBF24" : T.dim2,
              fontWeight: 600
            },
            children: [fmt(usage.used), usage.quota > 0 ? ` / ${fmt(usage.quota)}` : ""]
          })]
        }), usage.quota > 0 && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          style: {
            height: 7,
            borderRadius: 4,
            background: T.inputBg,
            overflow: "hidden"
          },
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            style: {
              width: `${Math.max(pct, 0.5)}%`,
              height: "100%",
              borderRadius: 4,
              background: warn ? "#FBBF24" : "linear-gradient(90deg,#7C3AED,#C084FC)",
              transition: "width .4s"
            }
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          style: {
            fontSize: 10.5,
            color: T.dim,
            lineHeight: 1.5
          },
          children: warn ? "저장 공간이 얼마 안 남았어요. 백업 후 오래된 사진을 정리해보세요" : `전체의 ${pct < 0.1 ? "0.1% 미만" : pct.toFixed(1) + "%"}을 쓰고 있어요 · 사진이 대부분을 차지해요`
        })]
      });
    })(), (() => {
      if (user) return null;
      const lb = settings.lastBackup;
      const days = lb ? Math.floor((Date.now() - new Date(lb).getTime()) / 86400000) : null;
      const stale = days === null || days >= 30;
      if (!stale) return null;
      return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        style: {
          background: "rgba(251,191,36,0.1)",
          border: "1px solid #FBBF2433",
          borderRadius: 12,
          padding: "12px 14px",
          display: "flex",
          gap: 10,
          alignItems: "center"
        },
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          style: {
            fontSize: 18
          },
          children: "\u26A0\uFE0F"
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          style: {
            flex: 1
          },
          children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            style: {
              fontSize: 13,
              fontWeight: 600,
              color: "#FBBF24"
            },
            children: ["\uBC31\uC5C5\uD55C \uC9C0 ", days === null ? "오래됐어요" : `${days}일 됐어요`]
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            style: {
              fontSize: 11,
              color: T.dim2,
              marginTop: 2
            },
            children: "\uB85C\uADF8\uC778\uD558\uBA74 \uC790\uB3D9\uC73C\uB85C \uD074\uB77C\uC6B0\uB4DC\uC5D0 \uC800\uC7A5\uB3FC\uC694"
          })]
        })]
      });
    })(), /*#__PURE__*/(0, _jsxRuntime.jsx)(Row, {
      icon: "\uD83D\uDDD1\uFE0F",
      title: "\uC0AD\uC81C \uC2DC \uD655\uC778",
      desc: "\uAE30\uB85D \uC0AD\uC81C \uC804 \uBB3C\uC5B4\uBCF4\uAE30",
      right: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        onClick: () => onChange({
          ...settings,
          confirmDelete: !settings.confirmDelete
        }),
        style: {
          width: 46,
          height: 26,
          borderRadius: 13,
          background: settings.confirmDelete ? "#7C3AED" : T.surface2,
          position: "relative",
          cursor: "pointer"
        },
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          style: {
            position: "absolute",
            top: 3,
            left: settings.confirmDelete ? 23 : 3,
            width: 20,
            height: 20,
            borderRadius: "50%",
            background: "#fff",
            transition: "left .2s"
          }
        })
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      onClick: onExport,
      style: {
        cursor: "pointer"
      },
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(Row, {
        icon: "\uD83D\uDCE4",
        title: "\uBC31\uC5C5 \uB0B4\uBCF4\uB0B4\uAE30",
        desc: settings.lastBackup ? `마지막 백업: ${new Date(settings.lastBackup).toLocaleDateString("ko-KR")}` : "모든 데이터(사진 포함)를 파일로",
        right: /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          style: {
            color: T.dim,
            fontSize: 18
          },
          children: "\u203A"
        })
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("label", {
      style: {
        cursor: "pointer"
      },
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(Row, {
        icon: "\uD83D\uDCE5",
        title: "\uBC31\uC5C5 \uBD88\uB7EC\uC624\uAE30",
        desc: "\uD30C\uC77C\uC5D0\uC11C \uBCF5\uC6D0",
        right: /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          style: {
            color: T.dim,
            fontSize: 18
          },
          children: "\u203A"
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
        type: "file",
        accept: ".json",
        onChange: onImport,
        style: {
          display: "none"
        }
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("button", {
      className: "secondary",
      onClick: onTrash,
      children: ["\uCD5C\uADFC \uC0AD\uC81C\uD55C \uAE30\uB85D \xB7 ", trashCount || 0]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
      className: "hint",
      children: "PIN\uC740 \uD654\uBA74 \uC7A0\uAE08\uC785\uB2C8\uB2E4. \uC774 \uBC84\uC804\uC740 \uC885\uB2E8\uAC04 \uC554\uD638\uD654\uB97C \uC81C\uACF5\uD558\uC9C0 \uC54A\uC544\uC694. \uC0AC\uC9C4\uC744 \uD3EC\uD568\uD55C \uBC31\uC5C5\uC744 \uB530\uB85C \uBCF4\uAD00\uD574\uC8FC\uC138\uC694."
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      style: sl,
      children: "\uD1B5\uACC4"
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: {
        background: T.cardBg,
        borderRadius: 14,
        border: `1px solid ${T.border}`,
        padding: "16px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 14
      },
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          style: {
            fontSize: 24,
            fontWeight: 700,
            color: T.text,
            fontFamily: "'Noto Serif KR',serif"
          },
          children: stats.total
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          style: {
            fontSize: 11,
            color: T.dim2
          },
          children: "\uC804\uCCB4 \uAE30\uB85D"
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          style: {
            fontSize: 24,
            fontWeight: 700,
            color: T.text,
            fontFamily: "'Noto Serif KR',serif"
          },
          children: stats.folders
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          style: {
            fontSize: 11,
            color: T.dim2
          },
          children: "\uD3F4\uB354"
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          style: {
            fontSize: 24,
            fontWeight: 700,
            color: "#FBBF24",
            fontFamily: "'Noto Serif KR',serif"
          },
          children: stats.avgRating
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          style: {
            fontSize: 11,
            color: T.dim2
          },
          children: "\uD3C9\uADE0 \uBCC4\uC810"
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          style: {
            fontSize: 24,
            fontWeight: 700,
            color: T.text,
            fontFamily: "'Noto Serif KR',serif"
          },
          children: stats.fiveStars
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          style: {
            fontSize: 11,
            color: T.dim2
          },
          children: "\u2B50 5\uC810 \uAE30\uB85D"
        })]
      })]
    }), stats.total > 0 && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: {
        background: T.cardBg,
        borderRadius: 14,
        border: `1px solid ${T.border}`,
        padding: "18px 16px"
      },
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        style: {
          fontSize: 12,
          fontWeight: 700,
          color: T.text,
          marginBottom: 14
        },
        children: "\uD83D\uDCC5 \uCD5C\uADFC 6\uAC1C\uC6D4 \uAE30\uB85D"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        style: {
          display: "flex",
          alignItems: "flex-end",
          gap: 8,
          height: 90
        },
        children: stats.monthCounts.map(mo => {
          const max = Math.max(...stats.monthCounts.map(m => m.count), 1);
          return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            style: {
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 5
            },
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
              style: {
                fontSize: 10.5,
                color: T.muted,
                fontWeight: 600
              },
              children: mo.count || ""
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
              style: {
                width: "100%",
                height: `${mo.count / max * 62 + 4}px`,
                background: mo.count ? "linear-gradient(180deg,#C084FC,#7C3AED)" : T.inputBg,
                borderRadius: 5,
                transition: "height .4s"
              }
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
              style: {
                fontSize: 10,
                color: T.dim2
              },
              children: mo.label
            })]
          }, mo.key);
        })
      })]
    }), stats.byType.length > 0 && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      style: {
        background: T.cardBg,
        borderRadius: 14,
        border: `1px solid ${T.border}`,
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        gap: 10
      },
      children: stats.byType.map(t => /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 10
        },
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          style: {
            fontSize: 16,
            width: 24
          },
          children: t.emoji
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          style: {
            fontSize: 13,
            color: T.text,
            width: 44
          },
          children: t.label
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          style: {
            flex: 1,
            height: 8,
            background: T.inputBg,
            borderRadius: 4,
            overflow: "hidden"
          },
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            style: {
              width: `${t.pct}%`,
              height: "100%",
              background: t.color,
              borderRadius: 4,
              transition: "width .4s"
            }
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
          style: {
            fontSize: 12,
            color: T.dim2,
            width: 48,
            textAlign: "right"
          },
          children: [t.count, "\uAC1C"]
        })]
      }, t.key))
    }), stats.total > 0 && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: {
        borderRadius: 16,
        padding: "20px",
        background: "linear-gradient(135deg, rgba(192,132,252,0.14), rgba(124,58,237,0.04))",
        border: `1px solid #C084FC33`,
        textAlign: "center"
      },
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        style: {
          fontSize: 11,
          color: "#C084FC",
          fontWeight: 700,
          letterSpacing: "0.1em",
          marginBottom: 8
        },
        children: [stats.thisYear, "\uB144\uC758 GIROK"]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        style: {
          fontFamily: "'Noto Serif KR',serif",
          fontSize: 16,
          fontWeight: 700,
          lineHeight: 1.5,
          color: T.text
        },
        children: ["\uC62C\uD574 ", stats.yearCount, "\uAC1C\uC758 \uC791\uD488\uC744 \uAE30\uB85D\uD588\uC5B4\uC694", stats.byType[0] ? /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
          children: [",", /*#__PURE__*/(0, _jsxRuntime.jsx)("br", {}), "\uAC00\uC7A5 \uB9CE\uC774 \uBCF8 \uAC74 ", stats.byType[0].emoji, " ", stats.byType[0].label, "\uC608\uC694"]
        }) : ""]
      }), stats.diaryCount > 0 && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        style: {
          fontSize: 12,
          color: T.dim2,
          marginTop: 8
        },
        children: ["\uC77C\uAE30\uB3C4 ", stats.diaryCount, "\uD3B8 \uC801\uC5C8\uC5B4\uC694 \uD83D\uDCD4"]
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      style: sl,
      children: "\uC704\uD5D8"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      onClick: onWipe,
      style: {
        cursor: "pointer"
      },
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(Row, {
        icon: "\u26A0\uFE0F",
        title: "\uBAA8\uB4E0 \uB370\uC774\uD130 \uC0AD\uC81C",
        desc: "\uCD5C\uADFC \uC0AD\uC81C\uD568\uC73C\uB85C \uC774\uB3D9",
        right: /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          style: {
            color: "#F87171",
            fontSize: 18
          },
          children: "\u203A"
        })
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      style: {
        textAlign: "center",
        fontSize: 11,
        color: T.dim,
        marginTop: 16
      },
      children: "GIROK \xB7 v5.0"
    })]
  });
}
function AuthScreen({
  onAuthed,
  onSkip,
  T
}) {
  const [mode, setMode] = useState("login"); // login | signup
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const inp = {
    width: "100%",
    background: T.inputBg,
    border: `1px solid ${T.borderStrong}`,
    borderRadius: 12,
    color: T.text,
    padding: "13px 14px",
    fontSize: 15,
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "'Noto Sans KR',sans-serif"
  };
  const submit = async () => {
    if (!sb) {
      setMsg("연결을 불러오지 못했어요. 잠시 후 다시 시도해주세요.");
      return;
    }
    if (!email.trim() || !pw) {
      setMsg("이메일과 비밀번호를 입력해주세요.");
      return;
    }
    setLoading(true);
    setMsg("");
    try {
      if (mode === "signup") {
        const {
          data,
          error
        } = await sb.auth.signUp({
          email: email.trim(),
          password: pw
        });
        if (error) {
          setMsg(error.message.includes("already") ? "이미 가입된 이메일이에요. 로그인해주세요." : "가입 실패: " + error.message);
          setLoading(false);
          return;
        }
        if (data.session) {
          await onAuthed(data.session.user);
        } else {
          setMsg("가입 완료! 이메일 인증이 필요할 수 있어요. 메일함을 확인하거나 바로 로그인해보세요.");
          setMode("login");
        }
      } else {
        const {
          data,
          error
        } = await sb.auth.signInWithPassword({
          email: email.trim(),
          password: pw
        });
        if (error) {
          setMsg("로그인 실패: 이메일/비밀번호를 확인해주세요.");
          setLoading(false);
          return;
        }
        await onAuthed(data.user);
      }
    } catch (e) {
      setMsg("오류가 발생했어요. 다시 시도해주세요.");
    }
    setLoading(false);
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: {
      minHeight: "100vh",
      background: T.bg,
      color: T.text,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: 24,
      position: "relative",
      overflow: "hidden"
    },
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      style: {
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        background: "radial-gradient(circle 600px at 50% 30%, #7C3AED33, #7C3AED11 45%, transparent 70%)"
      }
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: {
        position: "relative",
        zIndex: 1,
        width: "100%",
        maxWidth: 360,
        display: "flex",
        flexDirection: "column",
        gap: 16,
        alignItems: "center"
      },
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        style: {
          fontSize: 56
        },
        children: "\uD83D\uDCD6"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        style: {
          fontFamily: "'Noto Serif KR',serif",
          fontSize: 28,
          fontWeight: 700,
          letterSpacing: "0.08em"
        },
        children: "GIROK"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        style: {
          fontSize: 13,
          color: T.dim2,
          marginBottom: 8,
          textAlign: "center"
        },
        children: mode === "login" ? "로그인하면 모든 기기에서 같은 기록을 볼 수 있어요" : "새 계정을 만들어요"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
        style: inp,
        type: "email",
        placeholder: "\uC774\uBA54\uC77C",
        value: email,
        onChange: e => setEmail(e.target.value),
        autoCapitalize: "none"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
        style: inp,
        type: "password",
        placeholder: "\uBE44\uBC00\uBC88\uD638 (6\uC790 \uC774\uC0C1)",
        value: pw,
        onChange: e => setPw(e.target.value),
        onKeyDown: e => e.key === "Enter" && submit()
      }), msg && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        style: {
          fontSize: 12,
          color: msg.includes("완료") ? "#34D399" : "#F87171",
          textAlign: "center",
          lineHeight: 1.5
        },
        children: msg
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
        onClick: submit,
        disabled: loading,
        style: {
          width: "100%",
          padding: "14px",
          borderRadius: 14,
          border: "none",
          background: "linear-gradient(135deg,#7C3AED,#C084FC)",
          color: "#fff",
          fontSize: 15,
          fontWeight: 700,
          cursor: loading ? "default" : "pointer",
          opacity: loading ? 0.6 : 1,
          fontFamily: "'Noto Sans KR',sans-serif"
        },
        children: loading ? "처리 중..." : mode === "login" ? "로그인" : "가입하기"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
        onClick: () => {
          setMode(mode === "login" ? "signup" : "login");
          setMsg("");
        },
        style: {
          background: "none",
          border: "none",
          color: "#C084FC",
          fontSize: 13,
          cursor: "pointer",
          fontFamily: "'Noto Sans KR',sans-serif"
        },
        children: mode === "login" ? "계정이 없어요 → 가입하기" : "이미 계정이 있어요 → 로그인"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
        onClick: onSkip,
        style: {
          background: "none",
          border: "none",
          color: T.dim,
          fontSize: 12,
          cursor: "pointer",
          marginTop: 4,
          fontFamily: "'Noto Sans KR',sans-serif"
        },
        children: "\uB85C\uADF8\uC778 \uC5C6\uC774 \uC774 \uAE30\uAE30\uC5D0\uC11C\uB9CC \uC4F0\uAE30"
      })]
    })]
  });
}

// SOURCE: app.jsx
function App() {
  const [data, setData] = useState(null),
    [booting, setBooting] = useState(true),
    [bootError, setBootError] = useState(''),
    [user, setUser] = useState(null),
    [authChecked, setAuthChecked] = useState(false),
    [showAuth, setShowAuth] = useState(false);
  const [syncing, setSyncing] = useState(false),
    [syncFailed, setSyncFailed] = useState(false),
    [syncMessage, setSyncMessage] = useState(''),
    [cloudReady, setCloudReady] = useState(false);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS),
    [view, setView] = useState('folders'),
    [activeFolderId, setActiveFolderId] = useState(null),
    [unlockedFolders, setUnlockedFolders] = useState({});
  const [modal, setModal] = useState(null),
    [editTarget, setEditTarget] = useState(null),
    [pinTarget, setPinTarget] = useState(null),
    [search, setSearch] = useState(''),
    [globalSearch, setGlobalSearch] = useState('');
  const [sortInline, setSortInline] = useState(''),
    [gridView, setGridView] = useState(false),
    [albumView, setAlbumView] = useState('shelf'),
    [memoSort, setMemoSort] = useState('updated'),
    [diaryCalView, setDiaryCalView] = useState(false),
    [folderSort, setFolderSort] = useState('custom'),
    [filterType, setFilterType] = useState('all'),
    [filterRating, setFilterRating] = useState(0),
    [showFilters, setShowFilters] = useState(false);
  const [toast, setToast] = useState(null),
    [confirmCfg, setConfirmCfg] = useState(null),
    [detailItem, setDetailItem] = useState(null),
    [diaryDetail, setDiaryDetail] = useState(null),
    [memoDetail, setMemoDetail] = useState(null),
    [ledgerSub, setLedgerSub] = useState(null),
    [renameSub, setRenameSub] = useState(null),
    [ledgerStats, setLedgerStats] = useState(null),
    [showTrash, setShowTrash] = useState(false),
    [storageState, setStorageState] = useState({
      state: 'saved'
    });
  const [winW, setWinW] = useState(window.innerWidth),
    [sessionEpoch, setSessionEpoch] = useState(0);
  const dataRef = useRef(null),
    syncBusy = useRef(false),
    syncJob = useRef(Promise.resolve()),
    accountEpoch = useRef(0),
    pinAction = useRef(null),
    scrollPositions = useRef({});
  const T = THEMES[settings.theme] || THEMES.dark;
  useEffect(() => {
    const change = e => setStorageState(e.detail);
    window.addEventListener('girok:storage', change);
    return () => window.removeEventListener('girok:storage', change);
  }, []);
  const assign = d => {
    dataRef.current = d;
    setData(d);
  };
  const enterAccount = async next => {
    accountEpoch.current++;
    setBootError('');
    setSyncing(false);
    setBooting(true);
    setCloudReady(false);
    setSyncFailed(false);
    setSyncMessage('');
    await syncJob.current.catch(() => {});
    await _saveQueue;
    try {
      await initStorage(next?.id || 'guest');
      assign(loadData());
      setSettings(loadSettings());
      setUser(next);
      setUnlockedFolders({});
      setView('folders');
      setActiveFolderId(null);
      setModal(null);
      setShowAuth(false);
      setDetailItem(null);
      setDiaryDetail(null);
      setMemoDetail(null);
      setLedgerSub(null);
      setLedgerStats(null);
      setConfirmCfg(null);
      setShowTrash(false);
      setGlobalSearch('');
      setSearch('');
      setSessionEpoch(n => n + 1);
      setBooting(false);
    } catch (e) {
      setBootError(e.message);
    }
    setAuthChecked(true);
  };
  useEffect(() => {
    (async () => {
      let next = null;
      try {
        if (sb) {
          const result = await Promise.race([sb.auth.getSession(), new Promise((_, reject) => setTimeout(() => reject(Error('로그인 확인 시간 초과')), 10000))]);
          next = result.data?.session?.user || null;
        }
      } catch {}
      await enterAccount(next);
    })();
  }, []);
  useEffect(() => {
    const h = () => setWinW(window.innerWidth);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);
  const syncNow = async () => {
    if (!user || !dataRef.current || syncBusy.current || booting) return false;
    syncBusy.current = true;
    setSyncing(true);
    const epoch = accountEpoch.current,
      who = user.id;
    const job = (async () => {
      try {
        const remote = await cloudPull(who);
        if (epoch !== accountEpoch.current) return false;
        const current = dataRef.current;
        if (remote && current._dirty && remote.updated_at !== current._remoteStamp) throw Error('다른 기기의 변경과 겹쳤어요. 기기 기록을 백업하고 새로고침 전에 확인해주세요. 자동 덮어쓰기를 멈췄습니다.');
        if (remote && !current._dirty) {
          if (remote.updated_at !== current._remoteStamp) {
            const rd = {
              ...validateData(remote.data),
              _dirty: false,
              _remoteStamp: remote.updated_at
            };
            const restored = await restoreBackupAtomic({
              data: rd,
              imgs: remote.images || {},
              settings: loadSettings(),
              version: '5.0'
            });
            // If an edit arrived during restore, preserve it and flag a conflict instead of replacing the UI.
            if (dataRef.current !== current) {
              await saveData(dataRef.current);
              throw Error('동기화 중 새 기록이 생겼어요. 기기 내용을 보존했습니다. 다시 시도해주세요.');
            }
            assign(restored);
          }
        } else if (current._dirty) {
          const snapshot = structuredClone(current),
            photos = await idbAll(),
            imgs = {};
          for (const [k, v] of Object.entries(photos)) imgs[k] = typeof v === 'string' ? v : await blobToDataUrl(v);
          if (epoch !== accountEpoch.current) return false;
          const stamp = await cloudPush(who, snapshot, imgs, remote?.updated_at || null);
          if (epoch !== accountEpoch.current) return false;
          const latest = dataRef.current;
          const next = {
            ...latest,
            _remoteStamp: stamp,
            _dirty: latest._revision !== snapshot._revision
          };
          assign(next);
          await saveData(next);
        }
        setSyncFailed(false);
        setSyncMessage('');
        setCloudReady(true);
        return true;
      } catch (e) {
        if (epoch === accountEpoch.current) {
          setSyncFailed(true);
          setSyncMessage(e.message);
        }
        return false;
      } finally {
        syncBusy.current = false;
        if (epoch === accountEpoch.current) setSyncing(false);
      }
    })();
    syncJob.current = job;
    return job;
  };
  const doPush = syncNow;
  useEffect(() => {
    if (booting || !user) return;
    syncNow();
  }, [sessionEpoch, booting, user?.id]);
  useEffect(() => {
    if (!user || booting || !cloudReady || !data?._dirty) return;
    const timer = setTimeout(syncNow, 1500);
    return () => clearTimeout(timer);
  }, [data, user, booting, cloudReady]);
  useEffect(() => {
    const online = () => syncNow();
    window.addEventListener('online', online);
    return () => window.removeEventListener('online', online);
  });
  const closeTop = () => {
    if (confirmCfg) {
      confirmCfg.onCancel?.();
      setConfirmCfg(null);
      return;
    }
    if (modal === 'memo') {
      window.dispatchEvent(new Event('girok:close-editor'));
      return;
    }
    // Editors own draft handling. Do not silently discard through a global gesture.
    if (modal) return;
    if (showTrash) {
      setShowTrash(false);
      return;
    }
    if (memoDetail) {
      setMemoDetail(null);
      return;
    }
    if (diaryDetail) {
      setDiaryDetail(null);
      return;
    }
    if (detailItem) {
      setDetailItem(null);
      return;
    }
    if (ledgerStats) {
      setLedgerStats(null);
      return;
    }
    if (ledgerSub) {
      setLedgerSub(null);
      return;
    }
    if (view !== 'folders') {
      setView('folders');
      setActiveFolderId(null);
    }
  };
  useEffect(() => {
    let start = null;
    const touch = e => {
      const t = e.touches[0];
      start = {
        x: t.clientX,
        y: t.clientY
      };
    };
    const end = e => {
      if (!start) return;
      const t = e.changedTouches[0];
      if (start.x < 28 && t.clientX - start.x > 90 && Math.abs(t.clientY - start.y) < 35) closeTop();
      start = null;
    };
    const key = e => {
      if (e.key === 'Escape' && !e.defaultPrevented) closeTop();
    };
    window.addEventListener('touchstart', touch, {
      passive: true
    });
    window.addEventListener('touchend', end, {
      passive: true
    });
    window.addEventListener('keydown', key);
    return () => {
      window.removeEventListener('touchstart', touch);
      window.removeEventListener('touchend', end);
      window.removeEventListener('keydown', key);
    };
  });
  useEffect(() => {
    const key = view + ':' + activeFolderId;
    const raf = requestAnimationFrame(() => window.scrollTo(0, scrollPositions.current[key] || 0));
    return () => {
      cancelAnimationFrame(raf);
      scrollPositions.current[key] = window.scrollY;
    };
  }, [view, activeFolderId]);
  useEffect(() => {
    const overlay = !!(modal || detailItem || memoDetail || diaryDetail || ledgerSub || ledgerStats || showTrash || confirmCfg);
    if (!overlay) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [modal, detailItem, memoDetail, diaryDetail, ledgerSub, ledgerStats, showTrash, confirmCfg]);
  const isWide = winW >= 760; // 데스크탑/넓은 화면
  const showToast = (msg, type = "ok") => {
    setToast({
      msg,
      type
    });
    setTimeout(() => setToast(null), 2500);
  };
  const canRead = folderId => {
    const f = dataRef.current?.folders.find(f => f.id === folderId);
    return !!f && (!f.locked || unlockedFolders[f.id]);
  };
  const persist = async value => {
    const before = dataRef.current;
    let nd = typeof value === 'function' ? value(before) : value;
    const removed = before.items.filter(i => !nd.items.some(n => n.id === i.id));
    const folders = before.folders.filter(f => !nd.folders.some(n => n.id === f.id));
    nd = {
      ...nd,
      schemaVersion: 5,
      _lastMod: new Date().toISOString(),
      _revision: uid(),
      _dirty: true
    };
    if (removed.length || folders.length) {
      const parentIds = new Set(removed.map(i => i.folderId || before.items.find(x => x.id === i.ledgerSubId)?.folderId));
      const protectedFolders = before.folders.filter(f => f.locked && (parentIds.has(f.id) || folders.some(x => x.id === f.id)));
      nd.trash = [...(nd.trash || []), {
        id: uid(),
        deletedAt: new Date().toISOString(),
        items: removed,
        folders,
        protectedFolders
      }];
    }
    assign(nd);
    const ok = await saveData(nd);
    if (!ok && dataRef.current === nd) {
      assign(before);
      _mem.data = before;
    }
    return ok;
  };
  const putItem = async item => persist(current => ({
    ...current,
    items: current.items.some(i => i.id === item.id) ? current.items.map(i => i.id === item.id ? item : i) : [item, ...current.items]
  }));
  const saveMemo = async (m, options = {}) => {
    const old = dataRef.current.items.find(i => i.id === m.id);
    let history = old?.history || [];
    if (old && (old.html !== m.html || old.title !== m.title) && (options.forceHistory || !history.length || Date.now() - new Date(history[0].savedAt).getTime() > 300000)) history = [{
      html: old.html,
      title: old.title || '',
      savedAt: new Date().toISOString()
    }, ...history].slice(0, 20);
    const ok = await putItem({
      ...m,
      history
    });
    return ok;
  };
  const secure = (folder, action) => {
    if (folder.locked && !unlockedFolders[folder.id]) {
      pinAction.current = action;
      setPinTarget(folder);
      setModal('pin-unlock');
    } else action();
  };
  const restoreTrash = t => {
    const locks = (t.protectedFolders || t.folders || []).filter(f => f.locked);
    const restore = async () => {
      const current = dataRef.current,
        parents = [...current.folders, ...(t.folders || [])],
        records = [...current.items, ...t.items];
      if (t.items.some(i => i._kind === 'ledgerEntry' ? !records.some(x => x.id === i.ledgerSubId) : !parents.some(f => f.id === i.folderId))) {
        showToast('상위 폴더나 가계부를 먼저 복원해주세요', 'err');
        return;
      }
      const ok = await persist(c => ({
        ...c,
        folders: [...c.folders, ...(t.folders || []).filter(f => !c.folders.some(x => x.id === f.id))],
        items: [...c.items, ...t.items.filter(i => !c.items.some(x => x.id === i.id))],
        trash: c.trash.filter(x => x.id !== t.id)
      }));
      if (ok) showToast('복원했어요');
    };
    const unlock = index => {
      if (index === locks.length) return restore();
      secure(locks[index], () => unlock(index + 1));
    };
    unlock(0);
  };
  // 과거 일기의 활동 키워드 수집 (자동완성용)
  const pastActivities = useMemo(() => {
    const set = new Set();
    (data?.items || []).filter(i => canRead(i.folderId)).forEach(i => {
      if (Array.isArray(i.activities)) i.activities.forEach(a => a && set.add(a));
    });
    return [...set].slice(0, 20);
  }, [data, unlockedFolders]);
  // 기존 기록에서 필드별 키워드 수집 (자동완성용)
  const savedKeywords = useMemo(() => {
    const keys = ["genre", "country", "platform", "publisher", "creator"];
    const byType = {};
    (data?.items || []).filter(i => canRead(i.folderId)).forEach(i => {
      const t = i._displayType || (data?.folders || []).find(f => f.id === i.folderId)?.folderType;
      if (!t || t === "diary") return;
      if (!byType[t]) byType[t] = {};
      keys.forEach(k => {
        const v = i[k];
        if (v && typeof v === "string") {
          if (!byType[t][k]) byType[t][k] = new Set();
          v.split(/[,，]/).map(s => s.trim()).filter(Boolean).forEach(s => byType[t][k].add(s));
        }
      });
    });
    const out = {};
    Object.keys(byType).forEach(t => {
      out[t] = {};
      Object.keys(byType[t]).forEach(k => {
        out[t][k] = [...byType[t][k]].slice(0, 30);
      });
    });
    return out;
  }, [data, unlockedFolders]);
  const updateSettings = s => {
    setSettings(s);
    saveSettings(s);
  };
  if (bootError) return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: "boot-screen",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("h1", {
      children: "\uAE30\uB85D\uC744 \uC5F4\uC9C0 \uBABB\uD588\uC5B4\uC694"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
      children: bootError
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
      children: "\uAE30\uC874 \uAE30\uB85D\uC740 \uCD08\uAE30\uD654\uD558\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4."
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
      onClick: () => location.reload(),
      children: "\uB2E4\uC2DC \uC2DC\uB3C4"
    })]
  });
  if (!data || booting || !authChecked) return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: "boot-screen",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      children: "\uD83D\uDCD6"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("h1", {
      children: "GIROK"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
      children: "\uAE30\uB85D\uC744 \uC5EC\uB294 \uC911\u2026"
    })]
  });
  // 로그인 안 됐고, 건너뛰기도 안 했으면 로그인 화면
  // 로그인은 선택 — 강제하지 않음. 설정에서 원할 때 로그인.
  if (showAuth) return /*#__PURE__*/(0, _jsxRuntime.jsx)(AuthScreen, {
    T: T,
    onAuthed: enterAccount,
    onSkip: () => setShowAuth(false)
  });
  const activeFolder = data.folders.find(f => f.id === activeFolderId);
  const isAllFolder = activeFolder?.folderType === "all";
  // "전체" 폴더에는 일반 컬렉션(영화·앨범·게임 등)만 모음.
  // 일기/가계부/메모/챌린지는 성격이 달라서 제외 (각자 전용 폴더에서만 봄)
  const SPECIAL_TYPES = ["diary", "ledger", "memo"];
  const itemsInFolder = folder => !canRead(folder.id) ? [] : folder.folderType === "all" ? data.items.filter(i => {
    const dt = data.folders.find(f => f.id === i.folderId)?.folderType;
    return canRead(i.folderId) && !SPECIAL_TYPES.includes(dt) && !i._kind;
  }) : folder.folderType === "memo" ? data.items.filter(i => i.folderId === folder.id && i._kind === "memo") : data.items.filter(i => i.folderId === folder.id && !i._kind);
  const ledgerSubs = ledgerFolderId => data.items.filter(i => i._kind === "ledgerSub" && i.folderId === ledgerFolderId).sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));
  const folderItemCount = folder => !canRead(folder.id) ? 0 : folder.folderType === "ledger" ? ledgerSubs(folder.id).length : itemsInFolder(folder).length;
  const sortedFolders = (() => {
    const arr = [...data.folders];
    const all = arr.filter(f => f.folderType === "all");
    const rest = arr.filter(f => f.folderType !== "all");
    // 폴더별 마지막 기록 시간 (최근 작성순용)
    const lastWrite = {};
    data.items.forEach(i => {
      const fid = i.folderId || (i._kind === "ledgerEntry" ? null : null);
      if (!fid) return;
      const t = i.createdAt || "";
      if (!lastWrite[fid] || t > lastWrite[fid]) lastWrite[fid] = t;
    });
    const cmp = (a, b) => {
      if (folderSort === "name") return a.name.localeCompare(b.name, "ko");
      if (folderSort === "count") return folderItemCount(b) - folderItemCount(a);
      if (folderSort === "newest") return (b.createdAt || "").localeCompare(a.createdAt || "");
      if (folderSort === "oldest") return (a.createdAt || "").localeCompare(b.createdAt || "");
      if (folderSort === "recent") return (lastWrite[b.id] || "").localeCompare(lastWrite[a.id] || "");
      return 0;
    };
    const pinned = rest.filter(f => f.pinned); // 고정은 정렬 안 함 (원래 순서 유지)
    const normal = rest.filter(f => !f.pinned).sort(cmp);
    return [...all, ...pinned, ...normal];
  })();
  const togglePin = async folder => {
    if (!(await persist(c => ({
      ...c,
      folders: c.folders.map(f => f.id === folder.id ? {
        ...f,
        pinned: !f.pinned
      } : f)
    })))) return;
    showToast(folder.pinned ? "고정 해제" : "📌 폴더를 위로 고정했어요");
  };
  const openFolder = folder => secure(folder, () => {
    setActiveFolderId(folder.id);
    setView('items');
    setSearch('');
    setFilterType('all');
    setFilterRating(0);
    setSortInline('');
  });

  // 항목의 표시 타입. _kind가 있으면 그게 우선 (가계부 거래는 folderId가 없어서
  // 폴더 조회에 실패 → 예전엔 "movie"로 잘못 분류됐음)
  const getItemDisplayType = i => {
    if (i._kind === "ledgerEntry" || i._kind === "ledgerSub") return "ledger";
    if (i._kind === "memo") return "memo";
    return i._displayType || data.folders.find(f => f.id === i.folderId)?.folderType || "movie";
  };
  const isDiaryFolder = folder => folder?.folderType === "diary";
  const isMemoFolder = folder => folder?.folderType === "memo";
  const folderStreak = folder => canRead(folder.id) && folder.folderType === "diary" ? calcStreak(data.items.filter(i => i.folderId === folder.id)) : 0;
  const isLedgerFolder = folder => folder?.folderType === "ledger";
  // 하위폴더(가계부) 목록은 위에서 정의됨 (folderItemCount보다 먼저)
  const ledgerEntries = subId => data.items.filter(i => i._kind === "ledgerEntry" && i.ledgerSubId === subId);
  const ledgerSubTotal = subId => {
    const es = ledgerEntries(subId).filter(e => !e.isPlanned);
    return {
      income: es.filter(e => e.lType === "income").reduce((s, e) => s + (e.amount || 0), 0),
      expense: es.filter(e => e.lType === "expense").reduce((s, e) => s + (e.amount || 0), 0)
    };
  };
  // 계좌별 잔액: 해당 ledger 폴더의 모든 하위폴더 거래 중 account 일치분 (accId=null이면 전체)
  // 거래별 잔액: 각 거래 직후 그 계좌의 잔액 (entryId → balance). 예정 제외, 날짜+등록순 누적
  const ledgerBalanceMap = ledgerFolderId => {
    const folder = data.folders.find(f => f.id === ledgerFolderId);
    const accs = folder?.accounts || [];
    const bal = {};
    accs.forEach(a => {
      bal[a.id] = a.initial || 0;
    });
    const subIds = data.items.filter(i => i._kind === "ledgerSub" && i.folderId === ledgerFolderId).map(s => s.id);
    const es = data.items.filter(i => i._kind === "ledgerEntry" && subIds.includes(i.ledgerSubId) && !i.isPlanned).sort((a, b) => (a.lDate || "").localeCompare(b.lDate || "") || (a.createdAt || "").localeCompare(b.createdAt || ""));
    const map = {};
    es.forEach(e => {
      if (e.lType === "income" && e.account != null) bal[e.account] = (bal[e.account] || 0) + (e.amount || 0);else if (e.lType === "expense" && e.account != null) bal[e.account] = (bal[e.account] || 0) - (e.amount || 0);else if (e.lType === "transfer") {
        if (e.fromAccount != null) bal[e.fromAccount] = (bal[e.fromAccount] || 0) - (e.amount || 0);
        if (e.toAccount != null) bal[e.toAccount] = (bal[e.toAccount] || 0) + (e.amount || 0);
      }
      const acc = e.lType === "transfer" ? e.fromAccount : e.account;
      if (acc != null && bal[acc] != null) map[e.id] = bal[acc];
    });
    return map;
  };
  const accountBalance = (ledgerFolderId, accId) => {
    const folder = data.folders.find(f => f.id === ledgerFolderId);
    const accs = folder?.accounts || [];
    const initSum = accId == null ? accs.reduce((s, a) => s + (a.initial || 0), 0) : (accs.find(a => a.id === accId) || {}).initial || 0;
    const subIds = data.items.filter(i => i._kind === "ledgerSub" && i.folderId === ledgerFolderId).map(s => s.id);
    const all = data.items.filter(i => i._kind === "ledgerEntry" && subIds.includes(i.ledgerSubId) && !i.isPlanned);
    const income = all.filter(e => e.lType === "income" && (accId == null || e.account === accId)).reduce((s, e) => s + (e.amount || 0), 0);
    const expense = all.filter(e => e.lType === "expense" && (accId == null || e.account === accId)).reduce((s, e) => s + (e.amount || 0), 0);
    let transfer = 0;
    if (accId != null) {
      const tin = all.filter(e => e.lType === "transfer" && e.toAccount === accId).reduce((s, e) => s + (e.amount || 0), 0);
      const tout = all.filter(e => e.lType === "transfer" && e.fromAccount === accId).reduce((s, e) => s + (e.amount || 0), 0);
      transfer = tin - tout;
    }
    return {
      income,
      expense,
      balance: initSum + income - expense + transfer
    };
  };

  // ── UNIFIED SEARCH: title, creator/fields, tags, status label, album kind ──
  const matchItem = (i, q) => [i.title, i.notes, i.oneLiner, i.creator, i.genre, i.mood, ...Object.values(i.values || {}), ...(i.activities || []), ...(i.sessions || []).flatMap(x => [x.notes, x.track])].filter(v => v != null).join(' ').toLocaleLowerCase().includes(q.trim().toLocaleLowerCase());
  const sortFn = (a, b) => {
    const order = sortInline || settings.sortBy;
    if (order === 'title') return String(a.title || a.notes || '').localeCompare(String(b.title || b.notes || ''), 'ko');
    if (order === 'rating') return (b.rating || 0) - (a.rating || 0);
    if (order === 'ratingLow') return (a.rating || 0) - (b.rating || 0);
    return order === 'oldest' ? String(a.createdAt || '').localeCompare(b.createdAt || '') : String(b.createdAt || '').localeCompare(a.createdAt || '');
  };
  const passFilter = i => SPECIAL_TYPES.includes(getItemDisplayType(i)) || (filterType === 'all' || getItemDisplayType(i) === filterType) && (!filterRating || (i.rating || 0) >= filterRating);
  const filteredItems = activeFolder ? itemsInFolder(activeFolder).filter(i => (!search || matchItem(i, search)) && passFilter(i)).sort(sortFn) : [];
  const globalResults = globalSearch.trim() ? data.items.filter(i => canRead(i.folderId) && !['ledgerEntry', 'ledgerSub'].includes(i._kind) && matchItem(i, globalSearch)).sort(sortFn) : [];
  const filterActive = filterType !== "all" || filterRating > 0;
  const handleLogout = async () => {
    if (dataRef.current?._dirty && user && !window.confirm('아직 동기화되지 않은 기록은 이 기기의 해당 계정에 남습니다. 로그아웃할까요?')) return;
    if (sb) {
      const {
        error
      } = await sb.auth.signOut();
      if (error) {
        showToast('로그아웃하지 못했어요', 'err');
        return;
      }
    }
    await enterAccount(null);
  };
  const handleExport = async () => {
    try {
      showToast('백업 준비 중…');
      await _saveQueue;
      const raw = await idbAll(),
        imgs = {};
      for (const [k, v] of Object.entries(raw)) imgs[k] = typeof v === 'string' ? v : await blobToDataUrl(v);
      downloadJson({
        data: dataRef.current,
        imgs,
        settings: loadSettings(),
        version: '5.0'
      }, 'GIROK_' + nowStamp() + '.json');
      await saveSettings({
        ...settings,
        lastBackup: new Date().toISOString()
      });
      setSettings(loadSettings());
      showToast('백업 파일을 만들었어요');
    } catch (e) {
      showToast('백업 실패: ' + e.message, 'err');
    }
  };
  const handleImport = async e => {
    const file = e.target.files[0];
    e.target.value = '';
    if (!file) return;
    try {
      const bundle = JSON.parse(await file.text());
      validateData(bundle.data || bundle);
      if (!window.confirm('현재 계정의 기록을 이 백업으로 교체할까요? 현재 기록을 먼저 내보내는 것을 권장합니다.')) return;
      await _saveQueue;
      const restored = await restoreBackupAtomic(bundle);
      restored._dirty = true;
      restored._revision = uid();
      restored._lastMod = new Date().toISOString();
      restored._remoteStamp = dataRef.current?._remoteStamp;
      assign(restored);
      if (!(await saveData(restored))) throw Error('복원한 기록의 최종 저장을 완료하지 못했어요. 백업 파일을 보관해주세요.');
      setSettings(loadSettings());
      setView('folders');
      setActiveFolderId(null);
      setUnlockedFolders({});
      showToast('복원 완료');
    } catch (e) {
      showToast(e.message || '백업을 읽을 수 없어요', 'err');
    }
  };
  const askConfirm = cfg => setConfirmCfg(cfg);
  const deleteFromEditor = item => new Promise(resolve => askConfirm({
    title: '기록 삭제',
    message: '최근 삭제함으로 옮길까요?',
    onCancel: () => resolve(false),
    onConfirm: async () => {
      const ok = await persist(c => ({
        ...c,
        items: c.items.filter(i => i.id !== item.id)
      }));
      setConfirmCfg(null);
      if (ok) {
        setModal(null);
        setEditTarget(null);
      }
      resolve(ok);
    }
  }));
  const handleWipe = () => askConfirm({
    title: '현재 계정 기록 비우기',
    message: '기록과 폴더를 최근 삭제함으로 옮깁니다. 이전 버전 저장소에는 영향을 주지 않습니다.',
    confirmText: '비우기',
    onConfirm: async () => {
      if (!(await persist({
        ...structuredClone(DEFAULT_DATA),
        _remoteStamp: dataRef.current._remoteStamp,
        trash: dataRef.current.trash || []
      }))) return;
      setView('folders');
      setActiveFolderId(null);
      setConfirmCfg(null);
    }
  });
  const delItem = id => {
    const doDel = async () => {
      const ok = await persist(c => ({
        ...c,
        items: c.items.filter(i => i.id !== id)
      }));
      setConfirmCfg(null);
      if (ok) showToast('최근 삭제함으로 옮겼어요');
    };
    if (settings.confirmDelete) askConfirm({
      title: '기록 삭제',
      message: '최근 삭제함으로 옮길까요?',
      onConfirm: doDel
    });else doDel();
  };
  const delFolder = folder => askConfirm({
    title: '폴더 삭제',
    message: `"${folder.name}" 폴더와 기록을 최근 삭제함으로 옮길까요?`,
    onConfirm: async () => {
      const ok = await persist(c => {
        const subIds = c.items.filter(i => i._kind === 'ledgerSub' && i.folderId === folder.id).map(i => i.id);
        return {
          ...c,
          folders: c.folders.filter(f => f.id !== folder.id),
          items: c.items.filter(i => i.folderId !== folder.id && !subIds.includes(i.ledgerSubId))
        };
      });
      setConfirmCfg(null);
      if (!ok) return;
      setModal(null);
      setEditTarget(null);
      setView('folders');
      setActiveFolderId(null);
      showToast('폴더를 최근 삭제함으로 옮겼어요');
    }
  });
  const stats = (() => {
    const items = data.items.filter(i => canRead(i.folderId) && !i._kind && !SPECIAL_TYPES.includes(getItemDisplayType(i)));
    const total = items.length;
    const rated = items.filter(i => i.rating > 0);
    const avg = rated.length ? (rated.reduce((s, i) => s + i.rating, 0) / rated.length).toFixed(1) : "-";
    const five = items.filter(i => i.rating >= 5).length;
    const counts = {};
    items.forEach(i => {
      const t = getItemDisplayType(i);
      counts[t] = (counts[t] || 0) + 1;
    });
    const byType = Object.entries(counts).map(([key, count]) => ({
      key,
      count,
      label: FOLDER_TYPES[key]?.label || key,
      emoji: FOLDER_TYPES[key]?.emoji || "",
      color: FOLDER_TYPES[key]?.color || "#888",
      pct: total ? Math.round(count / total * 100) : 0
    })).sort((a, b) => b.count - a.count);
    const now = new Date();
    const months = [];
    for (let m = 5; m >= 0; m--) {
      const d = new Date(now.getFullYear(), now.getMonth() - m, 1);
      months.push({
        label: `${d.getMonth() + 1}월`,
        key: `${d.getFullYear()}-${d.getMonth()}`
      });
    }
    const monthCounts = months.map(mo => ({
      ...mo,
      count: items.filter(i => {
        const d = new Date(i.createdAt);
        return `${d.getFullYear()}-${d.getMonth()}` === mo.key;
      }).length
    }));
    const thisYear = now.getFullYear();
    const yearCount = items.filter(i => new Date(i.createdAt).getFullYear() === thisYear).length;
    const diaryCount = data.items.filter(i => canRead(i.folderId) && getItemDisplayType(i) === "diary").length;
    return {
      total,
      folders: data.folders.length - 1,
      avgRating: avg,
      fiveStars: five,
      byType,
      monthCounts,
      thisYear,
      yearCount,
      diaryCount
    };
  })();
  const bgColor = view === "items" && activeFolder ? activeFolder.color : "#7C3AED";
  const headerTitle = view === "settings" ? "설정" : view === "folders" ? "GIROK" : `${isAllFolder ? "📚" : FOLDER_TYPES[activeFolder?.folderType]?.emoji} ${activeFolder?.name}`;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: "girok-root",
    style: {
      '--bg': T.bg,
      '--surface': T.surface,
      '--surface2': T.surface2,
      '--text': T.text,
      '--muted': T.muted,
      '--dim': T.dim2,
      '--border': T.borderStrong,
      '--input': T.inputBg
    },
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("link", {
      href: "https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;600;700&family=Noto+Serif+KR:wght@400;700&display=swap",
      rel: "stylesheet"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("style", {
      children: `*{box-sizing:border-box;margin:0;padding:0;font-family:'Noto Sans KR',sans-serif;}body{background:${T.bg}}
      @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}@keyframes slideUp{from{transform:translateY(100%)}to{transform:translateY(0)}}@keyframes fadeIn{from{opacity:0}to{opacity:1}}
      @keyframes bootPop{0%{opacity:0;transform:scale(.4) translateY(20px)}100%{opacity:1;transform:scale(1) translateY(0)}}
      @keyframes bootDot{0%,80%,100%{opacity:.25;transform:scale(0.7)}40%{opacity:1;transform:scale(1.15)}}
      @keyframes floatBook{0%,100%{transform:translateY(0) rotate(-2deg)}50%{transform:translateY(-12px) rotate(2deg)}}
      @keyframes breathe{0%,100%{opacity:.55;transform:scale(1)}50%{opacity:1;transform:scale(1.08)}}
      @keyframes shimmerIn{0%{opacity:0;letter-spacing:.3em}100%{opacity:1;letter-spacing:.1em}}
      @keyframes screenIn{0%{opacity:0;transform:translateY(10px)}100%{opacity:1;transform:translateY(0)}}
      /* 정렬 바뀔 때 카드가 스르륵 자리잡는 느낌 (가벼운 fade+살짝 위로) */
      @keyframes sortIn{0%{opacity:0;transform:translateY(7px)}100%{opacity:1;transform:translateY(0)}}
      .sort-anim{animation:sortIn .26s ease-out both;}
      /* Quill 다크 테마 맞춤 (기본 스타일이 밝은 테마라 덮어씀) */
      .ql-toolbar.ql-snow{border:none!important;border-bottom:1px solid ${T.border}!important;padding:7px 8px!important;background:${T.surface2};}
      /* 툴바 버튼은 탭 반응 빠르게 (300ms 지연 제거) */
      .ql-toolbar.ql-snow button,.ql-toolbar.ql-snow .ql-picker-label{touch-action:manipulation;}
      /* iOS 키보드: dvh는 키보드가 뜨면 자동으로 줄어드는 단위 (vh는 안 변함) */
      @supports (height:100dvh){
        .sheet-kb{max-height:90dvh!important;}
      }
      .ql-container.ql-snow{border:none!important;font-family:'Noto Sans KR',sans-serif!important;font-size:14.5px!important;}
      .ql-editor{color:${T.text};line-height:1.75;padding:12px 14px!important;}
      .ql-editor.ql-blank::before{color:${T.dim}!important;font-style:normal!important;left:14px!important;}
      .ql-snow .ql-stroke{stroke:${T.muted}!important;}
      .ql-snow .ql-fill{fill:${T.muted}!important;}
      .ql-snow .ql-picker-label{color:${T.muted}!important;}
      .ql-snow .ql-picker-options{background:${T.surface}!important;border-color:${T.border}!important;z-index:50;}
      /* 색상 팔레트가 잘리지 않게 (부모 overflow 대신 자식에서 모서리 처리) */
      .ql-toolbar.ql-snow{border-radius:10px 10px 0 0;}
      .ql-container.ql-snow{border-radius:0 0 10px 10px;}
      .ql-snow.ql-toolbar button:hover .ql-stroke,.ql-snow.ql-toolbar button.ql-active .ql-stroke{stroke:#C084FC!important;}
      .ql-snow.ql-toolbar button:hover .ql-fill,.ql-snow.ql-toolbar button.ql-active .ql-fill{fill:#C084FC!important;}
      .ql-snow.ql-toolbar button.ql-active{background:rgba(192,132,252,0.12);border-radius:5px;}
      /* 제목 3단계 — 크기 차이가 확실히 보이게 */
      /* 구버전 메모의 제목 태그 (지금은 글자크기로 대체) */
      .ql-editor h1,.memo-html h1{font-family:'Noto Serif KR',serif;color:${T.text};font-size:24px;font-weight:700;margin:10px 0 5px;line-height:1.35;}
      .ql-editor h2,.memo-html h2{font-family:'Noto Serif KR',serif;color:${T.text};font-size:19px;font-weight:700;margin:9px 0 4px;line-height:1.4;}
      .ql-editor h3,.memo-html h3{font-family:'Noto Serif KR',serif;color:${T.text};font-size:16px;font-weight:700;margin:8px 0 3px;line-height:1.45;}
      /* 폰트 3종 */
      .ql-font-sans,.memo-html .ql-font-sans{font-family:'Noto Sans KR',sans-serif;}
      .ql-font-serif,.memo-html .ql-font-serif{font-family:'Noto Serif KR',serif;}
      .ql-font-mono,.memo-html .ql-font-mono{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;}
      /* 정렬 */
      .ql-align-center,.memo-html .ql-align-center{text-align:center;}
      .ql-align-right,.memo-html .ql-align-right{text-align:right;}
      .ql-align-justify,.memo-html .ql-align-justify{text-align:justify;}
      /* 들여쓰기 (카드/전체보기에서도 보이게) */
      .memo-html .ql-indent-1{padding-left:2.4em;} .memo-html .ql-indent-2{padding-left:4.8em;}
      .memo-html .ql-indent-3{padding-left:7.2em;} .memo-html .ql-indent-4{padding-left:9.6em;}
      /* 체크리스트: Quill이 <ul data-checked>로 만든다 */
      .ql-editor ul[data-checked],.memo-html ul[data-checked]{padding-left:0;list-style:none;}
      .memo-html ul[data-checked]>li{list-style:none;position:relative;padding-left:1.6em;margin:2px 0;}
      .memo-html ul[data-checked="true"]>li::before{content:"☑";position:absolute;left:0;color:#34D399;}
      .memo-html ul[data-checked="false"]>li::before{content:"☐";position:absolute;left:0;color:${T.dim2};}
      .memo-html ul[data-checked="true"]>li{color:${T.dim};text-decoration:line-through;}
      /* 링크 입력 팝업 — 스타일이 없으면 흰 배경/화면 밖으로 나가 안 보임 */
      .ql-snow .ql-tooltip{background:${T.surface}!important;border:1px solid ${T.borderStrong}!important;box-shadow:0 8px 28px rgba(0,0,0,0.5)!important;color:${T.text}!important;border-radius:10px!important;padding:8px 10px!important;z-index:100!important;left:8px!important;white-space:normal!important;max-width:calc(100% - 16px)!important;}
      .ql-snow .ql-tooltip input[type=text]{background:${T.inputBg}!important;border:1px solid ${T.border}!important;color:${T.text}!important;border-radius:7px!important;padding:6px 9px!important;font-size:13px!important;outline:none!important;}
      .ql-snow .ql-tooltip a.ql-action,.ql-snow .ql-tooltip a.ql-remove,.ql-snow .ql-tooltip a.ql-preview{color:#C084FC!important;}
      .ql-snow .ql-tooltip::before{color:${T.dim2}!important;}
      /* 메모 카드에서 저장된 HTML 표시용 */
      .memo-html p{margin:0 0 3px 0;}
      .memo-html p:last-child{margin-bottom:0;}
      .memo-html ul,.memo-html ol{margin:2px 0;padding-left:18px;}
      .memo-html strong{color:${T.text};}
      .memo-html a,.ql-editor a{color:#60A5FA;text-decoration:underline;}
      .memo-html img{max-width:100%;height:auto;border-radius:8px;margin:4px 0;display:block;}
      .ql-editor img{max-width:100%;border-radius:8px;}
      /* 카드에서만 4줄로 자르기 */
      .memo-clip{max-height:150px;overflow:hidden;position:relative;}
      .memo-clip img{max-height:90px;object-fit:cover;}
      @keyframes slideInRight{from{opacity:0;transform:translateX(24px)}to{opacity:1;transform:translateX(0)}}
      @keyframes balPop{0%{opacity:0;transform:translateY(8px) scale(.96)}100%{opacity:1;transform:translateY(0) scale(1)}}
      @keyframes detailIn{0%{opacity:0;transform:scale(.96) translateY(12px)}100%{opacity:1;transform:scale(1) translateY(0)}}
      .detail-anim{animation:detailIn .34s cubic-bezier(.32,1.2,.46,1) both}
      .gcard{transition:transform .25s cubic-bezier(.34,1.2,.46,1),box-shadow .25s ease}
      @media(hover:hover){.gcard:hover{transform:translateY(-2px)}}
      .screen-anim{animation:screenIn .32s cubic-bezier(.22,1,.36,1) both}
      ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:${T.surface2};border-radius:2px}
      input[type=number]::-webkit-inner-spin-button{-webkit-appearance:none}input[type=color]::-webkit-color-swatch-wrapper{padding:0}input[type=color]::-webkit-color-swatch{border:none;border-radius:6px}`
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: {
        minHeight: "100vh",
        background: T.bg,
        color: T.text,
        maxWidth: isWide ? "100%" : 480,
        width: isWide ? "100%" : undefined,
        margin: "0 auto",
        position: "relative",
        transition: "background .4s",
        padding: isWide ? "0 24px" : 0,
        boxSizing: "border-box"
      },
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        style: {
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          transition: "background .6s ease",
          background: `radial-gradient(circle 700px at 50% 8%, ${bgColor}2e, ${bgColor}0d 45%, transparent 70%)`
        }
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        style: {
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: T.headerBg,
          backdropFilter: "blur(20px)",
          padding: "calc(env(safe-area-inset-top, 0px) + 14px) 20px 12px",
          borderBottom: `1px solid ${T.border}`
        },
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          style: {
            position: "absolute",
            left: 0,
            right: 0,
            bottom: -1,
            height: 2,
            background: `linear-gradient(90deg, transparent, ${bgColor}88, transparent)`,
            transition: "background .6s ease"
          }
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          style: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: view === "settings" ? 0 : 12
          },
          children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            style: {
              display: "flex",
              alignItems: "center",
              gap: 10
            },
            children: [view !== "folders" && /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
              "aria-label": "\uD3F4\uB354 \uBAA9\uB85D\uC73C\uB85C",
              onClick: () => {
                setView("folders");
                setActiveFolderId(null);
              },
              style: {
                background: T.inputBg,
                border: `1px solid ${T.border}`,
                borderRadius: 10,
                color: T.muted,
                padding: "6px 10px",
                fontSize: 13,
                cursor: "pointer"
              },
              children: "\u2190"
            }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
                style: {
                  fontFamily: "'Noto Serif KR',serif",
                  fontSize: 18,
                  fontWeight: 700
                },
                children: headerTitle
              }), view === "folders" && (() => {
                const col = data.items.filter(i => canRead(i.folderId) && !i._kind && !SPECIAL_TYPES.includes(getItemDisplayType(i))).length;
                const dy = data.items.filter(i => canRead(i.folderId) && !i._kind && getItemDisplayType(i) === "diary").length;
                const mm = data.items.filter(i => canRead(i.folderId) && i._kind === "memo").length;
                const parts = [`${col}개 기록`];
                if (dy) parts.push(`일기 ${dy}`);
                if (mm) parts.push(`메모 ${mm}`);
                parts.push(`${data.folders.length - 1}개 폴더`);
                return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
                  style: {
                    fontSize: 11,
                    color: T.dim2,
                    marginTop: 2
                  },
                  children: parts.join(" · ")
                });
              })(), view === "items" && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
                style: {
                  fontSize: 11,
                  color: T.dim2,
                  marginTop: 2
                },
                children: isDiaryFolder(activeFolder) ? `${filteredItems.length}편의 일기 · ${data.items.filter(i => i.folderId === activeFolderId && i._kind === 'moment').length}개의 순간${folderStreak(activeFolder) > 0 ? ` · 🔥 ${folderStreak(activeFolder)}일 연속` : ""}` : `${filteredItems.length}개의 기록`
              })]
            })]
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            style: {
              display: "flex",
              gap: 8
            },
            children: [view === "folders" && /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
              "aria-label": "\uC124\uC815",
              onClick: () => setView("settings"),
              style: {
                background: T.inputBg,
                border: `1px solid ${T.border}`,
                borderRadius: 10,
                color: T.muted,
                padding: "8px 11px",
                fontSize: 14,
                cursor: "pointer",
                lineHeight: 1
              },
              children: "\u2699\uFE0F"
            }), view === "items" && !isAllFolder && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
              style: {
                width: 42
              }
            }), view !== "settings" && /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
              onClick: () => {
                setEditTarget(null);
                if (view === "folders") setModal("folder");else if (isDiaryFolder(activeFolder)) setModal("diary");else if (isMemoFolder(activeFolder)) setModal("memo");else if (isLedgerFolder(activeFolder)) setModal("ledgerSub");else setModal("item");
              },
              style: {
                background: "linear-gradient(135deg,#7C3AED,#C084FC)",
                border: "none",
                borderRadius: 10,
                color: "#fff",
                padding: "8px 0",
                width: 42,
                fontSize: 18,
                fontWeight: 700,
                cursor: "pointer",
                lineHeight: 1
              },
              children: "+"
            })]
          })]
        }), view !== "settings" && /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
          value: view === "folders" ? globalSearch : search,
          onChange: e => view === "folders" ? setGlobalSearch(e.target.value) : setSearch(e.target.value),
          placeholder: view === "folders" ? "메모, 일기, 제목, 가수 검색..." : "이 폴더에서 검색...",
          style: {
            width: "100%",
            background: T.inputBg,
            border: `1px solid ${T.border}`,
            borderRadius: 10,
            color: T.text,
            padding: "9px 14px",
            fontSize: 13,
            outline: "none"
          }
        })]
      }), storageState.state === 'error' && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "storage-alert",
        role: "alert",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          children: "\uAE30\uAE30\uC5D0 \uC800\uC7A5\uD558\uC9C0 \uBABB\uD588\uC5B4\uC694. \uD3B8\uC9D1 \uC911\uC778 \uB0B4\uC6A9\uC740 \uB2EB\uAE30 \uC804\uC5D0 \uB2E4\uC2DC \uC800\uC7A5\uD574\uC8FC\uC138\uC694."
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
          onClick: () => saveData(dataRef.current),
          children: "\uB2E4\uC2DC \uC800\uC7A5"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
          onClick: handleExport,
          children: "\uBC31\uC5C5"
        })]
      }), syncMessage && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "sync-alert",
        role: "status",
        children: [syncMessage, /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
          onClick: syncNow,
          children: "\uB2E4\uC2DC \uD655\uC778"
        })]
      }), view === "settings" ? /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "screen-anim",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(SettingsScreen, {
          settings: settings,
          onChange: updateSettings,
          onExport: handleExport,
          onImport: handleImport,
          onWipe: handleWipe,
          onTrash: () => setShowTrash(true),
          trashCount: (data.trash || []).length,
          stats: stats,
          user: user,
          onLogin: () => {
            setShowAuth(true);
          },
          onLogout: handleLogout,
          syncing: syncing,
          syncFailed: syncFailed,
          onRetrySync: doPush,
          T: T
        })
      }, "settings") : /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "screen-anim",
        style: {
          padding: "16px 16px 48px",
          position: "relative",
          zIndex: 1
        },
        children: [view === "folders" && globalSearch.trim() && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          style: {
            marginBottom: 20
          },
          children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            style: {
              fontSize: 12,
              color: T.dim2,
              marginBottom: 10,
              fontWeight: 600
            },
            children: ["\uAC80\uC0C9 \uACB0\uACFC ", globalResults.length, "\uAC1C"]
          }), globalResults.length === 0 ? /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            style: {
              textAlign: "center",
              padding: "30px",
              color: T.dim,
              fontSize: 13
            },
            children: "\uACB0\uACFC \uC5C6\uC74C"
          }) : /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            style: {
              display: "flex",
              flexDirection: "column",
              gap: 12
            },
            children: globalResults.map(item => item._kind === 'memo' ? /*#__PURE__*/(0, _jsxRuntime.jsx)(MemoCard, {
              memo: item,
              T: T,
              onOpen: setMemoDetail,
              onEdit: m => {
                setActiveFolderId(m.folderId);
                setEditTarget(m);
                setModal('memo');
              }
            }, item.id) : item._kind === 'moment' ? /*#__PURE__*/(0, _jsxRuntime.jsxs)("button", {
              className: "search-moment",
              onClick: () => {
                setActiveFolderId(item.folderId);
                setEditTarget(item);
                setModal('moment');
              },
              children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("small", {
                children: [fmtDiaryDate(item.dateKey), " \xB7 \uC21C\uAC04 \uAE30\uB85D"]
              }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
                children: [item.mood, " ", item.notes || '사진으로 남긴 순간']
              })]
            }, item.id) : getItemDisplayType(item) === 'diary' ? /*#__PURE__*/(0, _jsxRuntime.jsx)(DiaryCard, {
              entry: item,
              T: T,
              onOpen: setDiaryDetail
            }, item.id) : /*#__PURE__*/(0, _jsxRuntime.jsx)(ItemCard, {
              folder: data.folders.find(f => f.id === item.folderId),
              item: {
                ...item,
                _displayType: getItemDisplayType(item)
              },
              folderType: getItemDisplayType(item),
              T: T,
              onOpen: setDetailItem,
              onEdit: i => {
                setEditTarget(i);
                setActiveFolderId(i.folderId);
                setModal("item");
              },
              onDelete: delItem
            }, item.id))
          })]
        }), view === "folders" && !globalSearch.trim() && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
          children: [data.folders.length > 2 && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            style: {
              display: "flex",
              gap: 7,
              marginBottom: 14,
              alignItems: "center",
              overflowX: "auto",
              WebkitOverflowScrolling: "touch",
              paddingBottom: 2
            },
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
              style: {
                fontSize: 12,
                color: T.dim2,
                fontWeight: 600
              },
              children: "\uC815\uB82C"
            }), [["custom", "기본"], ["recent", "최근 작성순"], ["name", "이름순"], ["count", "많은순"], ["newest", "최신순"], ["oldest", "오래된순"]].map(([k, l]) => /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
              onClick: () => setFolderSort(k),
              style: {
                padding: "6px 12px",
                borderRadius: 9,
                fontSize: 12.5,
                fontWeight: 600,
                cursor: "pointer",
                whiteSpace: "nowrap",
                border: `1px solid ${folderSort === k ? "#C084FC" : T.border}`,
                background: folderSort === k ? "#C084FC22" : "transparent",
                color: folderSort === k ? "#C084FC" : T.dim2
              },
              children: l
            }, k))]
          }), data.folders.length === 1 && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            className: "welcome-panel",
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("h2", {
              children: "\uB0B4 \uBC29\uC2DD\uB300\uB85C, \uCCAB \uD3F4\uB354"
            }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("p", {
              children: ["\uBE48 \uC591\uC2DD\uC5D0 \uD544\uC694\uD55C \uD56D\uBAA9\uC744 \uD558\uB098\uC529 \uB354\uD574\uBCF4\uC138\uC694.", /*#__PURE__*/(0, _jsxRuntime.jsx)("br", {}), "\uBA54\uBAA8\xB7\uC77C\uAE30\xB7\uC568\uBC94 \uCD94\uCC9C \uC591\uC2DD\uB3C4 \uC900\uBE44\uD588\uC5B4\uC694."]
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
              className: "primary",
              onClick: () => {
                setEditTarget(null);
                setModal('folder');
              },
              children: "\uCCAB \uD3F4\uB354 \uB9CC\uB4E4\uAE30"
            })]
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            style: {
              display: "grid",
              gridTemplateColumns: isWide ? "repeat(auto-fill, minmax(260px, 1fr))" : "1fr 1fr",
              gap: isWide ? 16 : 12
            },
            children: sortedFolders.map((folder, fi) => /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
              className: "sort-anim",
              style: {
                animationDelay: `${Math.min(fi * 22, 180)}ms`,
                minWidth: 0
              },
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)(FolderCard, {
                folder: folder,
                itemCount: folderItemCount(folder),
                streak: folderStreak(folder),
                T: T,
                onClick: () => openFolder(folder),
                onPin: folder.folderType !== "all" ? () => togglePin(folder) : null,
                onEdit: folder.folderType !== "all" ? () => secure(folder, () => {
                  setEditTarget(folder);
                  setModal("folder");
                }) : null
              })
            }, folder.id + "-" + folderSort))
          })]
        }), view === 'items' && isDiaryFolder(activeFolder) && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
            className: "quiet",
            onClick: () => setDiaryCalView(!diaryCalView),
            children: diaryCalView ? '시간순으로 보기' : '하루 일기 달력'
          }), diaryCalView ? /*#__PURE__*/(0, _jsxRuntime.jsx)(DiaryCalendar, {
            entries: filteredItems,
            T: T,
            onOpen: setDiaryDetail
          }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(JournalView, {
            entries: filteredItems,
            moments: data.items.filter(i => i._kind === 'moment' && i.folderId === activeFolderId && (!search || matchItem(i, search))),
            onOpenDay: setDiaryDetail,
            onEditDay: e => {
              setEditTarget(e);
              setModal('diary');
            },
            onDelete: delItem,
            onMoment: m => {
              setEditTarget(m);
              setModal('moment');
            },
            onNewDay: () => {
              setEditTarget(null);
              setModal('diary');
            },
            onNewMoment: () => {
              setEditTarget(null);
              setModal('moment');
            },
            T: T
          })]
        }), view === 'items' && isMemoFolder(activeFolder) && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "segmented",
          children: [['updated', '최근 수정'], ['created', '최근 작성'], ['title', '제목순']].map(([v, l]) => /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
            className: memoSort === v ? 'selected' : '',
            onClick: () => setMemoSort(v),
            children: l
          }, v))
        }), view === "items" && isMemoFolder(activeFolder) && (filteredItems.length === 0 ? /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          style: {
            textAlign: "center",
            padding: "60px 20px",
            color: T.dim
          },
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            style: {
              fontSize: 48,
              marginBottom: 12
            },
            children: "\uD83D\uDCDD"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            style: {
              fontSize: 15,
              color: T.dim2
            },
            children: search ? "검색 결과가 없어요" : "아직 메모가 없어요"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            style: {
              fontSize: 12,
              marginTop: 6
            },
            children: "+ \uBC84\uD2BC\uC73C\uB85C \uC790\uC720\uB86D\uAC8C \uC801\uC5B4\uBCF4\uC138\uC694!"
          })]
        }) : /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          style: {
            display: isWide ? "grid" : "flex",
            gridTemplateColumns: isWide ? "repeat(auto-fill, minmax(300px, 1fr))" : undefined,
            flexDirection: isWide ? undefined : "column",
            gap: 10,
            maxWidth: isWide ? undefined : undefined
          },
          children: [...filteredItems].sort((a, b) => Number(!!b.pinned) - Number(!!a.pinned) || (memoSort === 'title' ? memoTitle(a).localeCompare(memoTitle(b), 'ko') : String(memoSort === 'updated' ? b.updatedAt || b.createdAt : b.createdAt).localeCompare(String(memoSort === 'updated' ? a.updatedAt || a.createdAt : a.createdAt)))).map(m => /*#__PURE__*/(0, _jsxRuntime.jsx)(MemoCard, {
            memo: m,
            T: T,
            onPin: m => saveMemo({
              ...m,
              pinned: !m.pinned
            }),
            onOpen: mm => setMemoDetail(mm),
            onEdit: mm => {
              setEditTarget(mm);
              setModal("memo");
            }
          }, m.id))
        })), view === "items" && isLedgerFolder(activeFolder) && /*#__PURE__*/(0, _jsxRuntime.jsx)(LedgerHome, {
          ledgerFolder: activeFolder,
          subs: ledgerSubs(activeFolder.id),
          subTotal: ledgerSubTotal,
          fixedExpenses: activeFolder.fixedExpenses || [],
          accounts: activeFolder.accounts || [],
          accountBalance: accId => accountBalance(activeFolder.id, accId),
          wide: isWide,
          T: T,
          onOpenSub: setLedgerSub,
          onAddSub: () => setModal("ledgerSub"),
          onManageAccounts: () => setModal("accounts"),
          onRenameSub: sub => {
            setRenameSub(sub);
            setModal("renameSub");
          },
          onDeleteSub: id => askConfirm({
            title: "가계부 삭제",
            message: "이 가계부와 안의 모든 기록이 사라져요.\n정말 삭제할까요?",
            onConfirm: async () => {
              const ok = await persist(c => ({
                ...c,
                items: c.items.filter(i => i.id !== id && i.ledgerSubId !== id)
              }));
              setConfirmCfg(null);
              if (ok) showToast('최근 삭제함으로 옮겼어요');
            }
          }),
          onManageFixed: () => setModal("fixedExpense")
        }), view === 'items' && activeFolder?.folderType === 'album' && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "segmented",
          children: [['shelf', '음반장'], ['grid', '커버'], ['list', '목록']].map(([v, l]) => /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
            className: albumView === v ? 'selected' : '',
            onClick: () => {
              setAlbumView(v);
              setGridView(v === 'grid');
            },
            children: l
          }, v))
        }), view === "items" && !isDiaryFolder(activeFolder) && !isLedgerFolder(activeFolder) && !isMemoFolder(activeFolder) && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          style: {
            marginBottom: 14
          },
          children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            style: {
              display: "flex",
              gap: 8,
              alignItems: "center",
              marginBottom: showFilters ? 12 : 0,
              flexWrap: "wrap"
            },
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
              style: {
                display: "flex",
                gap: 6,
                overflowX: "auto",
                flex: 1
              },
              children: [["newest", "최신순"], ["oldest", "오래된순"], ["rating", "별점높은순"], ["ratingLow", "별점낮은순"], ["title", "제목순"]].map(([k, l]) => /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
                onClick: () => setSortInline(k),
                style: {
                  padding: "7px 12px",
                  borderRadius: 9,
                  fontSize: 12.5,
                  fontWeight: 600,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  border: `1px solid ${sortInline === k ? "#C084FC" : T.border}`,
                  background: sortInline === k ? "#C084FC22" : "transparent",
                  color: sortInline === k ? "#C084FC" : T.dim2
                },
                children: l
              }, k))
            }), activeFolder?.folderType !== 'album' && !isDiaryFolder(activeFolder) && !isLedgerFolder(activeFolder) && /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
              onClick: () => setGridView(g => !g),
              style: {
                flexShrink: 0,
                width: 36,
                height: 34,
                borderRadius: 9,
                border: `1px solid ${T.border}`,
                background: T.cardBg,
                color: T.muted,
                fontSize: 15,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              },
              title: gridView ? "목록 보기" : "격자 보기",
              children: gridView ? "☰" : "▦"
            }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("button", {
              onClick: () => setShowFilters(s => !s),
              style: {
                padding: "7px 12px",
                borderRadius: 9,
                fontSize: 12.5,
                fontWeight: 600,
                cursor: "pointer",
                whiteSpace: "nowrap",
                border: `1px solid ${filterActive ? "#C084FC" : T.border}`,
                background: filterActive ? "#C084FC22" : "transparent",
                color: filterActive ? "#C084FC" : T.dim2
              },
              children: ["\u2699 \uD544\uD130", filterActive ? " ●" : ""]
            })]
          }), showFilters && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            style: {
              background: T.cardBg,
              border: `1px solid ${T.border}`,
              borderRadius: 12,
              padding: "12px 14px",
              display: "flex",
              flexDirection: "column",
              gap: 10
            },
            children: [isAllFolder && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
                style: {
                  fontSize: 11,
                  color: T.dim2,
                  fontWeight: 600,
                  marginBottom: 6
                },
                children: "\uC885\uB958"
              }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
                style: {
                  display: "flex",
                  gap: 6,
                  flexWrap: "wrap"
                },
                children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
                  onClick: () => setFilterType("all"),
                  style: {
                    padding: "5px 10px",
                    borderRadius: 8,
                    fontSize: 11.5,
                    fontWeight: 600,
                    cursor: "pointer",
                    border: `1px solid ${filterType === "all" ? "#C084FC" : T.border}`,
                    background: filterType === "all" ? "#C084FC22" : "transparent",
                    color: filterType === "all" ? "#C084FC" : T.dim2
                  },
                  children: "\uC804\uCCB4"
                }), Object.entries(FOLDER_TYPES).filter(([k]) => !SPECIAL_TYPES.includes(k)).map(([k, v]) => /*#__PURE__*/(0, _jsxRuntime.jsxs)("button", {
                  onClick: () => setFilterType(k),
                  style: {
                    padding: "5px 10px",
                    borderRadius: 8,
                    fontSize: 11.5,
                    fontWeight: 600,
                    cursor: "pointer",
                    border: `1px solid ${filterType === k ? v.color : T.border}`,
                    background: filterType === k ? `${v.color}22` : "transparent",
                    color: filterType === k ? v.color : T.dim2
                  },
                  children: [v.emoji, " ", v.label]
                }, k))]
              })]
            }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
                style: {
                  fontSize: 11,
                  color: T.dim2,
                  fontWeight: 600,
                  marginBottom: 6
                },
                children: "\uCD5C\uC18C \uBCC4\uC810"
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
                style: {
                  display: "flex",
                  gap: 6,
                  flexWrap: "wrap"
                },
                children: [0, 3, 4, 4.5, 5].map(r => /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
                  onClick: () => setFilterRating(r),
                  style: {
                    padding: "5px 10px",
                    borderRadius: 8,
                    fontSize: 11.5,
                    fontWeight: 600,
                    cursor: "pointer",
                    border: `1px solid ${filterRating === r ? "#FBBF24" : T.border}`,
                    background: filterRating === r ? "#FBBF2422" : "transparent",
                    color: filterRating === r ? "#FBBF24" : T.dim2
                  },
                  children: r === 0 ? "전체" : `★ ${r}+`
                }, r))
              })]
            }), filterActive && /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
              onClick: () => {
                setFilterType("all");
                setFilterRating(0);
              },
              style: {
                alignSelf: "flex-start",
                padding: "5px 12px",
                borderRadius: 8,
                fontSize: 11.5,
                fontWeight: 600,
                cursor: "pointer",
                border: "none",
                background: T.inputBg,
                color: T.dim2
              },
              children: "\uD544\uD130 \uCD08\uAE30\uD654"
            })]
          })]
        }), view === "items" && !isDiaryFolder(activeFolder) && !isLedgerFolder(activeFolder) && !isMemoFolder(activeFolder) && (filteredItems.length === 0 ? /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          style: {
            textAlign: "center",
            padding: "60px 20px",
            color: T.dim
          },
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            style: {
              fontSize: 48,
              marginBottom: 12
            },
            children: "\uD83D\uDCED"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            style: {
              fontSize: 15,
              color: T.dim2
            },
            children: search || filterActive ? "조건에 맞는 기록이 없어요" : "아직 기록이 없어요"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            style: {
              fontSize: 12,
              marginTop: 6
            },
            children: "+ \uBC84\uD2BC\uC73C\uB85C \uCD94\uAC00\uD574\uBCF4\uC138\uC694!"
          })]
        }) : activeFolder?.folderType === 'album' && albumView === 'shelf' ? /*#__PURE__*/(0, _jsxRuntime.jsx)(AlbumShelf, {
          items: filteredItems,
          onOpen: setDetailItem,
          T: T
        }) : gridView ? /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          style: {
            display: "grid",
            gridTemplateColumns: isWide ? "repeat(auto-fill, minmax(180px, 1fr))" : "1fr 1fr",
            gap: isWide ? 14 : 10
          },
          children: filteredItems.map(item => /*#__PURE__*/(0, _jsxRuntime.jsx)(ItemGridCard, {
            folder: data.folders.find(f => f.id === item.folderId),
            item: isAllFolder ? {
              ...item,
              _displayType: getItemDisplayType(item)
            } : item,
            folderType: isAllFolder ? getItemDisplayType(item) : activeFolder?.folderType,
            T: T,
            onOpen: setDetailItem
          }, item.id))
        }) : /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          style: {
            display: isWide ? "grid" : "flex",
            gridTemplateColumns: isWide ? "repeat(auto-fill, minmax(400px, 1fr))" : undefined,
            flexDirection: isWide ? undefined : "column",
            gap: 16
          },
          children: filteredItems.map(item => /*#__PURE__*/(0, _jsxRuntime.jsx)(ItemCard, {
            folder: data.folders.find(f => f.id === item.folderId),
            item: isAllFolder ? {
              ...item,
              _displayType: getItemDisplayType(item)
            } : item,
            folderType: isAllFolder ? getItemDisplayType(item) : activeFolder?.folderType,
            T: T,
            onOpen: setDetailItem,
            onEdit: i => {
              setEditTarget(i);
              setModal("item");
            },
            onDelete: delItem
          }, item.id))
        }))]
      }, view + (activeFolderId || "")), toast && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        style: {
          position: "fixed",
          bottom: 40,
          left: "50%",
          transform: "translateX(-50%)",
          background: toast.type === "err" ? "#7F1D1D" : "#14532D",
          border: `1px solid ${toast.type === "err" ? "#F87171" : "#34D399"}44`,
          borderRadius: 12,
          padding: "10px 20px",
          fontSize: 13,
          fontWeight: 600,
          color: toast.type === "err" ? "#FCA5A5" : "#6EE7B7",
          zIndex: 999,
          animation: "fadeIn .2s ease",
          whiteSpace: "nowrap"
        },
        children: toast.msg
      })]
    }), modal === 'folder' && /*#__PURE__*/(0, _jsxRuntime.jsx)(FolderModal, {
      folder: editTarget,
      templates: data.templates || [],
      onSaveTemplate: async t => {
        const ok = await persist(c => ({
          ...c,
          templates: [...(c.templates || []), t]
        }));
        showToast(ok ? '내 템플릿에 저장했어요' : '저장 실패', ok ? 'ok' : 'err');
      },
      T: T,
      onClose: () => {
        setModal(null);
        setEditTarget(null);
      },
      onDelete: editTarget ? () => delFolder(editTarget) : null,
      onSave: async fd => {
        const f = {
          ...editTarget,
          ...fd,
          id: editTarget?.id || uid(),
          createdAt: editTarget?.createdAt || new Date().toISOString()
        };
        const ok = await persist(c => ({
          ...c,
          folders: c.folders.some(x => x.id === f.id) ? c.folders.map(x => x.id === f.id ? f : x) : [...c.folders, f]
        }));
        if (ok) {
          setModal(null);
          setEditTarget(null);
          if (f.locked) setUnlockedFolders(u => ({
            ...u,
            [f.id]: true
          }));
        }
        return ok;
      }
    }), modal === 'item' && /*#__PURE__*/(0, _jsxRuntime.jsx)(ItemModal, {
      item: editTarget,
      folder: activeFolder || data.folders[0],
      folders: data.folders,
      allItems: data.items.filter(i => canRead(i.folderId)),
      T: T,
      onImgError: m => showToast(m, 'err'),
      onClose: () => {
        setModal(null);
        setEditTarget(null);
      },
      onDelete: deleteFromEditor,
      onSave: async item => {
        const ok = await putItem(item);
        if (ok) {
          setModal(null);
          setEditTarget(null);
        }
        return ok;
      }
    }), modal === 'pin-unlock' && pinTarget && /*#__PURE__*/(0, _jsxRuntime.jsx)(PinModal, {
      title: '🔒 ' + pinTarget.name,
      T: T,
      onCancel: () => {
        setModal(null);
        setPinTarget(null);
        pinAction.current = null;
      },
      onConfirm: pin => {
        if (pin === pinTarget.pin) {
          setUnlockedFolders(u => ({
            ...u,
            [pinTarget.id]: true
          }));
          setModal(null);
          setPinTarget(null);
          const action = pinAction.current;
          pinAction.current = null;
          action?.();
        } else {
          showToast('PIN이 틀렸어요', 'err');
          return false;
        }
      }
    }), memoDetail && /*#__PURE__*/(0, _jsxRuntime.jsx)(MemoDetail, {
      memo: data.items.find(i => i.id === memoDetail.id) || memoDetail,
      T: T,
      onChange: saveMemo,
      onClose: () => setMemoDetail(null),
      onEdit: m => {
        setMemoDetail(null);
        setActiveFolderId(m.folderId);
        setEditTarget(m);
        setModal("memo");
      }
    }), modal === 'memo' && /*#__PURE__*/(0, _jsxRuntime.jsx)(MemoModal, {
      folder: activeFolder,
      allItems: data.items.filter(i => canRead(i.folderId)),
      memo: editTarget,
      folderId: activeFolderId,
      T: T,
      onImgError: m => showToast(m, 'err'),
      onClose: () => {
        setModal(null);
        setEditTarget(null);
      },
      onDelete: deleteFromEditor,
      onSave: saveMemo
    }), modal === 'moment' && /*#__PURE__*/(0, _jsxRuntime.jsx)(MomentModal, {
      onDelete: async m => {
        if (!window.confirm('이 순간을 최근 삭제함으로 옮길까요?')) return false;
        const ok = await persist(c => ({
          ...c,
          items: c.items.filter(i => i.id !== m.id)
        }));
        if (ok) {
          setModal(null);
          setEditTarget(null);
        }
        return ok;
      },
      entry: editTarget,
      folderId: activeFolderId,
      T: T,
      onClose: () => {
        setModal(null);
        setEditTarget(null);
      },
      onSave: async m => {
        const ok = await putItem(m);
        if (ok) {
          setModal(null);
          setEditTarget(null);
        }
        return ok;
      }
    }), modal === "diary" && /*#__PURE__*/(0, _jsxRuntime.jsx)(DiaryModal, {
      folder: activeFolder,
      allItems: data.items.filter(i => canRead(i.folderId)),
      moments: data.items.filter(i => i._kind === 'moment' && i.folderId === activeFolderId),
      entry: editTarget,
      folderId: activeFolderId,
      pastActivities: pastActivities,
      T: T,
      onImgError: msg => showToast(msg, "err"),
      onClose: () => {
        setModal(null);
        setEditTarget(null);
      },
      onDelete: deleteFromEditor,
      onSave: async entry => {
        const ok = await putItem({
          ...entry,
          updatedAt: new Date().toISOString()
        });
        if (ok) {
          setModal(null);
          setEditTarget(null);
          showToast('일기를 저장했어요');
        }
        return ok;
      }
    }), detailItem && /*#__PURE__*/(0, _jsxRuntime.jsx)(DetailView, {
      folder: data.folders.find(f => f.id === detailItem.folderId),
      onSave: putItem,
      item: data.items.find(i => i.id === detailItem.id) || detailItem,
      folderType: getItemDisplayType(detailItem),
      wide: isWide,
      T: T,
      onClose: () => setDetailItem(null),
      onEdit: i => {
        setDetailItem(null);
        setEditTarget(i);
        setActiveFolderId(i.folderId);
        setModal("item");
      }
    }), diaryDetail && /*#__PURE__*/(0, _jsxRuntime.jsx)(DiaryDetail, {
      entry: diaryDetail,
      wide: isWide,
      T: T,
      onClose: () => setDiaryDetail(null),
      onEdit: e => {
        setDiaryDetail(null);
        setActiveFolderId(e.folderId);
        setEditTarget(e);
        setModal("diary");
      }
    }), ledgerSub && /*#__PURE__*/(0, _jsxRuntime.jsx)(LedgerSubView, {
      sub: data.items.find(i => i.id === ledgerSub.id) || ledgerSub,
      entries: ledgerEntries(ledgerSub.id),
      accounts: activeFolder?.accounts || [],
      customCats: activeFolder?.customCats,
      balanceMap: ledgerBalanceMap(activeFolderId),
      wide: isWide,
      T: T,
      onClose: () => setLedgerSub(null),
      onAddEntry: () => {
        setEditTarget(null);
        setModal("ledgerEntry");
      },
      onEditEntry: e => {
        setEditTarget(e);
        setModal("ledgerEntry");
      },
      onManageBudget: () => setModal("budget"),
      onOpenStats: () => setLedgerStats(ledgerSub),
      onDeleteEntry: id => {
        const doDel = async () => {
          await persist(c => ({
            ...c,
            items: c.items.filter(i => i.id !== id)
          }));
          setConfirmCfg(null);
        };
        if (settings.confirmDelete) askConfirm({
          title: "기록 삭제",
          message: "이 기록을 삭제할까요?",
          onConfirm: doDel
        });else doDel();
      }
    }), ledgerStats && /*#__PURE__*/(0, _jsxRuntime.jsx)(LedgerStats, {
      sub: data.items.find(i => i.id === ledgerStats.id) || ledgerStats,
      entries: ledgerEntries(ledgerStats.id),
      customCats: activeFolder?.customCats,
      wide: isWide,
      T: T,
      onClose: () => setLedgerStats(null)
    }), modal === "renameSub" && renameSub && /*#__PURE__*/(0, _jsxRuntime.jsx)(RenameModal, {
      title: renameSub.title,
      T: T,
      onClose: () => {
        setModal(null);
        setRenameSub(null);
      },
      onSave: async newTitle => {
        if (!(await persist(c => ({
          ...c,
          items: c.items.map(i => i.id === renameSub.id ? {
            ...i,
            title: newTitle
          } : i)
        })))) return;
        setModal(null);
        setRenameSub(null);
        showToast("이름을 바꿨어요");
      }
    }), modal === "ledgerSub" && /*#__PURE__*/(0, _jsxRuntime.jsx)(LedgerSubModal, {
      fixedCount: (activeFolder?.fixedExpenses || []).length,
      T: T,
      onClose: () => setModal(null),
      onSave: async title => {
        const subId = uid();
        const fixed = activeFolder?.fixedExpenses || [];
        const defAcc = (activeFolder?.accounts || [])[0]?.id || null;
        const sub = {
          id: subId,
          _kind: "ledgerSub",
          folderId: activeFolderId,
          title,
          createdAt: new Date().toISOString()
        };
        const fixedEntries = fixed.map(f => {
          const occ = cycleOccurrence(f.cycle);
          return {
            id: uid(),
            _kind: "ledgerEntry",
            ledgerSubId: subId,
            lType: f.kind === "income" ? "income" : "expense",
            lCat: f.kind === "income" ? "salary" : "sub",
            account: defAcc,
            amount: f.amount,
            memo: f.name,
            lDate: occ.date,
            isFixed: true,
            isPlanned: occ.isPlanned,
            createdAt: new Date().toISOString()
          };
        });
        if (!(await persist(c => ({
          ...c,
          items: [sub, ...fixedEntries, ...c.items]
        })))) return;
        setModal(null);
        showToast("가계부를 만들었어요 💰");
      }
    }), (modal === "ledgerEntry" || modal === "categories") && ledgerSub && /*#__PURE__*/(0, _jsxRuntime.jsx)(LedgerEntryModal, {
      entry: editTarget,
      subId: ledgerSub.id,
      accounts: activeFolder?.accounts || [],
      customCats: activeFolder?.customCats,
      onManageCats: () => setModal("categories"),
      T: T,
      onClose: () => {
        setModal(null);
        setEditTarget(null);
      },
      onSave: async entry => {
        const ok = await putItem(entry);
        if (ok) {
          setModal(null);
          setEditTarget(null);
        }
        return ok;
      }
    }), modal === "categories" && activeFolder && /*#__PURE__*/(0, _jsxRuntime.jsx)(CategoryModal, {
      customCats: activeFolder.customCats,
      T: T,
      onClose: () => setModal(ledgerSub ? "ledgerEntry" : null),
      onSave: async cc => {
        if (!(await persist(c => ({
          ...c,
          folders: c.folders.map(f => f.id === activeFolderId ? {
            ...f,
            customCats: cc
          } : f)
        })))) return;
        setModal(ledgerSub ? "ledgerEntry" : null);
        showToast("카테고리를 저장했어요 🏷️");
      }
    }), modal === "budget" && ledgerSub && /*#__PURE__*/(0, _jsxRuntime.jsx)(BudgetModal, {
      sub: data.items.find(i => i.id === ledgerSub.id) || ledgerSub,
      customCats: activeFolder?.customCats,
      T: T,
      onClose: () => setModal(null),
      onSave: async budgets => {
        if (!(await persist(c => ({
          ...c,
          items: c.items.map(i => i.id === ledgerSub.id ? {
            ...i,
            budgets
          } : i)
        })))) return;
        setModal(null);
        showToast("예산을 저장했어요 🎯");
      }
    }), modal === "accounts" && activeFolder && /*#__PURE__*/(0, _jsxRuntime.jsx)(AccountModal, {
      accounts: activeFolder.accounts || [],
      T: T,
      onClose: () => setModal(null),
      onSave: async list => {
        const current = dataRef.current,
          validIds = list.map(a => a.id),
          removed = (activeFolder.accounts || []).filter(a => !validIds.includes(a.id)).map(a => a.id),
          subIds = current.items.filter(i => i._kind === 'ledgerSub' && i.folderId === activeFolderId).map(i => i.id);
        if (current.items.some(i => i._kind === 'ledgerEntry' && subIds.includes(i.ledgerSubId) && [i.account, i.fromAccount, i.toAccount].some(id => removed.includes(id)))) {
          showToast('거래에 사용한 계좌는 삭제할 수 없어요. 해당 거래의 계좌를 먼저 바꿔주세요.', 'err');
          return false;
        }
        const ok = await persist(c => ({
          ...c,
          folders: c.folders.map(f => f.id === activeFolderId ? {
            ...f,
            accounts: list
          } : f)
        }));
        if (ok) {
          setModal(null);
          showToast('계좌를 저장했어요');
        }
        return ok;
      }
    }), modal === "fixedExpense" && activeFolder && /*#__PURE__*/(0, _jsxRuntime.jsx)(FixedExpenseModal, {
      fixedExpenses: activeFolder.fixedExpenses || [],
      showToast: showToast,
      T: T,
      onClose: () => setModal(null),
      onSave: async (list, silent) => {
        if (!(await persist(c => ({
          ...c,
          folders: c.folders.map(f => f.id === activeFolderId ? {
            ...f,
            fixedExpenses: list
          } : f)
        })))) return;
        if (!silent) {
          setModal(null);
          showToast("고정 항목을 저장했어요");
        }
      }
    }), showTrash && /*#__PURE__*/(0, _jsxRuntime.jsx)(TrashView, {
      trash: data.trash || [],
      T: T,
      onClose: () => setShowTrash(false),
      onRestore: restoreTrash
    }), confirmCfg && /*#__PURE__*/(0, _jsxRuntime.jsx)(ConfirmDialog, {
      ...confirmCfg,
      T: T,
      onCancel: () => {
        confirmCfg.onCancel?.();
        setConfirmCfg(null);
      }
    })]
  });
}

// SOURCE: entry.jsx
class ErrorBoundary extends React.Component {
  constructor(p) {
    super(p);
    this.state = {
      err: null,
      info: ""
    };
  }
  static getDerivedStateFromError(err) {
    return {
      err
    };
  }
  componentDidCatch(err, info) {
    console.error("앱 오류:", err, info);
    this.setState({
      info: (info && info.componentStack || "").trim()
    });
  }
  render() {
    if (this.state.err) {
      return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        style: {
          minHeight: "100vh",
          background: "#0B0A0F",
          color: "#F4F2F7",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
          fontFamily: "'Noto Sans KR',sans-serif"
        },
        children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          style: {
            textAlign: "center",
            maxWidth: 340
          },
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            style: {
              fontSize: 52,
              marginBottom: 16
            },
            children: "\uD83D\uDEE0\uFE0F"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            style: {
              fontFamily: "'Noto Serif KR',serif",
              fontSize: 20,
              fontWeight: 700,
              marginBottom: 10
            },
            children: "\uC7A0\uAE50 \uBB38\uC81C\uAC00 \uC0DD\uACBC\uC5B4\uC694"
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            style: {
              fontSize: 14,
              color: "#A8A2B8",
              lineHeight: 1.7,
              marginBottom: 24
            },
            children: ["\uD654\uBA74\uC744 \uD45C\uC2DC\uD558\uC9C0 \uBABB\uD588\uC5B4\uC694. \uC800\uC7A5 \uC5EC\uBD80\uB97C \uD655\uC778\uD558\uB824\uBA74", /*#__PURE__*/(0, _jsxRuntime.jsx)("br", {}), "\uB2E4\uC2DC \uC2DC\uC791\uD55C \uB4A4 \uAE30\uB85D\uC744 \uD655\uC778\uD574\uC8FC\uC138\uC694.", /*#__PURE__*/(0, _jsxRuntime.jsx)("br", {}), "\uC544\uB798 \uBC84\uD2BC\uC73C\uB85C \uB2E4\uC2DC \uC2DC\uC791\uD560 \uC218 \uC788\uC5B4\uC694."]
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
            onClick: () => {
              this.setState({
                err: null
              });
              location.reload();
            },
            style: {
              background: "linear-gradient(135deg,#7C3AED,#C084FC)",
              border: "none",
              borderRadius: 14,
              color: "#fff",
              padding: "14px 28px",
              fontSize: 15,
              fontWeight: 700,
              cursor: "pointer",
              width: "100%"
            },
            children: "\uB2E4\uC2DC \uC2DC\uC791\uD558\uAE30"
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("details", {
            style: {
              marginTop: 18,
              textAlign: "left"
            },
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("summary", {
              style: {
                fontSize: 11.5,
                color: "#5C5668",
                cursor: "pointer",
                listStyle: "none"
              },
              children: "\u25B8 \uC624\uB958 \uB0B4\uC6A9 \uBCF4\uAE30 (\uAC1C\uBC1C\uC6A9)"
            }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
              style: {
                marginTop: 8,
                background: "#17151E",
                border: "1px solid #2A2732",
                borderRadius: 10,
                padding: "10px 12px",
                fontSize: 10.5,
                color: "#F87171",
                fontFamily: "monospace",
                lineHeight: 1.6,
                wordBreak: "break-all",
                maxHeight: 180,
                overflowY: "auto",
                WebkitUserSelect: "text",
                userSelect: "text"
              },
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
                style: {
                  fontWeight: 700,
                  marginBottom: 5
                },
                children: String(this.state.err && this.state.err.message || this.state.err)
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
                style: {
                  color: "#8B8496",
                  whiteSpace: "pre-wrap"
                },
                children: (this.state.info || "").slice(0, 600)
              })]
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
              style: {
                fontSize: 10,
                color: "#5C5668",
                marginTop: 6
              },
              children: "\uAE38\uAC8C \uB20C\uB7EC \uBCF5\uC0AC\uD574\uC11C \uC54C\uB824\uC8FC\uC138\uC694"
            })]
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            style: {
              fontSize: 11,
              color: "#5C5668",
              marginTop: 16
            },
            children: "\uACC4\uC18D \uBB38\uC81C\uAC00 \uC0DD\uAE30\uBA74, \uC571\uC744 \uC644\uC804\uD788 \uB2EB\uC558\uB2E4 \uC5F4\uC5B4\uBCF4\uC138\uC694"
          })]
        })
      });
    }
    return this.props.children;
  }
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/(0, _jsxRuntime.jsx)(ErrorBoundary, {
  children: /*#__PURE__*/(0, _jsxRuntime.jsx)(App, {})
}));

})();

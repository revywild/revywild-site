import { useState, useEffect, useRef } from "react";

const PAGES = {
  home: "home", tokyo: "tokyo", izakaya: "izakaya",
  chefday: "chefday", maui: "maui", about: "about", contact: "contact",
};

/* ─── TRANSLATIONS ───────────────────────── */
const T = {
  en: {
    nav: { tokyo: "Tokyo", maui: "Maui", about: "About", contact: "Contact" },
    home: {
      eyebrow: "Maui · Tokyo",
      h1a: "Some things", h1b: "can't be found.", h1c: "Only introduced.",
      sub: "Network & hospitality operator based between Maui and Tokyo. After spending years finding the right places and the right people in the hospitality industry, I know who and what is worth your time.",
      cta: "See what I offer",
      stats: [
        ["$1M+", "Café & rentals, Maui"],
        ["47", "Prefectures traveled, stayed in 67 locals' homes"],
        ["100+", "Placed into FAANG"],
        ["200+", "Tokyo izakayas, vetted"],
      ],
      tokyoTitle: "Tokyo.", tokyoSub: "Two experiences",
      exp: [
        { tag: "~$100 per person", title: "200 Izakayas, 3 Stops.", desc: "Anyone can find a \"hidden gem\" in Tokyo. After 200+ izakayas, I know which ones are actually worth your night.", page: PAGES.izakaya },
        { tag: "From $750 per person", title: "A Day Off With The Chef", desc: "You pick a dish from their menu. They take you to the market to pick the ingredients, then back to their kitchen to make it together — with a chef who's been perfecting this for over a decade.", page: PAGES.chefday },
      ],
      learnMore: "Learn more",
      ctaEyebrow: "Tokyo · Maui", ctaTitle: "Let's talk.", ctaBtn: "Reach out",
      footer: "Revy Wild © 2025",
    },
    tokyo: {
      eyebrow: "Tokyo, Japan",
      h1a: "Two ways in.", h1c: "One city.",
      sub: "An open entry point for anyone curious. A curated session for those who want to go further.",
      quoteTitle: "Filtering took years. Relationships, longer.",
      quoteEnd: "You get both in a few hours.",
      quoteBody: "Tokyo has thousands of hidden gems and no shortage of Google hotspots. It takes years to know which ones are actually worth your time. It takes longer to know the chefs who'll cook with you like you're a friend.",
      exp: [
        { tag: "~$100 per person", title: "200 Izakayas, 3 Stops.", body: "Anyone can find a \"hidden gem\" in Tokyo. After 200+ izakayas, I know which ones are actually worth your night.", page: PAGES.izakaya },
        { tag: "From $750 per person", title: "A Day Off With The Chef", body: "You pick a dish from their menu. They take you to the market to pick the ingredients, then back to their kitchen to make it together — with a chef who's been perfecting this for over a decade.", page: PAGES.chefday },
      ],
      learnMore: "Learn more",
    },
    izakaya: {
      eyebrow: "Tokyo · Group experience",
      h1a: "200 Izakayas,", h1c: "3 Stops.",
      sub: "I've been to over 200 izakayas in Tokyo — hidden gems, Google-famous spots, everything in between. Most aren't worth your time. These three are.",
      filterP1: "Most hidden gems are cute. Most Google hotspots are fine. However, what I noticed makes a night consistently memorable was different — places with enough culture to mean something, and enough local energy to feel alive. The kind of place that has a reason to exist beyond looking good on a photo.",
      filterP2: "Three stops, three hours. A group activity at about $100 per person.",
      stopsTitle: "Three stops.", stopsSub: "~1 hour each",
      stops: [
        { n: "01", title: "Step back in time.", area: "Post-war district", body: "We start in the izakayas that have been running since the 1970s, tucked under the train tracks. Chaotic, loud, and completely unchanged. The kind of place locals have been coming to for decades for no other reason than it's exactly right." },
        { n: "02", title: "Standing drinks, elevated.", area: "Ginza", body: "A standing bar in Ginza that's earned its following on quality alone — known for fresh herbs sourced from a farm in Aomori. Small, no seats, no fuss." },
        { n: "03", title: "Celebrate like a local.", area: "Near a wedding venue", body: "The last stop fills up with after-parties and the kind of energy that's hard to manufacture. A good place to end." },
      ],
      priceNum: "~$100", priceSub: "Per person · Group activity · ~3 hours",
      priceBody: "Reach out to check availability and group size.",
      btn: "Get in touch", crosslink: "Also: A Day Off With The Chef",
    },
    chefday: {
      eyebrow: "Tokyo · Curated session",
      h1a: "Cook with the chef", h1c: "on their day off.",
      sub: "You pick a dish. A chef who's been doing this for over a decade takes you to the market, then back to their kitchen to make it together.",
      pull: "The kind of afternoon that only happens if you were friends with them for years.",
      stepsTitle: "How it unfolds.", stepsSub: "~4 hours",
      steps: [
        { n: "I", title: "The Restaurant", body: "You sit down with the menu. You pick a dish — whatever you want to learn to make. That's where it starts." },
        { n: "II", title: "The Market", body: "The chef takes you to pick the ingredients. You see how they choose — what they look for, what they pass on." },
        { n: "III", title: "The Kitchen", body: "Inside the restaurant on their day off. The chef will show you how to cook the dish from step one — ingredients chosen, techniques explained, no shortcuts." },
        { n: "IV", title: "The Table", body: "A meal from what was bought that morning. The chef stays and eats with you." },
      ],
      priceNum: "from $750", priceSub: "Per person · Group of 2–4 guests · ~4 hours",
      priceBody: "Reach out to check availability, group size, and dish options.",
      btn: "Get in touch", crosslink: "Also: 200 Izakayas, 3 Stops.",
    },
    maui: {
      eyebrow: "Maui, Hawaii",
      h1a: "Maui.", h1c: "Private stays.",
      sub: "I own and operate here. The properties are mine. So are the recommendations.",
      h2a: "Private properties.", h2c: "Personal layer included.",
      body: "I've been running a café and rental properties in Maui for years. When you stay, you get what I actually know — the producers, the back roads, the spots that have no reason to advertise.",
      inquire: "Inquire about availability",
      cards: [
        { title: "Private Stays", body: "Properties I own and stand behind. Inquire directly." },
        { title: "Local Knowledge", body: "Where to eat, who to call, what to skip. Comes with the stay." },
        { title: "The Café", body: "Running for years, with supplier relationships going back just as long." },
      ],
    },
    about: {
      nameLabel: "Rebecca (Revy Wild) Hsiao",
      nameRole: "Network & Hospitality Operator",
      h1: "Revy Wild", h1sub: "Not all introductions are equal.",
      paras: [
        "Worked at Google, Meta, and several startups before leaving tech to build a café and rental properties in Maui. Within a year, reduced waste from 15% to 3% and grew sales by 20% — now over $1M in combined revenue, managed remotely. With my N2 level Japanese I traveled across all 47 prefectures staying in 67 locals' homes, and was visiting Tokyo twice a year for 5 years straight before moving here four and a half years ago.",
        "In that time I've taken Google directors, nine-figure founders, and local Japanese around Tokyo. Helped over 100 people — mostly non-tech career switchers — get into FAANG. Helped three people start rental operations in Maui.",
        "The chef sessions and izakaya list exist because of five years of showing up, in Japanese, to the same places and the same people.",
      ],
      cta: "Reach out",
    },
    contact: {
      h1: "Get in touch.",
      sub: "Tell me what you're looking for. The more specific, the better.",
      info: [["Email", "contact@revywild.com"], ["Instagram", "instagram.com/revywild"], ["Based", "Tokyo · Maui"]],
      fields: [
        { key: "name", label: "Your name", type: "text" },
        { key: "email", label: "Email address", type: "email" },
        { key: "interest", label: "Subject", type: "text" },
      ],
      msgLabel: "What you're looking for",
      send: "Send", sending: "Sending...",
      success: "Received.", successSub: "I'll be in touch.",
      error: "Something went wrong. Try emailing contact@revywild.com directly.",
    },
    back: "← Back",
  },

  jp: {
    nav: { tokyo: "東京", maui: "マウイ", about: "プロフィール", contact: "お問い合わせ" },
    home: {
      eyebrow: "マウイ · 東京",
      h1a: "自分では", h1b: "見つけられないものが、", h1c: "紹介でつながる。",
      sub: "マウイと東京を拠点に、ネットワークとホスピタリティの両面で活動しています。長年かけて築いてきた人脈と場所の知識を、あなたの時間に凝縮してお届けします。",
      cta: "提供内容を見る",
      stats: [
        ["$1M+", "マウイのカフェ＆宿泊施設"],
        ["47", "都道府県を地元の人の家に泊まりながら旅した"],
        ["100名以上", "FAANG企業への就職サポート実績"],
        ["200軒以上", "東京の居酒屋を厳選"],
      ],
      tokyoTitle: "東京。", tokyoSub: "2つの体験",
      exp: [
        { tag: "おひとり様 約$100〜", title: "200軒から選んだ、3軒の居酒屋。", desc: "東京には「隠れた名店」があふれています。200軒以上を訪れた私が、本当に行く価値のある3軒に絞りました。", page: PAGES.izakaya },
        { tag: "おひとり様 $750〜", title: "シェフの休日に、一緒に料理する。", desc: "メニューから一品選んでください。シェフがあなたを市場に連れていき、その後キッチンで一緒に料理します。10年以上その道を極めた、信頼できる職人との時間です。", page: PAGES.chefday },
      ],
      learnMore: "詳しく見る",
      ctaEyebrow: "東京 · マウイ", ctaTitle: "まずは話しましょう。", ctaBtn: "お問い合わせ",
      footer: "Revy Wild © 2025",
    },
    tokyo: {
      eyebrow: "東京、日本",
      h1a: "二つの入り口、", h1c: "一つの街。",
      sub: "気軽に参加できるグループ体験と、より深く東京を知りたい方のためのプライベートセッション。",
      quoteTitle: "選ぶのに何年もかかった。関係を築くのにはもっとかかった。",
      quoteEnd: "その両方を、数時間で体験できます。",
      quoteBody: "東京には良い店も人気スポットも無数にあります。どれが本当に価値があるかを見極めるには年月が必要です。友人のように料理してくれるシェフと出会うには、さらに時間がかかります。",
      exp: [
        { tag: "おひとり様 約$100〜", title: "200軒から選んだ、3軒の居酒屋。", body: "東京には「隠れた名店」があふれています。200軒以上を訪れた私が、本当に行く価値のある3軒に絞りました。", page: PAGES.izakaya },
        { tag: "おひとり様 $750〜", title: "シェフの休日に、一緒に料理する。", body: "メニューから一品選んでください。シェフがあなたを市場に連れていき、その後キッチンで一緒に料理します。10年以上この道を歩んできたシェフとの、特別な時間です。", page: PAGES.chefday },
      ],
      learnMore: "詳しく見る",
    },
    izakaya: {
      eyebrow: "東京 · グループ体験",
      h1a: "200軒から選んだ、", h1c: "3軒の居酒屋。",
      sub: "隠れた名店からGoogle上位の有名店まで、200軒以上を実際に訪れました。多くはわざわざ行く価値がない。でも、この3軒は違います。",
      filterP1: "隠れた名店は、それはそれで素敵です。有名なスポットも、悪くはありません。でも私が気づいたのは、夜を本当に印象深くするのは「隠れているかどうか」や「人気があるかどうか」ではないということ。文化的な背景があり、地元の人たちが集まる理由のある場所。写真映えだけのために存在しているのではなく、そこにある理由がある場所です。",
      filterP2: "3軒、3時間。グループでの体験で、おひとり様約$100です。",
      stopsTitle: "3つのスポット。", stopsSub: "各約1時間",
      stops: [
        { n: "01", title: "昭和の空気の中へ。", area: "戦後の下町エリア", body: "最初に向かうのは、1970年代から続く高架下の居酒屋。賑やかで、雑然としていて、何十年も変わっていない。地元の人たちが通い続ける理由は、ただ「ここが正解だから」というシンプルなものです。" },
        { n: "02", title: "立ち飲み、上質に。", area: "銀座", body: "銀座にある、じわじわと人気を集めている立ち飲みバー。青森県の牧場から届く新鮮なハーブが自慢で、席なし・気取りなし。質で勝負している一軒です。" },
        { n: "03", title: "地元流で、夜を締める。", area: "ウェディング会場近く", body: "最後は披露宴帰りの人たちでにぎわう、エネルギッシュな一軒。作り出せない空気感がある、締めくくりにぴったりの場所です。" },
      ],
      priceNum: "約$100", priceSub: "おひとり様 · グループ体験 · 約3時間",
      priceBody: "ご希望の日程やグループ人数など、お気軽にご連絡ください。",
      btn: "お問い合わせ", crosslink: "こちらも：シェフの休日に、一緒に料理する。",
    },
    chefday: {
      eyebrow: "東京 · プライベートセッション",
      h1a: "シェフの休日に、", h1c: "一緒に料理する。",
      sub: "メニューから一品選ぶところから始まります。シェフが市場へ連れていき、食材を選び、そのままキッチンへ。10年以上この道を歩んできた職人との、特別な時間です。",
      pull: "もし昔から友人だったら、こんな午後を過ごせるかもしれない。そんな体験です。",
      stepsTitle: "当日の流れ。", stepsSub: "約4時間",
      steps: [
        { n: "I", title: "レストランで", body: "まずメニューを見ながら、作ってみたい一品を選びます。ここからすべてが始まります。" },
        { n: "II", title: "市場へ", body: "シェフと一緒に食材を選びに行きます。何を選び、何を選ばないか。その目利きを間近で見られます。" },
        { n: "III", title: "キッチンで", body: "定休日のレストランのキッチンへ。食材選びから調理技術まで、手順を追いながら一緒に作ります。" },
        { n: "IV", title: "テーブルで", body: "その日の朝に選んだ食材で作った料理を、シェフと一緒にいただきます。" },
      ],
      priceNum: "$750〜", priceSub: "おひとり様 · 2〜4名様 · 約4時間",
      priceBody: "ご希望の日程、人数、お料理の希望などをお気軽にお知らせください。",
      btn: "お問い合わせ", crosslink: "こちらも：200軒から選んだ、3軒の居酒屋。",
    },
    maui: {
      eyebrow: "マウイ島、ハワイ",
      h1a: "マウイ。", h1c: "プライベートステイ。",
      sub: "物件は私のものです。おすすめも、私自身のものです。",
      h2a: "プライベートな宿泊施設。", h2c: "地元の情報も一緒に。",
      body: "マウイでカフェと宿泊施設を運営してきました。滞在中は、私が実際に知っていること——仕入れ先、地元の道、広告を出す必要もないほど良い場所——をそのままお伝えします。",
      inquire: "空き状況を問い合わせる",
      cards: [
        { title: "プライベートステイ", body: "自分で所有し、自信を持っておすすめできる物件です。直接お問い合わせください。" },
        { title: "地元の情報", body: "どこで食べるか、誰に連絡するか、何を避けるか。滞在に含まれています。" },
        { title: "カフェ", body: "長年営業してきた、仕入れ先との関係も深い一軒です。" },
      ],
    },
    about: {
      nameLabel: "レベッカ（Revy Wild）ヒサオ",
      nameRole: "ネットワーク＆ホスピタリティ事業運営",
      h1: "Revy Wild", h1sub: "紹介には、差があります。",
      paras: [
        "Google、Meta、そして複数のスタートアップで働いた後、マウイ島でカフェと宿泊施設の運営に転身しました。1年以内に廃棄率を15%から3%に削減し、売上を20%改善。現在は遠隔で管理しながら、カフェと宿泊施設で合計$1M以上の売上を達成しています。日本語能力試験N2を取得し、47都道府県すべてを地元の方の家に泊まりながら旅しました（計67軒）。東京への移住前の5年間は、年2回のペースで通い続け、移住してから現在で約4年半が経ちます。",
        "この期間に、Googleのディレクターや数百億円規模の企業を経営するファウンダー、地元の日本人の方々を東京各地にご案内してきました。非テック系からFAANG企業への転職を目指す方を中心に、100名以上の就職をサポートしました。マウイでの宿泊事業の立ち上げも、3名の方のお手伝いをしています。",
        "シェフとのセッションも、居酒屋リストも、5年以上かけて日本語で同じ場所・同じ人たちと向き合い続けてきたことで生まれました。",
      ],
      cta: "お問い合わせ",
    },
    contact: {
      h1: "お問い合わせ。",
      sub: "ご希望の内容をできるだけ具体的にお知らせいただけると、スムーズにご対応できます。",
      info: [["メール", "contact@revywild.com"], ["Instagram", "instagram.com/revywild"], ["拠点", "東京 · マウイ"]],
      fields: [
        { key: "name", label: "お名前", type: "text" },
        { key: "email", label: "メールアドレス", type: "email" },
        { key: "interest", label: "件名", type: "text" },
      ],
      msgLabel: "ご希望の内容",
      send: "送信する", sending: "送信中...",
      success: "受け取りました。", successSub: "追ってご連絡いたします。",
      error: "送信に失敗しました。直接 contact@revywild.com までご連絡ください。",
    },
    back: "← 戻る",
  },
};

/* ─── UTILS ──────────────────────────────── */
function useFadeIn(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, visible] = useFadeIn();
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 1.4s cubic-bezier(0.19,1,0.22,1) ${delay}s, transform 1.4s cubic-bezier(0.19,1,0.22,1) ${delay}s`,
    }}>{children}</div>
  );
}

/* ─── GLOBAL STYLES ──────────────────────── */
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Montserrat:wght@200;300;400;500&family=Noto+Serif+JP:wght@300;400&family=Noto+Sans+JP:wght@300;400&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --black: #060606; --off-black: #0d0d0d; --charcoal: #1a1a1a;
      --mid: #2e2e2e; --muted: #555; --dim: #888;
      --silver: #b0b0b0; --near-white: #e8e8e8; --white: #f5f5f5; --accent: #c8b89a;
    }
    html { scroll-behavior: smooth; }
    body {
      background: var(--black); color: var(--near-white);
      font-family: 'Montserrat', 'Noto Sans JP', sans-serif; font-weight: 300;
      letter-spacing: 0.02em;  overflow-x: hidden;
    }
    body.lang-jp { font-family: 'Noto Sans JP', 'Montserrat', sans-serif; }
    ::selection { background: var(--near-white); color: var(--black); }
    @media (hover: none) { }
    .serif { font-family: 'Cormorant Garamond', 'Noto Serif JP', serif; }
    .italic { font-style: italic; }
    .rule { width: 100%; height: 1px; background: var(--charcoal); }
    .rule-sm { width: 40px; height: 1px; background: var(--dim); }
    nav { position: fixed; top: 0; left: 0; right: 0; z-index: 1000; display: flex; justify-content: space-between; align-items: center; padding: 28px 48px; mix-blend-mode: difference; }
    .nav-logo { font-family: 'Montserrat', sans-serif; font-size: 11px; font-weight: 500; letter-spacing: 0.35em; color: var(--white); background: none; border: none;}
    .nav-links { display: flex; gap: 28px; list-style: none; align-items: center; }
    .nav-links button { background: none; border: none;  font-family: 'Montserrat', 'Noto Sans JP', sans-serif; font-size: 10px; font-weight: 300; letter-spacing: 0.3em; color: var(--dim); text-transform: uppercase; transition: color 0.3s; }
    .nav-links button:hover { color: var(--white); }
    .lang-toggle { background: none; border: 1px solid var(--muted); font-family: 'Montserrat', sans-serif; font-size: 9px; font-weight: 400; letter-spacing: 0.2em; color: var(--dim); padding: 4px 10px; transition: color 0.3s, border-color 0.3s; }
    .lang-toggle:hover { color: var(--white); border-color: var(--silver); }
    .hamburger { display: none; flex-direction: column; gap: 5px; background: none; border: none;  padding: 4px; }
    .hamburger span { display: block; width: 22px; height: 1px; background: var(--near-white); transition: all 0.3s; }
    .mobile-menu { display: none; position: fixed; inset: 0; background: var(--black); z-index: 999; flex-direction: column; justify-content: center; align-items: center; gap: 40px; }
    .mobile-menu.open { display: flex; }
    .mobile-menu button { background: none; border: none; cursor: pointer; font-family: 'Montserrat', 'Noto Sans JP', sans-serif; font-size: 20px; font-weight: 300; letter-spacing: 0.2em; color: var(--near-white); text-transform: uppercase; }
    .mobile-lang { background: none; border: 1px solid var(--muted); cursor: pointer; font-family: 'Montserrat', sans-serif; font-size: 11px; letter-spacing: 0.2em; color: var(--dim); padding: 8px 20px; }
    section { padding: 120px 48px; }
    .page-wrap { opacity: 0; animation: pageIn 0.8s cubic-bezier(0.19,1,0.22,1) forwards; }
    @keyframes pageIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
    .btn-ghost { display: inline-flex; align-items: center; gap: 12px; background: none; border: none;  font-family: 'Montserrat', 'Noto Sans JP', sans-serif; font-size: 10px; font-weight: 400; letter-spacing: 0.25em; text-transform: uppercase; color: var(--silver); padding: 0; padding-bottom: 6px; border-bottom: 1px solid var(--mid); transition: color 0.3s, border-color 0.3s, gap 0.3s; }
    .btn-ghost:hover { color: var(--white); border-color: var(--silver); gap: 20px; }
    .btn-solid { display: inline-block; background: var(--near-white); color: var(--black); font-family: 'Montserrat', 'Noto Sans JP', sans-serif; font-size: 10px; font-weight: 500; letter-spacing: 0.3em; text-transform: uppercase; padding: 16px 36px; border: none;  transition: background 0.3s; }
    .btn-solid:hover { background: var(--accent); }
    .tag { display: inline-block; font-size: 9px; font-weight: 400; letter-spacing: 0.25em; text-transform: uppercase; color: var(--muted); border: 1px solid var(--charcoal); padding: 5px 12px; }
    .grain::before { content: ''; position: fixed; inset: 0; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.035'/%3E%3C/svg%3E"); pointer-events: none; z-index: 9990; opacity: 0.6; }
    .num { font-family: 'Cormorant Garamond', serif; font-size: 80px; font-weight: 300; line-height: 1; color: var(--charcoal); }
    .proof-grid { display: grid; grid-template-columns: repeat(4, 1fr); }
    .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; }
    .three-col { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 60px; }
    .steps-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px; }
    .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 100px; align-items: start; }
    .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 100px; align-items: start; }
    ::-webkit-scrollbar { width: 3px; }
    ::-webkit-scrollbar-track { background: var(--black); }
    ::-webkit-scrollbar-thumb { background: var(--mid); }

    /* ── MOBILE ── */
    @media (max-width: 768px) {
      body { cursor: auto; }
      nav { padding: 20px 24px; }
      .nav-links { display: none; }
      .hamburger { display: flex; }
      section { padding: 72px 24px; }
      .proof-grid { grid-template-columns: 1fr 1fr; }
      .two-col { grid-template-columns: 1fr; }
      .three-col { grid-template-columns: 1fr; gap: 40px; }
      .steps-grid { grid-template-columns: 1fr 1fr; gap: 24px; }
      .about-grid { grid-template-columns: 1fr; gap: 48px; }
      .contact-grid { grid-template-columns: 1fr; gap: 48px; }
      .hero-img { width: 100% !important; left: 0 !important; opacity: 0.2 !important; }
      .hero-copy { max-width: 100% !important; }
      .hero-grad { background: linear-gradient(to bottom, transparent 0%, var(--black) 70%) !important; }
      .maui-inner { grid-template-columns: 1fr !important; }
      .about-photo { position: static !important; }
    }
  `}</style>
);

/* ─── NAV ─────────────────────────────────── */
function Nav({ setPage, lang, setLang }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const t = T[lang].nav;

  const navTo = (page) => { setPage(page); setMenuOpen(false); };

  return (
    <>
      <nav>
        <button className="nav-logo" onClick={() => navTo(PAGES.home)}>REVY WILD</button>
        <ul className="nav-links">
          {[[t.tokyo, PAGES.tokyo], [t.maui, PAGES.maui], [t.about, PAGES.about], [t.contact, PAGES.contact]].map(([label, page]) => (
            <li key={page}><button onClick={() => navTo(page)}>{label}</button></li>
          ))}
          <li>
            <button className="lang-toggle" onClick={() => setLang(lang === "en" ? "jp" : "en")}>
              {lang === "en" ? "JP" : "EN"}
            </button>
          </li>
        </ul>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span style={{ transform: menuOpen ? "rotate(45deg) translate(4px, 4px)" : "none" }} />
          <span style={{ opacity: menuOpen ? 0 : 1 }} />
          <span style={{ transform: menuOpen ? "rotate(-45deg) translate(4px, -4px)" : "none" }} />
        </button>
      </nav>

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {[[t.tokyo, PAGES.tokyo], [t.maui, PAGES.maui], [t.about, PAGES.about], [t.contact, PAGES.contact]].map(([label, page]) => (
          <button key={page} onClick={() => navTo(page)}>{label}</button>
        ))}
        <button className="mobile-lang" onClick={() => { setLang(lang === "en" ? "jp" : "en"); setMenuOpen(false); }}>
          {lang === "en" ? "日本語" : "English"}
        </button>
      </div>
    </>
  );
}

/* ─── SHARED: PAGE FOOTER ─────────────────── */
function PageFooter({ setPage, back = PAGES.home, label, lang }) {
  return (
    <footer style={{ padding: "32px 48px", display: "flex", justifyContent: "space-between", borderTop: "1px solid var(--charcoal)", flexWrap: "wrap", gap: 16 }}>
      <button className="btn-ghost" onClick={() => setPage(back)}>{T[lang].back}</button>
      <span style={{ fontSize: 9, letterSpacing: "0.4em", color: "var(--muted)", textTransform: "uppercase" }}>{label}</span>
    </footer>
  );
}

/* ─── HOME PAGE ───────────────────────────── */
function HomePage({ setPage, lang }) {
  const [heroLoaded, setHeroLoaded] = useState(false);
  useEffect(() => { const t = setTimeout(() => setHeroLoaded(true), 100); return () => clearTimeout(t); }, []);
  const t = T[lang].home;

  return (
    <div className="page-wrap grain">
      {/* HERO */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "flex-end", padding: "0 48px 80px", position: "relative", overflow: "hidden" }}>
        <div className="hero-grad" style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, var(--black) 35%, transparent 100%)", zIndex: 1 }} />
        <div className="hero-img" style={{ position: "absolute", right: 0, top: 0, width: "55%", height: "100%", background: "var(--off-black)", overflow: "hidden", zIndex: 0 }}>
          <img src="/hero-revy.png" alt="Revy Wild" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", filter: "grayscale(100%) contrast(1.05)", opacity: 0.7, transform: heroLoaded ? "scale(1)" : "scale(1.06)", transition: "transform 3s cubic-bezier(0.19,1,0.22,1), opacity 2s ease" }} />
        </div>
        <div className="hero-copy" style={{ position: "relative", zIndex: 2, maxWidth: 680 }}>
          <div style={{ opacity: heroLoaded ? 1 : 0, transform: heroLoaded ? "translateY(0)" : "translateY(30px)", transition: "opacity 1.4s cubic-bezier(0.19,1,0.22,1) 0.3s, transform 1.4s cubic-bezier(0.19,1,0.22,1) 0.3s" }}>
            <p style={{ fontSize: 10, letterSpacing: "0.4em", color: "var(--muted)", marginBottom: 40, textTransform: "uppercase" }}>{t.eyebrow}</p>
            <h1 className="serif" style={{ fontSize: "clamp(48px, 8vw, 100px)", fontWeight: 300, lineHeight: 0.95, marginBottom: 40 }}>
              {t.h1a}<br />{t.h1b}<br />
              <span className="italic" style={{ color: "var(--silver)" }}>{t.h1c}</span>
            </h1>
            <p style={{ fontSize: 14, color: "var(--dim)", lineHeight: 1.9, maxWidth: 380, marginBottom: 52, fontWeight: 300 }}>{t.sub}</p>
            <button className="btn-ghost" onClick={() => setPage(PAGES.tokyo)}>{t.cta} <span style={{ fontSize: 14 }}>→</span></button>
          </div>
        </div>
      </section>

      {/* PROOF STRIP */}
      <FadeIn>
        <div className="proof-grid" style={{ borderTop: "1px solid var(--charcoal)", borderBottom: "1px solid var(--charcoal)", padding: "0 48px" }}>
          {t.stats.map(([n, label], i) => (
            <div key={n} style={{ padding: "48px 0", paddingLeft: i === 0 ? 0 : 24, borderRight: i < 3 ? "1px solid var(--charcoal)" : "none" }}>
              <div className="serif" style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 300, color: "var(--near-white)", marginBottom: 8 }}>{n}</div>
              <div style={{ fontSize: 10, letterSpacing: "0.15em", color: "var(--muted)", textTransform: "uppercase", lineHeight: 1.6 }}>{label}</div>
            </div>
          ))}
        </div>
      </FadeIn>

      {/* TWO EXPERIENCES */}
      <section style={{ padding: "120px 48px" }}>
        <FadeIn>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 64, paddingBottom: 24, borderBottom: "1px solid var(--charcoal)", flexWrap: "wrap", gap: 16 }}>
            <h2 className="serif" style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 300 }}>{t.tokyoTitle}</h2>
            <p style={{ fontSize: 11, color: "var(--muted)", letterSpacing: "0.2em", textTransform: "uppercase" }}>{t.tokyoSub}</p>
          </div>
        </FadeIn>
        <div className="two-col">
          {t.exp.map((item) => (
            <FadeIn key={item.tag}>
              <div onClick={() => setPage(item.page)} style={{ background: "var(--off-black)", padding: 52, display: "flex", flexDirection: "column", gap: 24, transition: "background 0.3s", minHeight: 420 }} onMouseEnter={e => e.currentTarget.style.background = "var(--charcoal)"} onMouseLeave={e => e.currentTarget.style.background = "var(--off-black)"}>
                <span className="tag" style={{ alignSelf: "flex-start" }}>{item.tag}</span>
                <h3 className="serif" style={{ fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 300, lineHeight: 1.1, marginTop: "auto" }}>{item.title}</h3>
                <p style={{ fontSize: 13, color: "var(--dim)", lineHeight: 1.8 }}>{item.desc}</p>
                <button className="btn-ghost" style={{ alignSelf: "flex-start", marginTop: 8 }}>{t.learnMore} <span style={{ fontSize: 14 }}>→</span></button>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "140px 48px", background: "var(--near-white)", color: "var(--black)", textAlign: "center" }}>
        <FadeIn>
          <p style={{ fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: 32, color: "#666" }}>{t.ctaEyebrow}</p>
          <h2 className="serif italic" style={{ fontSize: "clamp(40px, 7vw, 96px)", fontWeight: 300, marginBottom: 48, color: "var(--black)", lineHeight: 0.9 }}>{t.ctaTitle}</h2>
          <button className="btn-solid" onClick={() => setPage(PAGES.contact)}>{t.ctaBtn}</button>
        </FadeIn>
      </section>

      <footer style={{ padding: "32px 48px", display: "flex", justifyContent: "space-between", borderTop: "1px solid var(--charcoal)", flexWrap: "wrap", gap: 12 }}>
        <span style={{ fontSize: 9, letterSpacing: "0.4em", color: "var(--muted)", textTransform: "uppercase" }}>{t.footer}</span>
        <span style={{ fontSize: 9, letterSpacing: "0.3em", color: "var(--muted)", textTransform: "uppercase" }}>Tokyo · Maui</span>
      </footer>
    </div>
  );
}

/* ─── TOKYO OVERVIEW PAGE ─────────────────── */
function TokyoPage({ setPage, lang }) {
  const t = T[lang].tokyo;
  return (
    <div className="page-wrap">
      <section style={{ minHeight: "80vh", display: "flex", alignItems: "flex-end", padding: "0 48px 80px", background: "var(--off-black)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, var(--off-black) 45%, transparent)" }} />
        <img src="/tokyo.png" alt="Tokyo" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(100%)", opacity: 0.2 }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 680 }}>
          <span style={{ fontSize: 9, letterSpacing: "0.4em", color: "var(--muted)", textTransform: "uppercase", display: "block", marginBottom: 32 }}>{t.eyebrow}</span>
          <h1 className="serif" style={{ fontSize: "clamp(44px, 8vw, 96px)", fontWeight: 300, lineHeight: 0.95, marginBottom: 32 }}>
            {t.h1a}<br /><span className="italic" style={{ color: "var(--silver)" }}>{t.h1c}</span>
          </h1>
          <p style={{ fontSize: 14, color: "var(--dim)", lineHeight: 1.9, maxWidth: 440 }}>{t.sub}</p>
        </div>
      </section>

      <section style={{ padding: "100px 48px", background: "var(--off-black)" }}>
        <FadeIn>
          <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
            <div className="rule-sm" style={{ margin: "0 auto 48px" }} />
            <blockquote className="serif italic" style={{ fontSize: "clamp(22px, 4vw, 40px)", fontWeight: 300, lineHeight: 1.4, color: "var(--near-white)", marginBottom: 40 }}>
              "{t.quoteTitle}<br />{t.quoteEnd}"
            </blockquote>
            <p style={{ fontSize: 13, color: "var(--dim)", lineHeight: 1.9, maxWidth: 420, margin: "0 auto" }}>{t.quoteBody}</p>
          </div>
        </FadeIn>
      </section>

      <section style={{ padding: "120px 48px" }}>
        <div className="two-col">
          {t.exp.map((item) => (
            <FadeIn key={item.tag}>
              <div onClick={() => setPage(item.page)} style={{ background: "var(--off-black)", padding: 52, display: "flex", flexDirection: "column", gap: 24, transition: "background 0.3s", minHeight: 460 }} onMouseEnter={e => e.currentTarget.style.background = "var(--charcoal)"} onMouseLeave={e => e.currentTarget.style.background = "var(--off-black)"}>
                <span className="tag" style={{ alignSelf: "flex-start" }}>{item.tag}</span>
                <h3 className="serif" style={{ fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 300, lineHeight: 1.2, marginTop: "auto" }}>{item.title}</h3>
                <p style={{ fontSize: 13, color: "var(--dim)", lineHeight: 1.8 }}>{item.body}</p>
                <button className="btn-ghost" style={{ alignSelf: "flex-start", marginTop: 8 }}>{t.learnMore} <span style={{ fontSize: 14 }}>→</span></button>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <PageFooter setPage={setPage} label="Revy Wild · Tokyo" lang={lang} />
    </div>
  );
}

/* ─── IZAKAYA PAGE ────────────────────────── */
function IzakayaPage({ setPage, lang }) {
  const t = T[lang].izakaya;
  return (
    <div className="page-wrap">
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "flex-end", padding: "0 48px 80px", background: "var(--off-black)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, var(--off-black) 50%, transparent)" }} />
        <img src="/izakaya.png" alt="Izakaya Tokyo" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(100%)", opacity: 0.25 }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 680 }}>
          <span style={{ fontSize: 9, letterSpacing: "0.4em", color: "var(--muted)", textTransform: "uppercase", display: "block", marginBottom: 32 }}>{t.eyebrow}</span>
          <h1 className="serif" style={{ fontSize: "clamp(40px, 7vw, 88px)", fontWeight: 300, lineHeight: 0.95, marginBottom: 32 }}>
            {t.h1a}<br /><span className="italic" style={{ color: "var(--silver)" }}>{t.h1c}</span>
          </h1>
          <p style={{ fontSize: 15, color: "var(--dim)", lineHeight: 1.9, maxWidth: 460 }}>{t.sub}</p>
        </div>
      </section>

      <section style={{ padding: "100px 48px", background: "var(--off-black)" }}>
        <FadeIn>
          <div style={{ maxWidth: 640 }}>
            <div className="rule-sm" style={{ marginBottom: 40 }} />
            <p style={{ fontSize: 15, color: "var(--silver)", lineHeight: 2, fontWeight: 300 }}>{t.filterP1}</p>
            <p style={{ fontSize: 15, color: "var(--silver)", lineHeight: 2, fontWeight: 300, marginTop: 24 }}>{t.filterP2}</p>
          </div>
        </FadeIn>
      </section>

      <section style={{ padding: "120px 48px" }}>
        <FadeIn>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 80, paddingBottom: 24, borderBottom: "1px solid var(--charcoal)", flexWrap: "wrap", gap: 16 }}>
            <h2 className="serif" style={{ fontSize: "clamp(32px, 4vw, 56px)", fontWeight: 300 }}>{t.stopsTitle}</h2>
            <span style={{ fontSize: 10, letterSpacing: "0.3em", color: "var(--muted)", textTransform: "uppercase" }}>{t.stopsSub}</span>
          </div>
        </FadeIn>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {t.stops.map((stop, i) => (
            <FadeIn key={stop.n} delay={i * 0.1}>
              <div style={{ display: "grid", gridTemplateColumns: "100px 1fr", gap: 40, padding: "52px 0", borderBottom: "1px solid var(--charcoal)", alignItems: "start" }}>
                <div>
                  <div className="num" style={{ fontSize: 48 }}>{stop.n}</div>
                  <div style={{ fontSize: 10, letterSpacing: "0.2em", color: "var(--silver)", textTransform: "uppercase", marginTop: 8, lineHeight: 1.6 }}>{stop.area}</div>
                </div>
                <div>
                  <h3 className="serif" style={{ fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 300, marginBottom: 20 }}>{stop.title}</h3>
                  <p style={{ fontSize: 15, color: "var(--silver)", lineHeight: 1.9 }}>{stop.body}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section style={{ padding: "100px 48px", background: "var(--off-black)" }}>
        <FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
            <div>
              <div className="serif" style={{ fontSize: "clamp(48px, 6vw, 64px)", fontWeight: 300, color: "var(--near-white)", marginBottom: 8 }}>{t.priceNum}</div>
              <div style={{ fontSize: 10, letterSpacing: "0.25em", color: "var(--muted)", textTransform: "uppercase", marginBottom: 32, lineHeight: 1.8 }}>{t.priceSub}</div>
              <p style={{ fontSize: 13, color: "var(--dim)", lineHeight: 1.9 }}>{t.priceBody}</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 32, alignItems: "flex-start" }}>
              <button className="btn-solid" onClick={() => setPage(PAGES.contact)}>{t.btn}</button>
              <button className="btn-ghost" onClick={() => setPage(PAGES.chefday)}>{t.crosslink} <span style={{ fontSize: 14 }}>→</span></button>
            </div>
          </div>
        </FadeIn>
      </section>

      <PageFooter setPage={setPage} back={PAGES.tokyo} label="Revy Wild · Tokyo" lang={lang} />
    </div>
  );
}

/* ─── CHEF DAY PAGE ───────────────────────── */
function ChefDayPage({ setPage, lang }) {
  const t = T[lang].chefday;
  return (
    <div className="page-wrap">
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "flex-end", padding: "0 48px 80px", background: "var(--off-black)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, var(--off-black) 45%, transparent)" }} />
        <img src="/japankitchen.png" alt="Chef kitchen Tokyo" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(100%)", opacity: 0.2 }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 680 }}>
          <span style={{ fontSize: 9, letterSpacing: "0.4em", color: "var(--muted)", textTransform: "uppercase", display: "block", marginBottom: 32 }}>{t.eyebrow}</span>
          <h1 className="serif" style={{ fontSize: "clamp(36px, 6vw, 82px)", fontWeight: 300, lineHeight: 1.05, marginBottom: 32 }}>
            {t.h1a}<br /><span className="italic" style={{ color: "var(--silver)" }}>{t.h1c}</span>
          </h1>
          <p style={{ fontSize: 14, color: "var(--dim)", lineHeight: 1.9, maxWidth: 460 }}>{t.sub}</p>
        </div>
      </section>

      <section style={{ padding: "100px 48px", background: "var(--off-black)" }}>
        <FadeIn>
          <div style={{ maxWidth: 640 }}>
            <div className="rule-sm" style={{ marginBottom: 40 }} />
            <p style={{ fontSize: 15, color: "var(--silver)", lineHeight: 2, fontWeight: 300 }}>{t.pull}</p>
          </div>
        </FadeIn>
      </section>

      <section style={{ padding: "120px 48px" }}>
        <FadeIn>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 80, paddingBottom: 24, borderBottom: "1px solid var(--charcoal)", flexWrap: "wrap", gap: 16 }}>
            <h2 className="serif" style={{ fontSize: "clamp(28px, 4vw, 56px)", fontWeight: 300 }}>{t.stepsTitle}</h2>
            <span style={{ fontSize: 10, letterSpacing: "0.3em", color: "var(--muted)", textTransform: "uppercase" }}>{t.stepsSub}</span>
          </div>
        </FadeIn>
        <div className="steps-grid">
          {t.steps.map((step, i) => (
            <FadeIn key={step.n} delay={i * 0.1}>
              <div>
                <div className="serif" style={{ fontSize: 48, color: "var(--charcoal)", lineHeight: 1, marginBottom: 16 }}>{step.n}</div>
                <div className="rule" style={{ marginBottom: 20 }} />
                <h4 style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12, color: "var(--muted)" }}>{step.title}</h4>
                <p style={{ fontSize: 13, color: "var(--silver)", lineHeight: 1.9 }}>{step.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section style={{ padding: "100px 48px", background: "var(--off-black)" }}>
        <FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
            <div>
              <div className="serif" style={{ fontSize: "clamp(40px, 6vw, 64px)", fontWeight: 300, color: "var(--near-white)", marginBottom: 8 }}>{t.priceNum}</div>
              <div style={{ fontSize: 10, letterSpacing: "0.25em", color: "var(--muted)", textTransform: "uppercase", marginBottom: 32, lineHeight: 1.8 }}>{t.priceSub}</div>
              <p style={{ fontSize: 13, color: "var(--dim)", lineHeight: 1.9 }}>{t.priceBody}</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 32, alignItems: "flex-start" }}>
              <button className="btn-solid" onClick={() => setPage(PAGES.contact)}>{t.btn}</button>
              <button className="btn-ghost" onClick={() => setPage(PAGES.izakaya)}>{t.crosslink} <span style={{ fontSize: 14 }}>→</span></button>
            </div>
          </div>
        </FadeIn>
      </section>

      <PageFooter setPage={setPage} back={PAGES.tokyo} label="Revy Wild · Tokyo" lang={lang} />
    </div>
  );
}

/* ─── MAUI PAGE ───────────────────────────── */
function MauiPage({ setPage, lang }) {
  const t = T[lang].maui;
  return (
    <div className="page-wrap">
      <section style={{ minHeight: "85vh", display: "flex", alignItems: "flex-end", padding: "0 48px 80px", background: "var(--off-black)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, var(--off-black) 50%, transparent)" }} />
        <img src="/maui.png" alt="Maui" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(100%)", opacity: 0.2 }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 680 }}>
          <span style={{ fontSize: 9, letterSpacing: "0.4em", color: "var(--muted)", textTransform: "uppercase", display: "block", marginBottom: 32 }}>{t.eyebrow}</span>
          <h1 className="serif" style={{ fontSize: "clamp(44px, 8vw, 96px)", fontWeight: 300, lineHeight: 0.95, marginBottom: 32 }}>
            {t.h1a}<br /><span className="italic" style={{ color: "var(--silver)" }}>{t.h1c}</span>
          </h1>
          <p style={{ fontSize: 14, color: "var(--dim)", lineHeight: 1.9, maxWidth: 440 }}>{t.sub}</p>
        </div>
      </section>

      <section style={{ padding: "120px 48px" }}>
        <FadeIn>
          <div className="maui-inner" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
            <div>
              <h2 className="serif" style={{ fontSize: "clamp(28px, 4vw, 60px)", fontWeight: 300, lineHeight: 1.15, marginBottom: 32 }}>
                {t.h2a}<br /><span className="italic" style={{ color: "var(--silver)" }}>{t.h2c}</span>
              </h2>
              <p style={{ fontSize: 14, color: "var(--dim)", lineHeight: 1.9, marginBottom: 40 }}>{t.body}</p>
              <button className="btn-ghost" onClick={() => setPage(PAGES.contact)}>{t.inquire} <span style={{ fontSize: 14 }}>→</span></button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {t.cards.map((item) => (
                <div key={item.title} style={{ background: "var(--off-black)", padding: 32 }}>
                  <h4 style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12, color: "var(--near-white)" }}>{item.title}</h4>
                  <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.8 }}>{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      <PageFooter setPage={setPage} label="Revy Wild · Maui" lang={lang} />
    </div>
  );
}

/* ─── ABOUT PAGE ──────────────────────────── */
function AboutPage({ setPage, lang }) {
  const t = T[lang].about;
  return (
    <div className="page-wrap">
      <section style={{ minHeight: "100vh", padding: "160px 48px 120px" }}>
        <div className="about-grid">
          <div className="about-photo">
            <FadeIn>
              <div style={{ aspectRatio: "2/3", background: "var(--charcoal)", overflow: "hidden", marginBottom: 24 }}>
                <img src="/hero-revy.png" alt="Rebecca Hsiao" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", filter: "grayscale(100%)", opacity: 0.6 }} />
              </div>
              <p style={{ fontSize: 10, letterSpacing: "0.3em", color: "var(--muted)", textTransform: "uppercase", lineHeight: 1.8 }}>
                {t.nameLabel}<br />
                <span style={{ color: "var(--dim)", display: "block", marginTop: 6 }}>{t.nameRole}</span>
              </p>
            </FadeIn>
          </div>

          <div>
            <FadeIn>
              <h1 className="serif" style={{ fontSize: "clamp(36px, 5vw, 72px)", fontWeight: 300, lineHeight: 1, marginBottom: 60 }}>
                {t.h1}<br />
                <span className="italic" style={{ color: "var(--silver)", fontSize: "clamp(20px, 3vw, 40px)" }}>{t.h1sub}</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div style={{ marginBottom: 48 }}>
                {t.paras.map((para, i) => (
                  <p key={i} style={{ fontSize: 15, color: "var(--silver)", lineHeight: 1.9, fontWeight: 300, marginBottom: 28 }}>{para}</p>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <button className="btn-ghost" onClick={() => setPage(PAGES.contact)}>{t.cta} <span style={{ fontSize: 14 }}>→</span></button>
            </FadeIn>
          </div>
        </div>
      </section>

      <PageFooter setPage={setPage} label="Revy Wild" lang={lang} />
    </div>
  );
}

/* ─── CONTACT PAGE ────────────────────────── */
function ContactPage({ setPage, lang }) {
  const [formData, setFormData] = useState({ name: "", email: "", interest: "", message: "" });
  const [status, setStatus] = useState("idle");
  const t = T[lang].contact;

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.message) return;
    setStatus("sending");
    try {
      const res = await fetch("https://formspree.io/f/xqeglepk", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(formData),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch { setStatus("error"); }
  };

  const inputStyle = {
    background: "transparent", border: "none", borderBottom: "1px solid var(--mid)",
    color: "var(--near-white)", fontFamily: "'Montserrat', 'Noto Sans JP', sans-serif",
    fontSize: 13, fontWeight: 300, letterSpacing: "0.05em",
    padding: "16px 0", width: "100%", outline: "none", transition: "border-color 0.3s",
  };

  return (
    <div className="page-wrap">
      <section style={{ minHeight: "100vh", padding: "160px 48px 120px" }}>
        <div className="contact-grid">
          <FadeIn>
            <div>
              <h1 className="serif" style={{ fontSize: "clamp(36px, 5vw, 72px)", fontWeight: 300, lineHeight: 1, marginBottom: 40 }}>{t.h1}</h1>
              <p style={{ fontSize: 14, color: "var(--dim)", lineHeight: 1.9, maxWidth: 380, marginBottom: 60 }}>{t.sub}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {t.info.map(([label, val]) => (
                  <div key={label} style={{ display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap" }}>
                    <span style={{ fontSize: 9, letterSpacing: "0.3em", color: "var(--muted)", textTransform: "uppercase", minWidth: 80 }}>{label}</span>
                    <span style={{ fontSize: 13, color: "var(--silver)" }}>{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            {status === "sent" ? (
              <div style={{ paddingTop: 40 }}>
                <div className="serif italic" style={{ fontSize: 48, color: "var(--silver)", marginBottom: 24 }}>{t.success}</div>
                <p style={{ fontSize: 14, color: "var(--dim)", lineHeight: 1.9 }}>{t.successSub}</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 36, paddingTop: 40 }}>
                {t.fields.map((field) => (
                  <div key={field.key}>
                    <label style={{ fontSize: 9, letterSpacing: "0.3em", color: "var(--muted)", textTransform: "uppercase", display: "block", marginBottom: 8 }}>{field.label}</label>
                    <input type={field.type} value={formData[field.key]} onChange={e => setFormData({ ...formData, [field.key]: e.target.value })} style={inputStyle} onFocus={e => e.target.style.borderBottomColor = "var(--silver)"} onBlur={e => e.target.style.borderBottomColor = "var(--mid)"} />
                  </div>
                ))}
                <div>
                  <label style={{ fontSize: 9, letterSpacing: "0.3em", color: "var(--muted)", textTransform: "uppercase", display: "block", marginBottom: 8 }}>{t.msgLabel}</label>
                  <textarea value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} rows={5} style={{ ...inputStyle, resize: "none" }} onFocus={e => e.target.style.borderBottomColor = "var(--silver)"} onBlur={e => e.target.style.borderBottomColor = "var(--mid)"} />
                </div>
                {status === "error" && <p style={{ fontSize: 12, color: "#c0392b" }}>{t.error}</p>}
                <button className="btn-solid" onClick={handleSubmit} style={{ alignSelf: "flex-start",  opacity: status === "sending" ? 0.5 : 1 }}>
                  {status === "sending" ? t.sending : t.send}
                </button>
              </div>
            )}
          </FadeIn>
        </div>
      </section>

      <PageFooter setPage={setPage} label="Revy Wild" lang={lang} />
    </div>
  );
}

/* ─── APP ─────────────────────────────────── */
export default function App() {
  const [page, setPage] = useState(PAGES.home);
  const [lang, setLang] = useState("en");

  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, [page]);
  useEffect(() => {
    document.body.classList.toggle("lang-jp", lang === "jp");
  }, [lang]);

  const props = { setPage, lang };

  const renderPage = () => {
    switch (page) {
      case PAGES.tokyo:   return <TokyoPage {...props} />;
      case PAGES.izakaya: return <IzakayaPage {...props} />;
      case PAGES.chefday: return <ChefDayPage {...props} />;
      case PAGES.maui:    return <MauiPage {...props} />;
      case PAGES.about:   return <AboutPage {...props} />;
      case PAGES.contact: return <ContactPage {...props} />;
      default:            return <HomePage {...props} />;
    }
  };

  return (
    <>
      <GlobalStyle />
      <Nav setPage={setPage} lang={lang} setLang={setLang} />
      <main style={{ paddingTop: 80 }}>{renderPage()}</main>
    </>
  );
}
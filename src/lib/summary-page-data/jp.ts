import { summaryOverviewJp } from "./overview";

export const summaryPageDataJp = {
  overview: summaryOverviewJp,
  floorPlans: [
    {
      floor: "1F 間取り図",
      units: [
        { type: "A", layout: "2LDK", rooms: "101号室", area: "47.58 m²", tsubo: "14.39 坪" },
        { type: "B", layout: "1LDK", rooms: "102号室", area: "37.13 m²", tsubo: "11.23 坪" },
      ],
    },
    {
      floor: "2F–4F 間取り図",
      units: [
        { type: "C", layout: "1LDK", rooms: "201 / 301 / 401 号室", area: "37.67 m²", tsubo: "11.40 坪" },
        { type: "D", layout: "1K", rooms: "202 / 302 / 402 号室", area: "20.66 m²", tsubo: "6.25 坪" },
        { type: "E", layout: "1LDK", rooms: "203 / 303 / 403 号室", area: "37.92 m²", tsubo: "11.47 坪" },
      ],
    },
    {
      floor: "5F 間取り図",
      units: [
        { type: "F", layout: "1LDK", rooms: "501号室", area: "31.26 m²", tsubo: "9.46 坪" },
        { type: "G", layout: "1K", rooms: "502号室", area: "20.02 m²", tsubo: "6.06 坪" },
        { type: "H", layout: "1LDK", rooms: "503号室", area: "33.46 m²", tsubo: "10.12 坪" },
      ],
    },
  ],
  interiorRows: [
    {
      kind: "room",
      room: "ポーチ",
      floor: { text: "磁器質タイル貼り" },
      floorSub: { text: "コンクリート金ゴテ", rowSpan: 2 },
      baseboard: { text: "外壁同仕上げ" },
      wall: { text: "磁器質タイル・モザイクタイル" },
      wallSub: { text: "RC補修", rowSpan: 2 },
      ceiling: { text: "アクリル系リシン吹付け", rowSpan: 2 },
      ceilingSub: { text: "ケイカル板 t=8（軽鉄下地）" },
      height: { text: "2150" },
    },
    {
      kind: "room",
      room: "階段室・共用廊下",
      floor: { text: "防滑性ビニル床シート貼り" },
      floorSub: null,
      baseboard: { text: "ウレタンゴム系塗膜防水／H60" },
      wall: { text: "シリコン系吹付けタイル・アクセントタイル" },
      wallSub: null,
      ceiling: null,
      ceilingSub: { text: "RC補修・ケイカル板 t=8" },
      height: { text: "2100" },
    },
    { kind: "section", label: "〈住戸専有部〉" },
    {
      kind: "room",
      room: "玄関",
      floor: { text: "CFシート貼り t=2.0／直床用フローリング" },
      floorSub: { text: "セルフレベリング材", rowSpan: 7 },
      baseboard: { text: "木巾木 H40", rowSpan: 4 },
      wall: { text: "ビニルクロス貼り" },
      wallSub: { text: "PB t=12.5", rowSpan: 4 },
      ceiling: { text: "ビニルクロス貼り", rowSpan: 7 },
      ceilingSub: { text: "PB t=9.5", rowSpan: 2 },
      height: { text: "2100" },
    },
    {
      kind: "room",
      room: "LDK",
      floor: { text: "直床用フローリング", rowSpan: 3 },
      floorSub: null,
      baseboard: null,
      wall: { text: "ビニルクロス貼り／キッチン部：キッチンパネル t=4" },
      wallSub: null,
      ceiling: null,
      ceilingSub: null,
      height: { text: "2275" },
    },
    {
      kind: "room",
      room: "洋室",
      floor: null,
      floorSub: null,
      baseboard: null,
      wall: { text: "ビニルクロス貼り" },
      wallSub: null,
      ceiling: null,
      ceilingSub: { text: "コンクリート打放し補修", rowSpan: 2 },
      height: { text: "2275" },
    },
    {
      kind: "room",
      room: "CL",
      floor: null,
      floorSub: null,
      baseboard: null,
      wall: { text: "ビニルクロス貼り" },
      wallSub: null,
      ceiling: null,
      ceilingSub: null,
      height: { text: "2270" },
    },
    {
      kind: "room",
      room: "トイレ",
      floor: { text: "CFシート貼り t=1.8", rowSpan: 3 },
      floorSub: null,
      baseboard: { text: "ソフト巾木 H40", rowSpan: 3 },
      wall: { text: "ビニルクロス貼り（防汚・防カビ）", rowSpan: 3 },
      wallSub: { text: "耐水PB t=12.5", rowSpan: 3 },
      ceiling: null,
      ceilingSub: { text: "耐水PB t=9.5", rowSpan: 3 },
      height: { text: "2100", rowSpan: 3 },
    },
    {
      kind: "room",
      room: "洗面室",
      floor: null,
      floorSub: null,
      baseboard: null,
      wall: null,
      wallSub: null,
      ceiling: null,
      ceilingSub: null,
      height: null,
    },
    {
      kind: "room",
      room: "洗濯機置場",
      floor: null,
      floorSub: null,
      baseboard: null,
      wall: null,
      wallSub: null,
      ceiling: null,
      ceilingSub: null,
      height: null,
    },
    {
      kind: "room",
      room: "浴室",
      floor: { text: "UB1014／UB1116" },
      floorSub: { text: "—" },
      baseboard: { text: "—" },
      wall: { text: "—" },
      wallSub: { text: "—" },
      ceiling: { text: "—" },
      ceilingSub: { text: "—" },
      height: { text: "2000" },
    },
  ],
  equipmentRows: [
    {
      part: "ポーチ",
      items: [
        "集合玄関機",
        "メールボックス一体型宅配ボックス（防雨仕様）[NASTA]",
        "管理者連絡表示板（樹脂製）300×500",
        "消火器",
        "非常用照明",
        "誘導灯",
      ],
    },
    {
      part: "階段室・共用廊下",
      items: [
        "階段手摺：樹脂手摺既製品",
        "踏面・蹴込：防滑性ビニル床シート",
        "段鼻：ビニル床シート一体型",
        "アクセントタイル：各住戸前 W200×H2000 ピッツモザイクボーダー・陶彩 BM-OLM-4795/CAR [ニッタイ工業]同等",
        "階数表示板（SUS製）",
        "掲示板（A2サイズ）",
        "消火器",
        "非常用照明",
        "誘導灯",
      ],
    },
    { part: "玄関", items: ["下足入", "床見切り（SUS-FB）", "ダウンライト"] },
    {
      part: "LDK",
      items: [
        "システムキッチン",
        "レンジフード（ダクトはRW被覆）",
        "エアコン室内機（設備工事・下地・スリーブ）",
        "カーテンレール（W）",
        "給気口150φ（差圧式・FD付）",
        "住宅用火災警報器（熱感）",
      ],
    },
    {
      part: "洋室",
      items: [
        "エアコン室内機（設備工事・下地・スリーブ）",
        "カーテンレール（W）",
        "室内物干金物",
        "給気口100φ",
        "住宅用火災警報器（煙感）",
      ],
    },
    { part: "CL", items: ["ハンガーパイプ（SUS32φ同等）", "枕棚D400"] },
    {
      part: "トイレ",
      items: [
        "洋式便器（温水洗浄便座付／タンク上部手洗付）",
        "ペーパーホルダー",
        "タオルリング",
        "固定棚",
        "ダウンライト",
        "換気設備（24時間換気）",
      ],
    },
    {
      part: "洗面室",
      items: ["洗面化粧台 L600", "タオルリング", "ダウンライト", "換気設備（24時間換気）", "分電盤"],
    },
    {
      part: "洗濯機置場",
      items: [
        "洗濯機パン640□（洗濯機パン下を他配管が通過する場合、SL+120とし薄型タイプを基本とする。他配管が通過せず、配管を隠蔽可能な場合、高床タイプも可とする。）",
      ],
    },
    {
      part: "浴室",
      items: ["ユニットバス1014/1116", "浴室換気暖房乾燥機（24時間換気）", "ハンガーパイプ（UB付属品）"],
      note: "※JIS A4416に適合する。",
    },
  ],
  exteriorColumns: [
    {
      groups: [
        {
          part: "屋上",
          rows: [
            { sub: "屋根", spec: "合成高分子系塩ビシート防水＋上塗り（RC下地）【SI-F2】同等" },
            {
              sub: "パラペット",
              spec: "合成高分子系塩ビシート防水＋上塗り（RC下地）\nアルミアングル押え金物（ジョイント部補強ピッチ1500以内）",
            },
            {
              sub: "設備基礎",
              spec: "・アンテナ：ウレタンゴム系塗膜防水（ガラスクロス補強・2回塗り）【X-1】同等\n・空調：Solar Base VT [田島ルーフィング]＋C形鋼ボルト固定\n附属金物一式",
            },
            { sub: "ハト小屋", spec: "Hatocotto P-0型 [昭和電工]" },
            { sub: "屋上点検口", spec: "600角 SUS304 ・タラップ φ22×400×3段 SUS304" },
          ],
        },
        {
          part: "ルーフバルコニー",
          rows: [
            {
              spec: "合成高分子系塩ビシート防水＋上塗り（RC下地）\nアルミアングル押え金物（ジョイント部補強ピッチ1500以内）\nVPオーバーフロー φ25設置\n壁：外壁仕上と同仕様\n手摺：アルミ格子手摺",
            },
          ],
        },
        {
          part: "ルーフドレイン",
          rows: [
            {
              spec: "鋳鉄製（塩ビ管用） ●75φ ○50φ\n※中継ドレインは差込式飛散防止品",
            },
          ],
        },
        { part: "竪樋", rows: [{ spec: "カラーVU管 75φ、支持金物：SUS製" }] },
        {
          part: "外壁",
          rows: [
            {
              spec: "超耐久低汚染型一液水性セラミックシリコン樹脂塗料、ローラー用水性アクリルシリコン樹脂系石材調塗料、磁器質タイル張り 600×300 t=10",
            },
          ],
        },
        { part: "基礎立上り", rows: [{ spec: "外壁仕上と同仕様" }] },
        {
          part: "目地",
          rows: [
            {
              spec: "打継目地 W15、化粧目地 W15、構造目地（構造図による）、誘発目地 @3000以内\nポリサルファイド系シーリング（構造伸縮部はWシール）",
            },
          ],
        },
      ],
    },
    {
      groups: [
        {
          part: "開口部",
          rows: [
            { sub: "出入口", spec: "SUS製格子戸 化粧：アルミ鋳物 防火設備" },
            { sub: "玄関ドア", spec: "鋼製開き戸（塩ビ鋼板製）ダブルロック 防火設備" },
            { sub: "窓", spec: "アルミサッシ（電解着色）網戸付（一部シャッター付）防火設備" },
            { sub: "MB/PS", spec: "鋼製開き戸 SOP塗装" },
          ],
        },
        {
          part: "外構",
          partNote: "（外構平面図による）",
          rows: [
            { sub: "アプローチ床", spec: "磁器質タイル（割付は図面による）" },
            { sub: "犬走り", spec: "防草シートの上砂利敷き\nコンクリート金ゴテ仕上" },
            { sub: "塀", spec: "CB基礎の上、メッシュフェンス（H1800）" },
            { sub: "共用水栓", spec: "鍵付散水栓ボックス埋込・MB（3F）" },
          ],
        },
        {
          part: "その他",
          rows: [
            { sub: "館銘板", spec: "カラーステンレス HL 600×300" },
            { sub: "管理者連絡表示板", spec: "樹脂製 300×500" },
            { sub: "避難器具", spec: "2F：避難ロープ、3F：避難はしご、4・5F：緩降機\n※消防認定品" },
            { sub: "物干金物", spec: "外部物干金物なし" },
            {
              sub: "消火器",
              spec: "消火器（ABC粉末 10型）2F・4Fは強化液、格納箱収納\n※歩行距離20mにつき1本",
            },
          ],
        },
      ],
    },
  ],
};

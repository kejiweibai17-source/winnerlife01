import { summaryOverviewZh } from "./overview";

export const summaryPageDataZh = {
  overview: summaryOverviewZh,
  floorPlans: [
    {
      floor: "1F 平面圖",
      units: [
        { type: "A", layout: "2LDK", rooms: "101號", area: "47.58 m²", tsubo: "14.39 坪" },
        { type: "B", layout: "1LDK", rooms: "102號", area: "37.13 m²", tsubo: "11.23 坪" },
      ],
    },
    {
      floor: "2F–4F 平面圖",
      units: [
        { type: "C", layout: "1LDK", rooms: "201 / 301 / 401 號", area: "37.67 m²", tsubo: "11.40 坪" },
        { type: "D", layout: "1K", rooms: "202 / 302 / 402 號", area: "20.66 m²", tsubo: "6.25 坪" },
        { type: "E", layout: "1LDK", rooms: "203 / 303 / 403 號", area: "37.92 m²", tsubo: "11.47 坪" },
      ],
    },
    {
      floor: "5F 平面圖",
      units: [
        { type: "F", layout: "1LDK", rooms: "501號", area: "31.26 m²", tsubo: "9.46 坪" },
        { type: "G", layout: "1K", rooms: "502號", area: "20.02 m²", tsubo: "6.06 坪" },
        { type: "H", layout: "1LDK", rooms: "503號", area: "33.46 m²", tsubo: "10.12 坪" },
      ],
    },
  ],
  interiorRows: [
    {
      kind: "room",
      room: "門廊",
      floor: { text: "鋪設瓷質磁磚" },
      floorSub: { text: "混凝土金鏝抹平", rowSpan: 2 },
      baseboard: { text: "與外牆相同裝修" },
      wall: { text: "瓷質磁磚・馬賽克磚" },
      wallSub: { text: "RC補修", rowSpan: 2 },
      ceiling: { text: "壓克力系噴塗", rowSpan: 2 },
      ceilingSub: { text: "矽酸鈣板 t=8（輕鋼架底層）" },
      height: { text: "2150" },
    },
    {
      kind: "room",
      room: "樓梯間・共用走廊",
      floor: { text: "鋪設防滑塑膠地板" },
      floorSub: null,
      baseboard: { text: "聚氨酯橡膠系塗膜防水／H60" },
      wall: { text: "矽利康系噴塗磁磚・特色磁磚" },
      wallSub: null,
      ceiling: null,
      ceilingSub: { text: "RC補修・矽酸鈣板 t=8" },
      height: { text: "2100" },
    },
    { kind: "section", label: "〈住戶專有部分〉" },
    {
      kind: "room",
      room: "玄關",
      floor: { text: "鋪設塑膠地磚 t=2.0／直鋪式木地板" },
      floorSub: { text: "自流平材料", rowSpan: 7 },
      baseboard: { text: "木質踢腳板 H40", rowSpan: 4 },
      wall: { text: "鋪設塑膠壁紙" },
      wallSub: { text: "石膏板 t=12.5", rowSpan: 4 },
      ceiling: { text: "鋪設塑膠壁紙", rowSpan: 7 },
      ceilingSub: { text: "石膏板 t=9.5", rowSpan: 2 },
      height: { text: "2100" },
    },
    {
      kind: "room",
      room: "LDK",
      floor: { text: "直鋪式木地板", rowSpan: 3 },
      floorSub: null,
      baseboard: null,
      wall: { text: "鋪設塑膠壁紙／廚房區域：廚房壁板 t=4" },
      wallSub: null,
      ceiling: null,
      ceilingSub: null,
      height: { text: "2275" },
    },
    {
      kind: "room",
      room: "西式房間",
      floor: null,
      floorSub: null,
      baseboard: null,
      wall: { text: "鋪設塑膠壁紙" },
      wallSub: null,
      ceiling: null,
      ceilingSub: { text: "清水混凝土修飾", rowSpan: 2 },
      height: { text: "2275" },
    },
    {
      kind: "room",
      room: "壁櫥",
      floor: null,
      floorSub: null,
      baseboard: null,
      wall: { text: "鋪設塑膠壁紙" },
      wallSub: null,
      ceiling: null,
      ceilingSub: null,
      height: { text: "2270" },
    },
    {
      kind: "room",
      room: "廁所",
      floor: { text: "鋪設塑膠地磚 t=1.8", rowSpan: 3 },
      floorSub: null,
      baseboard: { text: "軟質踢腳板 H40", rowSpan: 3 },
      wall: { text: "鋪設塑膠壁紙（防污・防霉）", rowSpan: 3 },
      wallSub: { text: "耐水石膏板 t=12.5", rowSpan: 3 },
      ceiling: null,
      ceilingSub: { text: "耐水石膏板 t=9.5", rowSpan: 3 },
      height: { text: "2100", rowSpan: 3 },
    },
    {
      kind: "room",
      room: "盥洗室",
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
      room: "洗衣機放置處",
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
      part: "門廊",
      items: [
        "集合門口機",
        "信箱一體型宅配箱（防雨規格）[NASTA]",
        "管理員聯絡告示板（樹脂製）300×500",
        "滅火器",
        "緊急照明",
        "誘導燈",
      ],
    },
    {
      part: "樓梯間・共用走廊",
      items: [
        "樓梯扶手：樹脂扶手既製品",
        "踏面・踢面：防滑乙烯基地板材",
        "踏步鼻端：乙烯基地板材一體型",
        "特色磁磚：各住戶前 W200×H2000 嵌飾馬賽克邊框・陶彩 BM-OLM-4795/CAR [日泰工業]同等品",
        "樓層標示板（SUS製）",
        "佈告欄（A2尺寸）",
        "滅火器",
        "緊急照明",
        "誘導燈",
      ],
    },
    { part: "玄關", items: ["鞋櫃", "地板收邊條（SUS-FB）", "崁燈"] },
    {
      part: "LDK",
      items: [
        "系統廚具",
        "抽油煙機（風管採RW包覆）",
        "空調室內機（設備工程・底層・套管）",
        "窗簾軌道（雙軌）",
        "進氣口150φ（差壓式・附FD）",
        "住宅用火災警報器（熱感應）",
      ],
    },
    {
      part: "西式房間",
      items: [
        "空調室內機（設備工程・底層・套管）",
        "窗簾軌道（雙軌）",
        "室內晾衣五金",
        "進氣口100φ",
        "住宅用火災警報器（煙感應）",
      ],
    },
    { part: "壁櫥", items: ["吊衣桿（SUS32φ同等品）", "頂層層架 D400"] },
    {
      part: "廁所",
      items: [
        "西式馬桶（附溫水洗淨便座／水箱上方附洗手）",
        "捲筒衛生紙架",
        "毛巾環",
        "固定層板",
        "崁燈",
        "換氣設備（24小時換氣）",
      ],
    },
    {
      part: "盥洗室",
      items: ["洗面化妝台 L600", "毛巾環", "崁燈", "換氣設備（24小時換氣）", "配電盤"],
    },
    {
      part: "洗衣機放置處",
      items: [
        "洗衣機防水底盤640□（若底盤下方有其他管線通過，以SL+120薄型為原則。若無其他管線通過且可隱藏管線時，亦可使用高架型。）",
      ],
    },
    {
      part: "浴室",
      items: ["整體浴室1014/1116", "浴室換氣暖房乾燥機（24小時換氣）", "吊衣桿（UB附屬品）"],
      note: "※符合JIS A4416。",
    },
  ],
  exteriorColumns: [
    {
      groups: [
        {
          part: "屋頂",
          rows: [
            { sub: "屋頂面", spec: "合成高分子系PVC防水捲材＋面漆（RC底層）【SI-F2】同等品" },
            {
              sub: "女兒牆",
              spec: "合成高分子系PVC防水捲材＋面漆（RC底層）\n鋁合金護角固定金屬件（接縫處補強間距1500以內）",
            },
            {
              sub: "設備基礎",
              spec: "・天線：聚氨酯橡膠系塗膜防水（玻璃纖維網補強・塗刷2次）【X-1】同等品\n・空調：Solar Base VT [Tajima Roofing]＋C型鋼螺栓固定\n附屬金屬配件一套",
            },
            { sub: "管道頂蓋", spec: "Hatocotto P-0型 [昭和電工]" },
            { sub: "屋頂檢修口", spec: "600角 SUS304 ・爬梯 φ22×400×3段 SUS304" },
          ],
        },
        {
          part: "露台",
          rows: [
            {
              spec: "合成高分子系PVC防水捲材＋面漆（RC底層）\n鋁合金護角固定金屬件（接縫處補強間距1500以內）\n設置VP溢流管 φ25\n牆面：與外牆飾面相同\n扶手：鋁製格柵扶手",
            },
          ],
        },
        {
          part: "屋頂排水口",
          rows: [
            {
              spec: "鑄鐵製（PVC管用） ●75φ ○50φ\n※中繼排水口採用嵌入式防噴濺產品",
            },
          ],
        },
        {
          part: "排水立管",
          rows: [{ spec: "彩色VU管 75φ，支撐金屬件：SUS製" }],
        },
        {
          part: "外牆",
          rows: [
            {
              spec: "超耐久低汙染型單液水性陶瓷矽樹脂系塗料、滾塗用水性壓克力矽樹脂系石材感塗料、瓷質磁磚鋪貼 600×300 t=10",
            },
          ],
        },
        { part: "基礎立面", rows: [{ spec: "與外牆飾面相同" }] },
        {
          part: "接縫",
          rows: [
            {
              spec: "施工縫 W15、裝飾縫 W15、構造縫（依構造圖）、誘導縫 @3000以內\n聚硫密封膠（構造伸縮縫處採用W密封）",
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
            { sub: "出入口", spec: "SUS製格柵門 裝飾：鋁鑄件 防火設備" },
            { sub: "玄關門", spec: "鋼製單開門（聚氯乙烯鋼板製）雙重鎖 防火設備" },
            { sub: "窗戶", spec: "鋁製窗框（電解著色）附紗窗（部分附捲簾）防火設備" },
            { sub: "MB/PS", spec: "鋼製對開門 SOP塗料（合成樹脂調合漆）塗裝" },
          ],
        },
        {
          part: "外構",
          partNote: "（依景觀平面圖）",
          rows: [
            { sub: "通道地面", spec: "瓷質磁磚（拼貼樣式依設計圖）" },
            { sub: "散水", spec: "防草墊上鋪設砂礫\n混凝土金鏝抹平飾面" },
            { sub: "圍牆", spec: "CB基礎上，網狀圍欄（H1800）" },
            { sub: "共用龍頭", spec: "附鎖式散水栓箱埋入・MB（3F）" },
          ],
        },
        {
          part: "其他",
          rows: [
            { sub: "館銘板", spec: "彩色不鏽鋼 HL（髮絲紋）600×300" },
            { sub: "管理聯絡告示牌", spec: "樹脂製 300×500" },
            { sub: "避難器具", spec: "2F：避難繩、3F：避難梯、4・5F：緩降機\n※消防認定品" },
            { sub: "晾衣金屬件", spec: "無外部晾衣金屬件" },
            {
              sub: "滅火器",
              spec: "滅火器（ABC粉末 10型）2樓及4樓為強化液，收納箱存放\n※步行距離每20m設置1具",
            },
          ],
        },
      ],
    },
  ],
};

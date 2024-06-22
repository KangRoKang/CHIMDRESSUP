const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let currentPreset = 1;
let currentBackground = 0;
let draggingItem = null;
let offsetX, offsetY;
let interactable = true; // 전역 변수로 상호작용 가능 여부 설정
let PNGCHANGERATE = 2.27555;
let angleChangeValue = 1;
let usersrc = [];
// 이미지 객체 생성 및 위치 초기화
const images = {
    background: new Image(),
    items: []
};

// 프리셋 데이터
const presets = [
    {
        backgroundname:'한교동과 침착맨',
        background: 'resource/preset1',
        items: [
            { src: 'resource/침착맨.png', x: 289, y: 176, width: 0, height: 0, angle: 0, isClickable: true ,iwidth: 0, iheight: 0},
            { src: 'resource/교동하의.png', x: 587, y: 479, width: 0, height: 0, angle: 0, isClickable: true ,iwidth: 0, iheight: 0},
            { src: 'resource/교동상의.png', x: 590, y: 329, width: 0, height: 0, angle: 0, isClickable: true ,iwidth: 0, iheight: 0},
            { src: 'resource/교동헤어.png', x: 537, y: 141, width: 0, height: 480, angle: 0, isClickable: true ,iwidth: 0, iheight: 0},
            { src: 'resource/교동모자.png', x: -18, y: 33, width: 0, height: 0, angle: -65, isClickable: true ,iwidth: 0, iheight: 0},
            { src: 'resource/교동문어.png', x: 94, y: 416, width: 0, height: 0, angle: 0, isClickable: true ,iwidth: 0, iheight: 0},
            { src: 'resource/로고.png', x: 362, y: 33, width: 0, height: 0, angle: 0, isClickable: true ,iwidth: 0, iheight: 0}
        ]
    },
    {
        backgroundname:'테무깡 침착맨',
        background: 'resource/preset2',
        items: [
            { src: 'resource/침착맨.png', x: 289, y: 176, width: 0, height: 0, angle: 0, isClickable: true ,iwidth: 0, iheight: 0},
            { src: 'resource/테무신발.png', x: 81, y: 486, width: 0, height: 0, angle: 0, isClickable: true ,iwidth: 0, iheight: 0},
            { src: 'resource/테무하의.png', x: 552, y: 392, width: 0, height: 0, angle: 0, isClickable: true ,iwidth: 0, iheight: 0},
            { src: 'resource/테무상의.png', x: 73, y: 287, width: 0, height: 0, angle: 0, isClickable: true ,iwidth: 0, iheight: 0},
            { src: 'resource/테무모자.png', x: 552, y: 190, width: 0, height: 0, angle: 0, isClickable: true ,iwidth: 0, iheight: 0},
            { src: 'resource/테무안경.png', x: 59, y: 39, width: 0, height: 0, angle: 0, isClickable: true ,iwidth: 0, iheight: 0},
            { src: 'resource/로고.png', x: 422, y: 51, width: 0, height: 0, angle: 0, isClickable: true ,iwidth: 0, iheight: 0}
        ]
    },
    {
        backgroundname:'백상예술대상 침착맨',
        background: 'resource/preset3',
        items: [
            { src: 'resource/침착맨.png', x: 289, y: 176, width: 0, height: 0, angle: 0, isClickable: true ,iwidth: 0, iheight: 0},
            { src: 'resource/백상하의.png', x: 83, y: 421, width: 0, height: 0, angle: 0, isClickable: true ,iwidth: 0, iheight: 0},
            { src: 'resource/백상상의.png', x: 556, y: 289, width: 0, height: 0, angle: 0, isClickable: true ,iwidth: 0, iheight: 0},
            { src: 'resource/백상헤어.png', x: 57, y: 75, width: 0, height: 0, angle: 0, isClickable: true ,iwidth: 0, iheight: 0},
            { src: 'resource/로고.png', x: 494, y: 68, width: 0, height: 0, angle: 0, isClickable: true ,iwidth: 0, iheight: 0}
        ]
    },
    {
        backgroundname:'고프코어룩 침착맨',
        background: 'resource/preset4',
        items: [
            { src: 'resource/침착맨.png', x: 289, y: 176, width: 0, height: 0, angle: 0, isClickable: true ,iwidth: 0, iheight: 0},
            { src: 'resource/고프모자.png', x: 64, y: 95, width: 0, height: 0, angle: 0, isClickable: true ,iwidth: 0, iheight: 0},
            { src: 'resource/고프신발.png', x: 565, y: 498, width: 0, height: 0, angle: 0, isClickable: true ,iwidth: 0, iheight: 0},
            { src: 'resource/고프하의.png', x: 79, y: 370, width: 0, height: 0, angle: 0, isClickable: true ,iwidth: 0, iheight: 0},
            { src: 'resource/고프상의.png', x: 550, y: 267, width: 0, height: 0, angle: 0, isClickable: true ,iwidth: 0, iheight: 0},
            { src: 'resource/로고.png', x: 424, y: 51, width: 0, height: 0, angle: 0, isClickable: true ,iwidth: 0, iheight: 0}
        ]
    },
    {
        backgroundname:'국밥룩 침착맨',
        background: 'resource/preset5',
        items: [
            { src: 'resource/침착맨.png', x: 289, y: 176, width: 0, height: 0, angle: 0, isClickable: true ,iwidth: 0, iheight: 0},
            { src: 'resource/국밥상의.png', x: 68, y: 287, width: 0, height: 0, angle: 0, isClickable: true ,iwidth: 0, iheight: 0},
            { src: 'resource/국밥하의.png', x: 567, y: 437, width: 0, height: 0, angle: 0, isClickable: true ,iwidth: 0, iheight: 0},
            { src: 'resource/국밥신발.png', x: 87, y: 474, width: 0, height: 0, angle: 0, isClickable: true ,iwidth: 0, iheight: 0},
            { src: 'resource/국밥아우터.png', x: 556, y: 229, width: 0, height: 0, angle: 0, isClickable: true ,iwidth: 0, iheight: 0},
            { src: 'resource/국밥헤어.png', x: 53, y: 61, width: 0, height: 0, angle: 0, isClickable: true ,iwidth: 0, iheight: 0},
            { src: 'resource/로고.png', x: 422, y: 52, width: 0, height: 0, angle: 0, isClickable: true ,iwidth: 0, iheight: 0}
        ]
    },
    {
        backgroundname:'전당포 기사 침착맨',
        background: 'resource/preset6',
        items: [
            { src: 'resource/침착맨기사.png', x: 307, y: 176, width: 0, height: 0, angle: 0, isClickable: true ,iwidth: 0, iheight: 0},
            { src: 'resource/전당상의.png', x: 552, y: 218, width: 0, height: 0, angle: -12, isClickable: true ,iwidth: 0, iheight: 0},
            { src: 'resource/전당하의.png', x: 568, y: 420, width: 0, height: 0, angle: 10, isClickable: true ,iwidth: 0, iheight: 0},
            { src: 'resource/전당아우터.png', x: 100, y: 354, width: 0, height: 0, angle: 0, isClickable: true ,iwidth: 0, iheight: 0},
            { src: 'resource/전당메달.png', x: 335, y: 66, width: 0, height: 0, angle: 12, isClickable: true ,iwidth: 0, iheight: 0},
            { src: 'resource/전당모자.png', x: 63, y: 89, width: 0, height: 0, angle: -17, isClickable: true ,iwidth: 0, iheight: 0},
            { src: 'resource/로고.png', x: 497, y: 35, width: 0, height: 0, angle: 0, isClickable: true ,iwidth: 0, iheight: 0}
        ]
    },
    {
        backgroundname:'떼무깡 침착맨',
        background: 'resource/preset7',
        items: [
            { src: 'resource/침착맨.png', x: 289, y: 176, width: 0, height: 0, angle: 0, isClickable: true ,iwidth: 0, iheight: 0},
            { src: 'resource/떼무하의.png', x: 613, y: 466, width: 0, height: 0, angle: -5, isClickable: true ,iwidth: 0, iheight: 0},
            { src: 'resource/떼무상의1.png', x: 597, y: 170, width: 0, height: 0, angle: 11, isClickable: true ,iwidth: 0, iheight: 0},
            { src: 'resource/떼무상의2.png', x: 524, y: 330, width: 0, height: 0, angle: -11, isClickable: true ,iwidth: 0, iheight: 0},
            { src: 'resource/떼무헤어1.png', x: 26, y: 34, width: 0, height: 0, angle: -24, isClickable: true ,iwidth: 0, iheight: 0},
            { src: 'resource/떼무헤어2.png', x: 26, y: 331, width: 0, height: 0, angle: 47, isClickable: true ,iwidth: 0, iheight: 0},
            { src: 'resource/떼무로고.png', x: 402, y: 44, width: 0, height: 0, angle: 0, isClickable: true ,iwidth: 0, iheight: 0}
        ]
    },
    {
        backgroundname:'마법소녀 카와이 즈큥도큥 러블링 바큥부큥 침착맨',
        background: 'resource/preset8',
        items: [
            { src: 'resource/침착맨.png', x: 289, y: 176, width: 0, height: 0, angle: 0, isClickable: true ,iwidth: 0, iheight: 0},
            { src: 'resource/마법상의.png', x: 561, y: 343, width: 0, height: 0, angle: 9, isClickable: true ,iwidth: 0, iheight: 0},
            { src: 'resource/마법하의.png', x: 554, y: 480, width: 0, height: 0, angle: 0, isClickable: true ,iwidth: 0, iheight: 0},
            { src: 'resource/마법헤어1.png', x: 48, y: 53, width: 0, height: 0, angle: 0, isClickable: true ,iwidth: 0, iheight: 0},
            { src: 'resource/마법헤어2.png', x: 1, y: 278, width: 0, height: 0, angle: 89, isClickable: true ,iwidth: 0, iheight: 0},
            { src: 'resource/마법헤어3.png', x: 535, y: 191, width: 0, height: 0, angle: 5, isClickable: true ,iwidth: 0, iheight: 0},
            { src: 'resource/로고.png', x: 420, y: 47, width: 0, height: 0, angle: 0, isClickable: true ,iwidth: 0, iheight: 0}
        ]
    }
];

let backgroundinfo = [
    {backgroundname:'배경1',width: 800, height: 600},
    {backgroundname:'배경2',width: 800, height: 600},
    {backgroundname:'배경3',width: 800, height: 600},
    {backgroundname:'배경4',width: 800, height: 600},
    {backgroundname:'배경5',width: 800, height: 600},
    {backgroundname:'배경6',width: 800, height: 600},
    {backgroundname:'노트북뒷면',width: 930, height: 600},
    {backgroundname:'배도라지1',width: 925, height: 600},
    {backgroundname:'강동구 스튜디오',width: 600, height: 600},
    {backgroundname:'옾카페',width: 800, height: 600} ,
    {backgroundname:'송파 스튜디오',width: 1070, height: 600} ,
    {backgroundname:'프랑스맨',width: 1081, height: 600} ,
    {backgroundname:'침공 어찌하여',width: 1065, height: 600} ,
    {backgroundname:'꿀잠맨',width: 799, height: 600} ,
    {backgroundname:'배도라지2',width: 857, height: 600} ,
    {backgroundname:'침최고민수',width: 800, height: 600} ,
    {backgroundname:'샌즈맨',width: 1075, height: 600} ,
    {backgroundname:'우원박 초대석',width: 861, height: 600} ,
    {backgroundname:'뉴진스 초대석',width: 1067, height: 600} ,
    {backgroundname:'임세모 초대석',width: 781, height: 600},
    {backgroundname:'원펀데이',width: 862, height: 600},
    {backgroundname:'침펄풍심',width: 1030, height: 600},
    {backgroundname:'스탠드업코미디',width: 856, height: 600},
    {backgroundname:'유니콘1',width: 1068, height: 600},
    {backgroundname:'유니콘2',width: 938, height: 600},
    {backgroundname:'소인배심사',width: 1067, height: 600},
    {backgroundname:'침곽빠',width: 1066, height: 600},
    {backgroundname:'침곽빠2',width: 1073, height: 600},
    {backgroundname:'어떤모습이',width: 1066, height: 600},
    {backgroundname:'침곽주',width: 1062, height: 600},
    {backgroundname:'침펄기',width: 600, height: 600},
    {backgroundname:'침펄기눕',width: 600, height: 600},
    {backgroundname:'시상식',width: 1073, height: 600},
    {backgroundname:'통천발냄새',width: 889, height: 600}
    ]

const MAXPRESET = presets.length;
let MAXBACKGROUND = backgroundinfo.length;
const initalMAXBACKGROUND = MAXBACKGROUND;

// 기본 제공 이미지 리스트
const imageList = {
    "교동하의":{ src: 'resource/교동하의.png', x: 587, y: 479, width: 152, height: 72, angle: 0, iwidth: 0, iheight: 0},
    "교동상의":{ src: 'resource/교동상의.png', x: 590, y: 329, width: 161, height: 109, angle: 0, iwidth: 0, iheight: 0},
    "교동헤어":{ src: 'resource/교동헤어.png', x: 537, y: 141, width: 220, height: 149, angle: 0, iwidth: 0, iheight: 0},
    "교동모자":{ src: 'resource/교동모자.png', x: -18, y: 33, width: 334, height: 285, angle: -65, iwidth: 0, iheight: 0},
    "교동문어":{ src: 'resource/교동문어.png', x: 94, y: 416, width: 0, height: 0, angle: 0, iwidth: 0, iheight: 0},
    "로고":{ src: 'resource/로고.png', x: 362, y: 33, width: 0, height: 0, angle: 0, iwidth: 0, iheight: 0},
    "테무신발":{ src: 'resource/테무신발.png', x: 81, y: 486, width: 0, height: 0, angle: 0, iwidth: 0, iheight: 0},
    "테무하의":{ src: 'resource/테무하의.png', x: 552, y: 392, width: 0, height: 0, angle: 0, iwidth: 0, iheight: 0},
    "테무상의":{ src: 'resource/테무상의.png', x: 73, y: 287, width: 0, height: 0, angle: 0, iwidth: 0, iheight: 0},
    "테무모자":{ src: 'resource/테무모자.png', x: 552, y: 190, width: 0, height: 0, angle: 0, iwidth: 0, iheight: 0},
    "테무안경":{ src: 'resource/테무안경.png', x: 59, y: 39, width: 0, height: 0, angle: 0, iwidth: 0, iheight: 0},
    "백상하의":{ src: 'resource/백상하의.png', x: 83, y: 421, width: 0, height: 0, angle: 0, iwidth: 0, iheight: 0},
    "백상상의":{ src: 'resource/백상상의.png', x: 556, y: 289, width: 0, height: 0, angle: 0, iwidth: 0, iheight: 0},
    "백상헤어":{ src: 'resource/백상헤어.png', x: 57, y: 75, width: 0, height: 0, angle: 0, iwidth: 0, iheight: 0},
    "고프모자":{ src: 'resource/고프모자.png', x: 64, y: 95, width: 0, height: 0, angle: 0, iwidth: 0, iheight: 0},
    "고프신발":{ src: 'resource/고프신발.png', x: 565, y: 498, width: 0, height: 0, angle: 0, iwidth: 0, iheight: 0},
    "고프하의":{ src: 'resource/고프하의.png', x: 79, y: 370, width: 0, height: 0, angle: 0, iwidth: 0, iheight: 0},
    "고프상의":{ src: 'resource/고프상의.png', x: 550, y: 267, width: 0, height: 0, angle: 0, iwidth: 0, iheight: 0},
    "국밥상의":{ src: 'resource/국밥상의.png', x: 68, y: 287, width: 0, height: 0, angle: 0, iwidth: 0, iheight: 0},
    "국밥하의":{ src: 'resource/국밥하의.png', x: 567, y: 437, width: 0, height: 0, angle: 0, iwidth: 0, iheight: 0},
    "국밥신발":{ src: 'resource/국밥신발.png', x: 87, y: 474, width: 0, height: 0, angle: 0, iwidth: 0, iheight: 0},
    "국밥아우터":{ src: 'resource/국밥아우터.png', x: 556, y: 229, width: 0, height: 0, angle: 0, iwidth: 0, iheight: 0},
    "국밥헤어":{ src: 'resource/국밥헤어.png', x: 53, y: 61, width: 0, height: 0, angle: 0, iwidth: 0, iheight: 0},
    "전당상의":{ src: 'resource/전당상의.png', x: 552, y: 218, width: 0, height: 0, angle: -12, iwidth: 0, iheight: 0},
    "전당하의":{ src: 'resource/전당하의.png', x: 568, y: 420, width: 0, height: 0, angle: 10, iwidth: 0, iheight: 0},
    "전당아우터":{ src: 'resource/전당아우터.png', x: 100, y: 354, width: 0, height: 0, angle: 0, iwidth: 0, iheight: 0},
    "전당메달":{ src: 'resource/전당메달.png', x: 335, y: 66, width: 0, height: 0, angle: 12, iwidth: 0, iheight: 0},
    "전당모자":{ src: 'resource/전당모자.png', x: 63, y: 89, width: 0, height: 0, angle: -17, iwidth: 0, iheight: 0},
    "떼무하의":{ src: 'resource/떼무하의.png', x: 613, y: 466, width: 0, height: 0, angle: -5, iwidth: 0, iheight: 0},
    "떼무상의1":{ src: 'resource/떼무상의1.png', x: 597, y: 170, width: 0, height: 0, angle: 11, iwidth: 0, iheight: 0},
    "떼무상의2":{ src: 'resource/떼무상의2.png', x: 524, y: 330, width: 0, height: 0, angle: -11, iwidth: 0, iheight: 0},
    "떼무헤어1":{ src: 'resource/떼무헤어1.png', x: 26, y: 34, width: 0, height: 0, angle: -24, iwidth: 0, iheight: 0},
    "떼무헤어2":{ src: 'resource/떼무헤어2.png', x: 26, y: 331, width: 0, height: 0, angle: 47, iwidth: 0, iheight: 0},
    "떼무로고":{ src: 'resource/떼무로고.png', x: 402, y: 44, width: 0, height: 0, angle: 0, iwidth: 0, iheight: 0},
    "마법상의":{ src: 'resource/마법상의.png', x: 561, y: 343, width: 0, height: 0, angle: 9, iwidth: 0, iheight: 0},
    "마법하의":{ src: 'resource/마법하의.png', x: 554, y: 480, width: 0, height: 0, angle: 0, iwidth: 0, iheight: 0},
    "마법헤어1":{ src: 'resource/마법헤어1.png', x: 48, y: 53, width: 0, height: 0, angle: 0, iwidth: 0, iheight: 0},
    "마법헤어2":{ src: 'resource/마법헤어2.png', x: 1, y: 278, width: 0, height: 0, angle: 89, iwidth: 0, iheight: 0},
    "마법헤어3":{ src: 'resource/마법헤어3.png', x: 535, y: 191, width: 0, height: 0, angle: 5, iwidth: 0, iheight: 0},
    "얼뚱상":{ src: 'resource/얼뚱상.png', x: 250, y: 0, width: 0, height: 0, angle: 0, iwidth: 0, iheight: 0},
    "침착맨":{ src: 'resource/침착맨.png', x: 250, y: 0, width: 0, height: 0, angle: 0, iwidth: 0, iheight: 0},
    "55도발":{ src: 'resource/55도발.png', x: 250, y: 0, width: 0, height: 0, angle: 0, iwidth: 0, iheight: 0},
    "깨무룩":{ src: 'resource/깨무룩.png', x: 250, y: 0, width: 0, height: 0, angle: 0, iwidth: 0, iheight: 0},
    "단지운":{ src: 'resource/단지운.png', x: 250, y: 0, width: 0, height: 0, angle: 0, iwidth: 0, iheight: 0},
    "레몬맨1":{ src: 'resource/레몬맨1.png', x: 250, y: 0, width: 0, height: 0, angle: 0, iwidth: 0, iheight: 0},
    "레몬맨2":{ src: 'resource/레몬맨2.png', x: 250, y: 0, width: 0, height: 0, angle: 0, iwidth: 0, iheight: 0},
    "레몬맨3":{ src: 'resource/레몬맨3.png', x: 250, y: 0, width: 0, height: 0, angle: 0, iwidth: 0, iheight: 0},
    "슬리퍼1":{ src: 'resource/슬리퍼1.png', x: 250, y: 0, width: 0, height: 0, angle: 0, iwidth: 0, iheight: 0},
    "슬리퍼2":{ src: 'resource/슬리퍼2.png', x: 250, y: 0, width: 0, height: 0, angle: 0, iwidth: 0, iheight: 0},
    "매직박1":{ src: 'resource/매직박1.png', x: 250, y: 0, width: 0, height: 0, angle: 0, iwidth: 0, iheight: 0},
    "매직박2":{ src: 'resource/매직박2.png', x: 250, y: 0, width: 0, height: 0, angle: 0, iwidth: 0, iheight: 0},
    "차돌짬뽕":{ src: 'resource/차돌짬뽕.png', x: 250, y: 0, width: 0, height: 0, angle: 0, iwidth: 0, iheight: 0},
    "차돌볶음짬뽕":{ src: 'resource/차돌볶음짬뽕.png', x: 250, y: 0, width: 0, height: 0, angle: 0, iwidth: 0, iheight: 0},
    "지식은우정을":{ src: 'resource/지식은우정을.png', x: 250, y: 0, width: 0, height: 0, angle: 0, iwidth: 0, iheight: 0},
    "철면":{ src: 'resource/철면.png', x: 250, y: 0, width: 0, height: 0, angle: 0, iwidth: 0, iheight: 0},
    "철면수심1":{ src: 'resource/철면수심1.png', x: 250, y: 0, width: 0, height: 0, angle: 0, iwidth: 0, iheight: 0},
    "철면수심2":{ src: 'resource/철면수심2.png', x: 250, y: 0, width: 0, height: 0, angle: 0, iwidth: 0, iheight: 0},
    "침케이스":{ src: 'resource/침케이스.png', x: 250, y: 0, width: 0, height: 0, angle: 0, iwidth: 0, iheight: 0},
    "펄케이스":{ src: 'resource/펄케이스.png', x: 250, y: 0, width: 0, height: 0, angle: 0, iwidth: 0, iheight: 0},
    "침투부":{ src: 'resource/침투부.png', x: 250, y: 0, width: 0, height: 0, angle: 0, iwidth: 0, iheight: 0},
    "침착맨":{ src: 'resource/침착맨.png', x: 289, y: 176, width: 0, height: 0, angle: 0, iwidth: 0, iheight: 0},
    "침착맨기사":{ src: 'resource/침착맨기사.png', x: 307, y: 176, width: 0, height: 0, angle: 0, iwidth: 0, iheight: 0},
    }

// 초기 프리셋 로드
function loadPreset(presetIndex) {
    const preset = presets[presetIndex - 1];
    images.background.src = `${preset.background}.jpg`;
    images.background.onload = () => draw();
    canvas.width = 800;
    canvas.height = 600;
    images.items = preset.items.map(item => {
        const img = new Image();
        img.src = item.src;
        return { img, x: item.x, y: item.y, width: item.width, height: item.height, angle: item.angle, isClickable:true, iwidth: item.iwidth, iheight: item.iheight};
    });
    images.items.forEach(item => {
        item.img.onload = () => {
            item.width = item.img.width/PNGCHANGERATE;
            item.height = item.img.height/PNGCHANGERATE;
            item.iwidth = item.img.width/PNGCHANGERATE;
            item.iheight = item.img.height/PNGCHANGERATE;
            draw();
        };
    });
}

function changePreset(presetIndex) {
    currentPreset = presetIndex;
    loadPreset(currentPreset);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(images.background, 0, 0, canvas.width, canvas.height);

    images.items.forEach(item => {
        ctx.save();
        ctx.translate(item.x + item.width / 2, item.y + item.height / 2);
        ctx.rotate(item.angle * Math.PI / 180);
        ctx.drawImage(item.img, -item.width / 2, -item.height / 2, item.width, item.height);
        ctx.restore();
    });
}

// 드래그 이벤트 핸들러
canvas.addEventListener('mousedown', function(e) {
    if (!interactable) return; // 상호작용 불가능 상태에서는 이벤트 처리하지 않음

    const mouseX = e.offsetX;
    const mouseY = e.offsetY;

    for (let i = images.items.length-1; i >= 0; i--) {
        if (isImageActive(mouseX, mouseY, images.items[i])) {
            draggingItem = images.items[i];
            offsetX = mouseX - draggingItem.x;
            offsetY = mouseY - draggingItem.y;
            break;
        }
    }
    displayImageInfo();
});

canvas.addEventListener('mousemove', function(e) {
    if (!interactable || !draggingItem) return; // 상호작용 불가능 상태거나 드래그 대상이 없으면 이벤트 처리하지 않음

    const mouseX = e.offsetX;
    const mouseY = e.offsetY;

    draggingItem.x = mouseX - offsetX;
    draggingItem.y = mouseY - offsetY;

    displayImageInfo()
    draw();
});

canvas.addEventListener('mouseup', function() {
    draggingItem = null;
});

// 이미지 클릭 가능 여부 확인 함수
function isImageActive(x, y, item) {
    return item.isClickable && x >= item.x && x <= item.x + item.width && y >= item.y && y <= item.y + item.height;
}

// 키보드 이벤트 핸들러
document.addEventListener('keydown', function(e) {

    if (e.key == 37 || e.key == 'ArrowRight') {
        nextBackground(); // 오른쪽키로 배경 바꾸기
    } else if (e.key == 39 || e.key == 'ArrowLeft') {
        prevBackground(); // 왼쪽키로 배경 바꾸기
    }
    
    if (!interactable || !draggingItem) return; // 상호작용 불가능 상태거나 드래그 대상이 없으면 이벤트 처리하지 않음

    if (e.key === 'q' || e.key === 'Q') {
        draggingItem.angle -= angleChangeValue; // Q키로 왼쪽 회전
    } else if (e.key === 'e' || e.key === 'E') {
        draggingItem.angle += angleChangeValue; // E키로 오른쪽 회전
    } else if (e.key === 't' || e.key === 'T') {
        // T키로 이미지 삭제
        const index = images.items.indexOf(draggingItem);
        if (index > -1) {
            images.items.splice(index, 1);
            draggingItem = null;
        }
    } else if ((e.key === 's' || e.key === 'S') && !(draggingItem.height<=9)) {
        draggingItem.height -= 5; // S키로 상하 줄이기
    } else if (e.key === 'w' || e.key === 'W') {
        draggingItem.height += 5; // W키로 상하 늘리기
    } else if ((e.key === 'a' || e.key === 'A') && !(draggingItem.width<=9))  {
        draggingItem.width -= 5; // A키로 좌우 줄이기
    } else if (e.key === 'd' || e.key === 'D') {
        draggingItem.width += 5; // D키로 좌우 늘리기
    } else if (e.key === 'f' || e.key === 'F') {
        makeUnclickable(draggingItem); // F키로 이미지 클릭 불가능 상태로 만들기
        draggingItem = null;
    } else if (e.key === 'v' || e.key === 'V') {
        cloneImageObject(draggingItem); // V키로 이미지 복제하기
    } else if (e.key === 'r' || e.key === 'R') {
        if(angleChangeValue>=15){angleChangeValue-=14} else{angleChangeValue+=1}
        displayImageInfo();
    }
    draw();
    displayImageInfo();
});

// 이미지 추가 함수 (텍스트 입력창에서)
function addImageFromText() {
    const searchTerm = document.getElementById('imageSearch').value.toLowerCase();
    const imageInfo = imageList[searchTerm];
    if (imageInfo) {
        const img = new Image();
        img.onload = function() {
            images.items.push({
                img: img,
                x: imageInfo.x,
                y: imageInfo.y,
                width: img.width/PNGCHANGERATE,
                height: img.height/PNGCHANGERATE,
                angle: imageInfo.angle,
                isClickable: true,
                iwidth: img.width/PNGCHANGERATE,
                iheight: img.height/PNGCHANGERATE
            });
            draw();
        };
        img.src = `${imageInfo.src}`;
    } else {
        alert('그런건 없잖슴~');
    }
}

// 이미지 추가 함수 (파일 업로드)
function addImageFromFile(file) {
    const reader = new FileReader();
    reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
            images.items.push({ img: img, x: 100, y: 100, width: img.width, height: img.height, angle: 0, isClickable: true, iwidth: img.width, iheight: img.height});

            // 이미지가 추가될 때마다 draw 함수 호출하여 화면에 반영
            draw();
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(file);
}
// 파일 업로드 input 요소에 change 이벤트 리스너 추가
const fileInput = document.getElementById('fileInput');
fileInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        addImageFromFile(file);
    }
});
// 배경 넣기 함수 (파일 업로드)
function addBackgroundFromFile(file) {
    const reader = new FileReader();
    reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
            MAXBACKGROUND+=1;
            currentBackground = MAXBACKGROUND;
            backgroundinfo.push({backgroundname: `사용자 배경 ${MAXBACKGROUND-initalMAXBACKGROUND}`, width: img.naturalWidth, height: img.naturalHeight})
            usersrc[MAXBACKGROUND-initalMAXBACKGROUND-1] = event.target.result;
            document.getElementById('nextBackground').innerText=`배경 변경 [${currentBackground}/${MAXBACKGROUND}] ${backgroundinfo[MAXBACKGROUND-1].backgroundname}`;
            loadBackground(MAXBACKGROUND);
        };
        img.src =event.target.result;
    };
    reader.readAsDataURL(file);
}
const BackgroundInput = document.getElementById('backgroundInput');
BackgroundInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        addBackgroundFromFile(file);
    }
});

// 다음 프리셋으로 변경
function nextPreset(){
    const nextPresetBtn = document.getElementById('nextPreset');
    if(currentPreset>=MAXPRESET){
        changePreset(1);
        nextPresetBtn.innerText=`프리셋 변경 [${currentPreset}/${MAXPRESET}] ${presets[currentPreset-1].backgroundname}`;
        return
    }
    changePreset(currentPreset+1);
    nextPresetBtn.innerText=`프리셋 변경 [${currentPreset}/${MAXPRESET}] ${presets[currentPreset-1].backgroundname}`;
}

//배경 변경
function nextBackground(){
    const nextBackgroundBtn = document.getElementById('nextBackground');
    if(currentBackground==MAXBACKGROUND){
        currentBackground=1;
    } else{
        currentBackground+=1
    }
    loadBackground(currentBackground);
    nextBackgroundBtn.innerText=`배경 변경 [${currentBackground}/${MAXBACKGROUND}] ${backgroundinfo[currentBackground-1].backgroundname}`;
}

function prevBackground(){
    const nextBackgroundBtn = document.getElementById('nextBackground');
    if(currentBackground<=1){
        currentBackground=MAXBACKGROUND;
    } else{
        currentBackground-=1
    }
    loadBackground(currentBackground);
    nextBackgroundBtn.innerText=`배경 변경 [${currentBackground}/${MAXBACKGROUND}] ${backgroundinfo[currentBackground-1].backgroundname}`;
}

function loadBackground(BackgroundNum){
    if(BackgroundNum>initalMAXBACKGROUND){
        images.background.src = usersrc[BackgroundNum-initalMAXBACKGROUND-1];
    } else {
        images.background.src = `resource/background${BackgroundNum}.png`
    }
    images.background.onload = () => draw();
    canvas.width = backgroundinfo[BackgroundNum-1].width
    canvas.height = backgroundinfo[BackgroundNum-1].height
}

function deleteAllItems(){
    images.items = [];
    draw();
}

// 이미지 객체 클릭 불가능으로 만드는 함수
function makeUnclickable(item) {
    item.isClickable = false;
}

// 이미지 객체 복제 함수
function cloneImageObject(original) {
    const newImage = {
        img: original.img,
        x: original.x,
        y: original.y,
        width: original.width,
        height: original.height,
        angle: original.angle,
        isClickable: true,
        iwidth: original.iwidth,
        iheight: original.iheight// 새로 복제된 이미지는 클릭 가능하도록 설정
    };
    images.items.push(newImage);
}

// 텍스트로 이미지 정보 표시 함수
function displayImageInfo() {
    const infoElement = document.getElementById('imageInfo');
    if (draggingItem && draggingItem.isClickable) {
        infoElement.innerHTML = `크기: ${draggingItem.width.toFixed(0)} x ${draggingItem.height.toFixed(0)} (원본${draggingItem.iwidth.toFixed(0)}x${draggingItem.iheight.toFixed(0)})
        [원본 대비 비율${(100*(draggingItem.width.toFixed(0)/draggingItem.iwidth.toFixed(0))).toFixed(0)}% x ${(100*(draggingItem.height.toFixed(0)/draggingItem.iheight.toFixed(0))).toFixed(0)}%]<br>`;
        infoElement.innerHTML += `회전 각도(${angleChangeValue}씩 변화): ${draggingItem.angle}˚<br>`;
        infoElement.innerHTML += `X: ${draggingItem.x}｜`;
        infoElement.innerHTML += `Y: ${draggingItem.y}<br>`;
    }
}

// 초기 프리셋 로드
loadPreset(currentPreset);


// Canvas 이미지를 다운로드하는 함수
function saveAsImage() {
    // Canvas를 이미지로 변환
    const dataURL = canvas.toDataURL('image/png');

    // 다운로드 링크 생성
    const a = document.createElement('a');
    a.href = dataURL;
    a.download = '빵애에요.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

//노래
document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('audio');
    const playPauseButton = document.getElementById('playPauseButton');
    const nextSongButton = document.getElementById('nextSongButton');
    const muteCheckbox = document.getElementById('muteCheckbox');

    const songs = ['시놉시스','필더펑크','스떼윗미','킬링벌스']
    let currentSongIndex = 0;

    // Load the first song
    audio.src = `resource/${songs[currentSongIndex]}.mp3`;

    // Play or pause the audio
    playPauseButton.addEventListener('click', function() {
        if (audio.paused) {
            audio.play().then(() => {
                playPauseButton.innerText = "음악 정지";
            }).catch((error) => {
                console.error("Audio play failed: ", error);
            });
        } else {
            audio.pause();
            playPauseButton.innerText = "음악 재생";
        }
    });

    // Change to the next song
    nextSongButton.addEventListener('click', function() {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        audio.src = `resource/${songs[currentSongIndex]}.mp3`;
        
        audio.play().then(() => {
            playPauseButton.innerText = "음악 정지";
            nextSongButton.innerText = `다음 음악[${currentSongIndex+1}/${songs.length}]`
        }).catch((error) => {
            console.error("Audio play failed: ", error);
        });
    });

    // Mute or unmute the audio
    muteCheckbox.addEventListener('change', function() {
        audio.muted = this.checked;
    });

    // Loop the audio when it ends
    audio.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play().catch((error) => {
            console.error("Audio replay failed: ", error);
        });
    });
});
audio.volume = 0.5;


//PNG크기 조정
const pngchangeBtn = document.getElementById('PNGCHANGER');
pngchangeBtn.addEventListener('change',function(){
    PNGCHANGERATE = 1/pngchangeBtn.value;
});

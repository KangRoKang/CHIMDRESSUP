const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let currentPreset = 1;
let currentBackground = 0;
let draggingItem = null;
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
        background: 'preset1',
        items:['침착맨','교동하의','교동상의','교동헤어','교동모자','교동문어','로고']
    },
    {
        backgroundname:'테무깡 침착맨',
        background: 'preset2',
        items: ['침착맨','테무신발','테무하의','테무상의','테무모자','테무안경']
    },
    {
        backgroundname:'백상예술대상 침착맨',
        background: 'preset3',
        items: ['침착맨','백상하의','백상상의','백상헤어']
    },
    {
        backgroundname:'고프코어룩 침착맨',
        background: 'preset4',
        items: ['침착맨','고프모자','고프신발','고프하의','고프상의']
    },
    {
        backgroundname:'국밥룩 침착맨',
        background: 'preset5',
        items: ['침착맨','국밥상의','국밥하의','국밥신발','국밥아우터','국밥헤어']
    },
    {
        backgroundname:'전당포 기사 침착맨',
        background: 'preset6',
        items: ['침착맨기사','전당상의','전당하의','전당아우터','전당메달','전당모자']
    },
    {
        backgroundname:'떼무깡 침착맨',
        background: 'preset7',
        items: ['침착맨','떼무하의','떼무상의1','떼무상의2','떼무헤어1','떼무헤어2','떼무로고']
    },
    {
        backgroundname:'마법소녀카와이즈큥도큥러블링바큥부큥 침착맨',
        background: 'preset8',
        items: ['침착맨','마법상의','마법하의','마법헤어1','마법헤어2','마법헤어3','로고2']
    }
];

let backgroundinfo = [
    ['배경1', 800, 600],
    ['배경2', 800, 600],
    ['배경3', 800, 600],
    ['배경4', 800, 600],
    ['배경5', 800, 600],
    ['배경6', 800, 600],
    ['노트북뒷면', 930, 600],
    ['배도라지1', 925, 600],
    ['강동구 스튜디오', 600, 600],
    ['옾카페', 800, 600],
    ['송파 스튜디오', 1070, 600],
    ['프랑스맨', 1081, 600],
    ['침공 어찌하여', 1065, 600],
    ['꿀잠맨', 799, 600],
    ['배도라지2', 857, 600],
    ['침최고민수', 800, 600],
    ['샌즈맨', 1075, 600],
    ['우원박 초대석', 861, 600],
    ['뉴진스 초대석', 1067, 600],
    ['임세모 초대석', 781, 600],
    ['원펀데이', 862, 600],
    ['침펄풍심', 1030, 600],
    ['스탠드업코미디', 856, 600],
    ['유니콘1', 1068, 600],
    ['유니콘2', 938, 600],
    ['소인배심사', 1067, 600],
    ['침곽빠', 1066, 600],
    ['침곽빠2', 1073, 600],
    ['어떤모습이', 1066, 600],
    ['침곽주', 1062, 600],
    ['침펄기', 600, 600],
    ['침펄기눕', 600, 600],
    ['시상식', 1073, 600],
    ['통천발냄새', 889, 600]
]

const MAXPRESET = presets.length;
let MAXBACKGROUND = backgroundinfo.length;
const initalMAXBACKGROUND = MAXBACKGROUND;

// 기본 제공 이미지 리스트
const imageList = {
    "교동하의":{x: 587, y: 479, width: 152, height: 72, angle: 0},
    "교동상의":{x: 590, y: 329, width: 161, height: 109, angle: 0},
    "교동헤어":{x: 537, y: 141, width: 220, height: 149, angle: 0},
    "교동모자":{x: -18, y: 33, width: 334, height: 285, angle: -65},
    "교동문어":{x: 94, y: 416, width: 0, height: 0, angle: 0},
    "로고":{x: 362, y: 33, width: 0, height: 0, angle: 0},
    "로고2":{x: 420, y: 48, width: 0, height: 0, angle: 0},
    "테무신발":{x: 81, y: 486, width: 0, height: 0, angle: 0},
    "테무하의":{x: 552, y: 392, width: 0, height: 0, angle: 0},
    "테무상의":{x: 73, y: 287, width: 0, height: 0, angle: 0},
    "테무모자":{x: 552, y: 190, width: 0, height: 0, angle: 0},
    "테무안경":{x: 59, y: 39, width: 0, height: 0, angle: 0},
    "백상하의":{x: 83, y: 421, width: 0, height: 0, angle: 0},
    "백상상의":{x: 556, y: 289, width: 0, height: 0, angle: 0},
    "백상헤어":{x: 57, y: 75, width: 0, height: 0, angle: 0},
    "고프모자":{x: 64, y: 95, width: 0, height: 0, angle: 0},
    "고프신발":{x: 565, y: 498, width: 0, height: 0, angle: 0},
    "고프하의":{x: 79, y: 370, width: 0, height: 0, angle: 0},
    "고프상의":{x: 550, y: 267, width: 0, height: 0, angle: 0},
    "국밥상의":{x: 68, y: 287, width: 0, height: 0, angle: 0},
    "국밥하의":{x: 567, y: 437, width: 0, height: 0, angle: 0},
    "국밥신발":{x: 87, y: 474, width: 0, height: 0, angle: 0},
    "국밥아우터":{x: 556, y: 229, width: 0, height: 0, angle: 0},
    "국밥헤어":{x: 53, y: 61, width: 0, height: 0, angle: 0},
    "전당상의":{x: 552, y: 218, width: 0, height: 0, angle: -12},
    "전당하의":{x: 568, y: 420, width: 0, height: 0, angle: 10},
    "전당아우터":{x: 100, y: 354, width: 0, height: 0, angle: 0},
    "전당메달":{x: 335, y: 66, width: 0, height: 0, angle: 12},
    "전당모자":{x: 63, y: 89, width: 0, height: 0, angle: -17},
    "떼무하의":{x: 613, y: 466, width: 0, height: 0, angle: -5},
    "떼무상의1":{x: 597, y: 170, width: 0, height: 0, angle: 11},
    "떼무상의2":{x: 524, y: 330, width: 0, height: 0, angle: -11},
    "떼무헤어1":{x: 26, y: 34, width: 0, height: 0, angle: -24},
    "떼무헤어2":{x: 26, y: 331, width: 0, height: 0, angle: 47},
    "떼무로고":{x: 402, y: 44, width: 0, height: 0, angle: 0},
    "마법상의":{x: 561, y: 343, width: 0, height: 0, angle: 9},
    "마법하의":{x: 554, y: 480, width: 0, height: 0, angle: 0},
    "마법헤어1":{x: 48, y: 53, width: 0, height: 0, angle: 0},
    "마법헤어2":{x: 1, y: 278, width: 0, height: 0, angle: 89},
    "마법헤어3":{x: 535, y: 191, width: 0, height: 0, angle: 5},
    "얼뚱상":{x: 250, y: 0, width: 0, height: 0, angle: 0},
    "침착맨":{x: 250, y: 0, width: 0, height: 0, angle: 0},
    "55도발":{x: 250, y: 0, width: 0, height: 0, angle: 0},
    "깨무룩":{x: 250, y: 0, width: 0, height: 0, angle: 0},
    "단지운":{x: 250, y: 0, width: 0, height: 0, angle: 0},
    "레몬맨1":{x: 250, y: 0, width: 0, height: 0, angle: 0},
    "레몬맨2":{x: 250, y: 0, width: 0, height: 0, angle: 0},
    "레몬맨3":{x: 250, y: 0, width: 0, height: 0, angle: 0},
    "슬리퍼1":{x: 250, y: 0, width: 0, height: 0, angle: 0},
    "슬리퍼2":{x: 250, y: 0, width: 0, height: 0, angle: 0},
    "매직박1":{x: 250, y: 0, width: 0, height: 0, angle: 0},
    "매직박2":{x: 250, y: 0, width: 0, height: 0, angle: 0},
    "차돌짬뽕":{x: 250, y: 0, width: 0, height: 0, angle: 0},
    "차돌볶음짬뽕":{x: 250, y: 0, width: 0, height: 0, angle: 0},
    "지식은우정을":{x: 250, y: 0, width: 0, height: 0, angle: 0},
    "철면":{x: 250, y: 0, width: 0, height: 0, angle: 0},
    "철면수심1":{x: 250, y: 0, width: 0, height: 0, angle: 0},
    "철면수심2":{x: 250, y: 0, width: 0, height: 0, angle: 0},
    "침케이스":{x: 250, y: 0, width: 0, height: 0, angle: 0},
    "펄케이스":{x: 250, y: 0, width: 0, height: 0, angle: 0},
    "침투부":{x: 250, y: 0, width: 0, height: 0, angle: 0},
    "침착맨":{x: 289, y: 176, width: 0, height: 0, angle: 0},
    "침착맨기사":{x: 307, y: 176, width: 0, height: 0, angle: 0},
    }

// 초기 프리셋 로드
function loadPreset(presetIndex) {
    const preset = presets[presetIndex - 1];
    images.background.src = `resource/${preset.background}.jpg`;
    images.background.onload = () => draw();
    preset.items.forEach(item =>{
        addImageFromText(item);
    });
    canvas.width=800;
    canvas.height=600;
}

function changePreset(presetIndex) {
    images.items = [];
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
    if (!draggingItem) return;

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
    
    if (!draggingItem) return; //드래그 대상이 없으면 이벤트 처리하지 않음

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
function addImageFromText(searchTerm) {
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
        img.src = `resource/${searchTerm}.png`;
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
            backgroundinfo.push([`사용자 배경 ${MAXBACKGROUND-initalMAXBACKGROUND}`,img.naturalWidth, img.naturalHeight])
            usersrc[MAXBACKGROUND-initalMAXBACKGROUND-1] = event.target.result;
            nextBackgroundTextSet();
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
function nextBackgroundTextSet(){
    document.getElementById('nextBackground').innerText=`배경 변경 [${currentBackground}/${MAXBACKGROUND}] ${backgroundinfo[currentBackground-1][0]}`;
}

function nextBackground(){
    if(currentBackground==MAXBACKGROUND){
        currentBackground=1;
    } else{
        currentBackground+=1
    }
    loadBackground(currentBackground);
    nextBackgroundTextSet();
}

function prevBackground(){
    if(currentBackground<=1){
        currentBackground=MAXBACKGROUND;
    } else{
        currentBackground-=1
    }
    loadBackground(currentBackground);
    nextBackgroundTextSet();
}

function loadBackground(BackgroundNum){
    if(BackgroundNum>initalMAXBACKGROUND){
        images.background.src = usersrc[BackgroundNum-initalMAXBACKGROUND-1];
    } else {
        images.background.src = `resource/background${BackgroundNum}.jpeg`
    }
    images.background.onload = () => draw();
    canvas.width = backgroundinfo[BackgroundNum-1][1];
    canvas.height = backgroundinfo[BackgroundNum-1][2];
}

//모든 아이템 지우기
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
        iheight: original.iheight
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
    audio.volume = 0.5;

    // Load the first song
    audio.src = `resource/${songs[currentSongIndex]}.mp3`;
    
    // Play or pause the audio
    playPauseButton.addEventListener('click', function() {
        if (audio.paused) {
            audio.play()
            playPauseButton.innerText = "음악 정지";
        } else {
            audio.pause();
            playPauseButton.innerText = "음악 재생";
        }
    });

    // Change to the next song
    nextSongButton.addEventListener('click', function() {
        currentSongIndex +=1;
        audio.src = `resource/${songs[currentSongIndex]}.mp3`;
        audio.play()
        playPauseButton.innerText = "음악 정지";
        nextSongButton.innerText = `다음 음악[${currentSongIndex+1}/${songs.length}]`
    });

    // Mute or unmute the audio
    muteCheckbox.addEventListener('change', function() {
        audio.muted = this.checked;
    });

    // Loop the audio when it ends
    audio.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play()
    });
});



//PNG크기 조정
const pngchangeBtn = document.getElementById('PNGCHANGER');
pngchangeBtn.addEventListener('change',function(){
    PNGCHANGERATE = 1/pngchangeBtn.value;
});

// 초기 프리셋, 배경 로드
let loadcount = 1;
console.log(1);
loadAllPreset = setInterval(function() {
    nextPreset();
    if(loadcount == presets.length-1){
        clearInterval(loadAllPreset);
        images.items = [];
        loadAllBackground();
    }
    loadcount+=1;
}, 250);

function loadAllBackground(){
    loadAllBackgrounds = setInterval(function() {
        nextBackground();
        if(currentBackground==backgroundinfo.length){
            nextPreset();
            document.getElementById('nextBackground').innerText=`배경 변경 [1/${MAXBACKGROUND}] ${backgroundinfo[0][0]}`;
            clearInterval(loadAllBackgrounds)
        }
    }, 500);
}

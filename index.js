const SongArray = [
    ["WeLostTheSea-AGallantGentleman-LiveatStudios301.mp3", "WeLostTheSea.artist.jfif", "WeLostTheSea.ab03.jpg",  "banner2.jpg","We Lost The Sea - A Gallant Gentleman - Live at Studios 301"],
    ["DesertsXuan-BingBu.mp3", "DesertsXuan.artist.jpg", "DesertsXuan.ab02.jpg", "banner3.jpg", "張懸 - 並不"],
    ["EnnoCheng-ThePath.mp3", "EnnoCheng.artist.png", "EnnoCheng.ep.jpg", "banner3.jpg", "鄭宜農 – 人生很難"],
    ["Senhuai-WaitingMan.mp3", "Senhuai.artist.jfif", "Senhuai-WaitingMan.jpg", "banner3.jpg", "詹森淮 - 他總是在那個路口"],
    ["NoPartyForCaoDong-Wayfarer.mp3", "NoPartyForCaoDong.artis.jpg", "NoPartyForCaoDong.abo1.jpg", "banner2.jpg", "草東沒有派對 - 山海"],
    ["NoPartyForCaoDong-Devotion.mp3", "NoPartyForCaoDong.artis.jpg", "NoPartyForCaoDong.Devotion.jpg", "banner1.jpg", "草東沒有派對 - 還願"],
    ["Vast&Hazy-IntheDark.mp3", "Vast&Hazy.artist.jpg", "Vast&Hazy.ep02.jpg", "banner1.jpg", "Vast & Hazy - 無差別傷害"],
    ["Vast&Hazy-Waves.mp3", "Vast&Hazy.artist.jpg", "Vast&Hazy.ep01.jpg", "banner3.jpg", "Vast & Hazy - 與浪之間"],
    ["Vast&Hazy-TheCityisEatingMeAlive.mp3", "Vast&Hazy.artist.jpg", "Vast&Hazy.ep01.jpg", "banner3.jpg", "Vast & Hazy - 食人夢"],
    ["Vast&Hazy-ImNotOK.mp3", "Vast&Hazy.artist.jpg", "Vast&Hazy.ab01.jpg", "banner3.jpg", "Vast & Hazy - 求救訊號"],
    ["Collage-tsòng hōo kui-lōo hué-hu iû-tsāi.mp3", "Collage.artist.jpg", "Collage.01.jpg", "banner1.jpg", "珂拉琪 - 葬予規路火烌猶在"],
    ["Collage - Bān-tshian Hue-luí Tsû-bió Pi-ai.mp3", "Collage.artist.jpg", "Collage.02.jpg", "banner1.jpg", "珂拉琪 - 萬千花蕊慈母悲哀"],
    ["Collage - tse kai-sí ê khu-tsip kah ài.mp3", "Collage.artist.jpg", "Collage.03.jpg", "banner1.jpg", "珂拉琪 - 這該死的拘執佮愛"]
]

const audio = document.querySelector('audio');
const canvas = document.querySelector('canvas');

const Music = document.getElementById('music');
const PlayInfo = document.getElementById('playInfo');
const Banner = document.getElementById("banner");
const AlbumImg = document.getElementById("albumImg");
const ArtistImg = document.getElementById("artistImg");
const PlayProgressBar = document.getElementById("playProgressBar")
const CurTime = document.getElementById("curTime")
const FullTime = document.getElementById("fullTime")

const CtxSwitch = document.getElementById('ctxSwitch');
const ListSwitch = document.getElementById('listSwitch');
const ContorlsPanel = document.getElementById('contorlsPanel');
const ListContorls = document.getElementById('listContorls');

const SongList = document.getElementById('songList')
const SongSelected = document.getElementById('songSelected');
const ToSongBook = document.getElementById('toSongBook')
const SongBook = document.getElementById('songBook');
const ReturnAndFresh = document.getElementById('returnAndFresh')
const RealSongList = document.getElementById('realSongList');

const CtxContorls = document.getElementById('ctxContorls');


const SongName = document.getElementById('songName')
const BtnPrev = document.getElementById("btnPrev");
const BtnPrevTime = document.getElementById("btnPrevTime");
const BtnPlay = document.getElementById("btnPlay");
const BtnStop = document.getElementById("btnStop");
const BtnNextTime = document.getElementById("btnNextTime");
const BtnNext = document.getElementById("btnNext");
const RandomSwitch = document.getElementById('randomSwitch');
const RepeatOneSwitch = document.getElementById('repeatOneSwitch');
const RepeatAllSwitch = document.getElementById('repeatAllSwitch');
const MusicVolume = document.getElementById("musicVolume");
const VolumeControl = document.getElementById("volumeControl");
const VolumeValue = document.getElementById("volumeValue");

var listArr = []
var listStr = ""
var realListArr = []
var realListStr = ""


//  init
function indexInit() {
    CreareSongBook()
    setVolumeToLeft(100)
    setImage(music)
    SongName.innerHTML = "Empty";
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Is Mobile?
function isMobile() {
    try { document.createEvent("TouchEvent"); return true; }
    catch (e) { return false; }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Play Time Bar
PlayProgressBar.addEventListener('input', function () {
    audio.currentTime = this.value;
    setTime()
})

function setTime() {
    let AudioCurTime, AudioFullTime

    audio.onloadedmetadata = function () {
        AudioCurTime = Math.floor(audio.currentTime)
        AudioFullTime = Math.floor(audio.duration)
        PlayProgressBar.max = AudioFullTime
        CurTime.innerHTML = numToTime(AudioCurTime)
        FullTime.innerHTML = numToTime(AudioFullTime)
    }

    setInterval(() => {
        AudioCurTime = Math.floor(audio.currentTime);
        setTimeShow(AudioCurTime);
        setTimeToLeft(AudioCurTime)
        PlayProgressBar.value = AudioCurTime;

        if (AudioCurTime === AudioFullTime) {
            (RandomSwitch.classList.contains("active")) ? SongRandom() : (RepeatOneSwitch.classList.contains("active")) ? RepeatOne() : (RepeatAllSwitch.classList.contains("active")) ? RepeatAll() : SongJump(1);
        }
    }, 100)
}

function setTimeToLeft(T) {
    let progressBG = (T / audio.duration * 100) + "%";
    PlayProgressBar.style.backgroundImage = "-webkit-linear-gradient(left, rgb(141, 43, 41), rgb(141, 43, 41) " + progressBG + ", rgb(66, 66, 66) 0,rgb(66, 66, 66))";
}

function setTimeShow(T) {
    CurTime.innerHTML = numToTime(T)
}

function numToTime(T) {
    let min = Math.floor(T / 60);
    let sec = T % 60;
    function addZero(num) {
        return num < 10 ? "0" + num : String(num)
    }
    return addZero(min) + ":" + addZero(sec);
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Set Song Name & Image
function setName(input) {
    Music.title = input.innerText;
    SongName.innerHTML = Music.title;
}

function setImage(input) {
    Banner.src = "src\\image\\" + input.dataset.bannerimgurl
    AlbumImg.src = "src\\music\\" + input.dataset.albumimgurl
    ArtistImg.src = "src\\music\\" + input.dataset.artistimgurl
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// ContorlsPanel Switch
ListSwitch.addEventListener('click', () => {
    let MmarginTop = listContorls.style.marginTop;

    if (MmarginTop === "-100vh") {
        listContorls.style.marginTop = "0px";
        listContorls.style.transition = "all .5s"
    } else {

        if (isMobile()) {
            PlayInfo.classList.toggle("notDesktop");
            ContorlsPanel.classList.toggle("visiable");
        } else {
            playInfo.classList.toggle("vw50");
            ContorlsPanel.classList.toggle("vw50");
        }
        listContorls.style.marginTop = "0px";
    }
})

CtxSwitch.addEventListener('click', () => {
    let MmarginTop = listContorls.style.marginTop;

    if (MmarginTop === "0px") {
        listContorls.style.marginTop = "-100vh";
        listContorls.style.transition = "all .5s"
    } else {
        if (isMobile()) {
            PlayInfo.classList.toggle("notDesktop");
            ContorlsPanel.classList.toggle("visiable");
        } else {
            playInfo.classList.toggle("vw50");
            ContorlsPanel.classList.toggle("vw50");
        }
        listContorls.style.marginTop = "-100vh";
    }
})
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Creare Song Book
function CreareSongBook() {
    let songbookStr = ""
    for (i = 0; i < SongArray.length; i++) {
        songbookStr += `<li id='${i}'><span>${SongArray[i][4]}</span><div onclick='addSong(this)'><img src='src/image/icons/icon-add.png'></img></div></li>`
    }
    SongBook.innerHTML = songbookStr
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Song Add & Remove
function addSong(element) {
    let idx = element.parentElement.id
    listArr.push(`<li onclick='selectSong(this)'><span>${SongArray[idx][4]}</span><div onclick='removeSong(this)'><img src='src/image/icons/icon-remove.png'></img></div></li>`)
    realListArr.push(`<option value='${SongArray[idx][0]}' data-artistimgurl='${SongArray[idx][1]}' data-albumimgurl='${SongArray[idx][2]}' data-bannerimgurl='${SongArray[idx][3]}'>${SongArray[idx][4]}</option>`)
    element.parentElement.classList.add("choose")
}

function removeSong(element) {
    window.event? window.event.cancelBubble = true : e.stopPropagation();

    let idx = Array.prototype.indexOf.call(SongSelected.children, element.parentElement);
    SongSelected.children[idx].remove()
    RealSongList.options[idx].remove()
    listArr.splice(idx, 1)
    realListArr.splice(idx, 1)
    arrToStr()
    if (realListArr.length === 0) {
        Stop()
        setImage(music)
        SongName.innerHTML = "Empty";
    }
}

function arrToStr() {
    listStr = listArr.join("")
    realListStr = realListArr.join("")

    if (listStr !== "") {
        SongSelected.innerHTML = listStr
    }
    else {
        SongSelected.innerHTML = "<h2>Empty</h2>"
        listIndex = 0
    }
    if (realListStr !== "") {
        RealSongList.innerHTML = realListStr
    }

    listStr = ""
    realListStr = "" 
}

ToSongBook.addEventListener('click', () => {
    SongList.style.transform = "rotateY(180deg)"
})
ReturnAndFresh.addEventListener('click', () => {
    arrToStr()
    SongList.style.transform = "rotateY(0deg)"
    for (i=0; i < SongArray.length; i++){
        SongBook.children[i].classList.remove("choose")
    }
})
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Song Select & Change
function selectSong(element) {
    let idx = Array.prototype.indexOf.call(SongSelected.children, element);
    SongChange(idx)
}

function SongChange(idx) {
    Music.src = "src\\music\\" + RealSongList.options[idx].value;
    RealSongList.options[idx].selected = true;
    btnPlay.innerHTML = `<img src="src/image/icons/pause.png" alt="">`
    audio.load();
    audio.play();
    setImage(RealSongList.options[idx]);
    setName(RealSongList.options[idx]);
    setTime();
    setTimeToLeft(0)
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Ctx Contorl Slider
const StereoPanControl = document.getElementById("stereoPanControl");
const StereoPanValue = document.getElementById("stereoPanValue");

StereoPanControl.oninput = function () {
    stereoPanner.pan.value = StereoPanControl.value;
    StereoPanValue.innerHTML = StereoPanControl.value;
}

const DelayGainControl = document.getElementById("delayGainControl");
const DelayGainValue = document.getElementById("delayGainValue");

DelayGainControl.oninput = function () {
    delayGain.gain.value = DelayGainControl.value;
    DelayGainValue.innerHTML = Math.round(DelayGainControl.value * 100);
}

const FilterControl = document.getElementById("filterControl");
const FilterValue = document.getElementById("filterValue");

FilterControl.oninput = function () {
    delayFilter.frequency.value = FilterControl.value;
    FilterValue.innerHTML = FilterControl.value;
}

const DelayControl = document.getElementById("delayControl");
const DelayValue = document.getElementById("delayValue");

DelayControl.oninput = function () {
    delayTime.delayTime.value = DelayControl.value;
    DelayValue.innerHTML = DelayControl.value;
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// play btns
function PlayPause() {
    if (realSongList.innerHTML !== "") {
        let idx = realSongList.selectedIndex
        if (audio.paused) {
            // btnPlay.innerHTML = "<i class=" + "material-icons" + ">pause</i>";
            btnPlay.innerHTML = `<img src="src/image/icons/pause.png" alt="">`
            audio.play();
            setTime()
        } else {
            // btnPlay.innerHTML = "<i class=" + "material-icons" + ">play_arrow</i>``
            btnPlay.innerHTML = `<img src="src/image/icons/play_arrow.png" alt="">`
            audio.pause();
        }
    }
}

function Stop() {
    // audio.pause();
    // audio.currentTime = "0";
    audio.load();
    btnPlay.innerHTML = `<img src="src/image/icons/play_arrow.png" alt="">`
    
}

function ChangeTime(s) {
    audio.currentTime += s
}

function SongJump(n) {

    if (RandomSwitch.classList.contains("active")) {
        SongRandom()
    } else {
        let indexChange = RealSongList.selectedIndex + n;

        if (indexChange === (RealSongList.length)) {
            SongChange(0)
        }
        if (indexChange === -1) {
            SongChange(RealSongList.length - 1)
        }
        SongChange(indexChange)
    }
    setTimeToLeft(T)
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// repeat btns
RandomSwitch.addEventListener('click', function () {
    this.classList.toggle('active')
    RepeatOneSwitch.classList.remove('active')
    RepeatAllSwitch.classList.remove('active')
})

function SongRandom() {
    let r = Math.round(Math.random() * RealSongList.length)
    SongChange(r)
    console.log(r)
}

RepeatOneSwitch.addEventListener('click', function () {
    this.classList.toggle('active')
    RandomSwitch.classList.remove('active')
    RepeatAllSwitch.classList.remove('active')
})

function RepeatOne() {
    audio.currentTime = 0;
    audio.play()
}

RepeatAllSwitch.addEventListener('click', function () {
    this.classList.toggle('active')
    RandomSwitch.classList.remove('active')
    RepeatOneSwitch.classList.remove('active')
})

function RepeatAll() {
    ((RealSongList.selectedIndex + 1) === RealSongList.length) ? SongChange(0) : SongJump(1)
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Volume Contorl
function VolumeSwitch() {
    // audio.muted = audio.muted == true ? false : true 
    audio.muted = !audio.muted;
    MusicVolume.textContent === "headphones" ? MusicVolume.innerHTML = "headset_off" : MusicVolume.innerHTML = "headphones";
    // MusicVolume.src === "src/image/icons/headphone.png" ? MusicVolume.src = "src/image/icons/no-headphones.png" : MusicVolume.src = "src/image/icons/headphone.png";
}

VolumeControl.oninput = function setVolume() {
    let Vol = this.value
    masterVolume.gain.value = Vol / 100;
    VolumeValue.innerHTML = Vol;
    setVolumeToLeft(Vol)
    masterVolume.gain.value === 0 ? MusicVolume.innerHTML = "headset_off" : MusicVolume.innerHTML = "headphones"
}

function setVolumeToLeft(Vol) {
    let volumBG = Vol + "%";
    VolumeControl.style.backgroundImage = "-webkit-linear-gradient(left, rgb(0, 0, 0), rgb(0, 0, 0) " + volumBG + ", rgb(188, 58, 56) 0,rgb(188, 58, 56))";
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


indexInit()
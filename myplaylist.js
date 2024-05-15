let backbtn = document.getElementById("back-btn");
let playbtn = document.getElementById('play-btn');
let nextbtn = document.getElementById('next-btn');
let song = document.getElementById('song');
let playicon = document.getElementById('play-icon');
let progressbar = document.getElementById('progressbar');
let songlist = document.getElementById('song-list');
let getSongName = document.querySelectorAll('p')

// let songStored=JSON.parse(localStorage.getItem("songData"));
let songcount=0;
let allsongs;

let songListUpdata=()=>{
    fetch("songData.json")
        .then(response => response.json())
        .then(allsongs => {
            console.log(allsongs);
            let songDatas = allsongs;

            localStorage.setItem("songDatas", JSON.stringify(songDatas));

            allsongs.forEach((e, index) => {
                console.log(e)
                let { song, path, artist } = e
                let songDatas = [song, path, artist, index]
                songlist.innerHTML += `
                    <div class="card mb-2 song-list-card" >
                        <div class="d-flex w-100 ps-3 align-items-center">
                            <div>
                                <img src="https://cdn.pixabay.com/photo/2023/06/10/18/09/ai-generated-8054611_640.jpg" alt="" width="40px" height="40px">
                            </div>
                            <div  class="mt-3 ms-3" onclick=PlaySong('${e.path}','${index}')> 
                                <p class="song-play" id="song${index}" > ${e.songname}</p>
                            </div>
                            <div class="dropdown ms-auto me-2">
                                <i class="bi bi-three-dots-vertical" data-bs-toggle="dropdown" aria-expanded="false"></i>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="#" onclick="songdelete(${index})">Delete</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
        `;
            });
        });
};

songListUpdata();

let songStored=JSON.parse(localStorage.getItem("songDatas"));


let startSong = () => {
    song.src = songStored[0].path;
    progressbar.max = song.duration;
};
startSong();

let songcard = document.querySelectorAll('.song-play');

// play btn function
playbtn.addEventListener('click', () => {
    progressbar.max = song.duration;
    progressbar.value = song.currentTime;
    playsong();
});

let playsong=()=> {
    if (playbtn.classList.contains('play')) {
        playicon.classList.replace('bi-play', 'bi-pause');
        playbtn.classList.replace('play', 'pause');
        song.play();
        setInterval(() => {
            progressbar.value = song.currentTime;
        }, 500);
    }
    else {
        playbtn.classList.replace('pause', 'play');
        playicon.classList.replace('bi-pause', 'bi-play');
        song.pause();
    }
};

progressbar.onchange = function () {
    song.currentTime = progressbar.value;
    if (progressbar.max == song.currentTime) {
        nextBtn();
    }
};

function songdelete(index) {
    let allsongs = JSON.parse(localStorage.getItem('songDatas'));
    allsongs.splice(index, 1);
    localStorage.setItem('songDatas', JSON.stringify(allsongs));
    songListUpdata();
}

let preSong = null;
let playStatus = false;
let currentSong = 0;
function PlaySong(path, index) {
    let audio = document.getElementById('song');
    audio.src = `asset/${path}`;

    currentSong = index;
    if (preSong == null) {
        console.log(playicon.getAttribute('class'));
        preSong = currentSong;
        document.getElementById(`song${preSong}`).style.color = 'red';
        playicon.classList.replace('bi-play', 'bi-pause');
        audio.play();
    }
    else if (preSong == currentSong) {
        document.getElementById(`song${preSong}`).style.color = 'red';
        if (playStatus == true) {
            playStatus = false;
            playicon.classList.replace('bi-pause', 'bi-play');
            audio.pause();
        }
        else {
            playicon.classList.replace('bi-play', 'bi-pause');
            audio.play();
            playStatus = true;
        }
    }
    else {
        document.getElementById(`song${preSong}`).style.color = 'black';
        preSong = currentSong;
        document.getElementById(`song${preSong}`).style.color = 'red';
        playicon.classList.replace('bi-play', 'bi-pause');
        audio.play();
        playStatus = true;
    }
    songData();
}

function nextBtn() {
    let nextSongIndex = parseInt(currentSong) + 1;
    if (nextSongIndex > allsongs.length - 1) {
        nextSongIndex = 0;
    }
    PlaySong(allsongs[nextSongIndex].path, nextSongIndex);
    songData();
}

function backBtn() {
    let preSongIndex = parseInt(currentSong) - 1;
    if (preSongIndex < 0) {
        preSongIndex = allsongs.length - 1;
    }
    PlaySong(allsongs[preSongIndex].path, preSongIndex);
    songData();
}

function songData() {
    let artistname = document.getElementById('artist');
    let songname = document.getElementById('songname');
    artistname.innerText = allsongs[currentSong].artist;
    songname.innerText = allsongs[currentSong].songname;
}

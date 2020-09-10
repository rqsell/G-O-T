//war in 3 parts
//From Jon's eyes


class Story {
    constructor(character, weapon) {
        this.character = character
        this.weapon = weapon
        this.scenes = [scene1, scene2, scene3]
        this.scene = null
        this.url = ""
        this.index = 0
        this.decisionmade = false
    }
    pickscene() {
        this.scene = this.scenes[this.index]
        this.url = this.scene.intro
        document.querySelector("#scenename").innerHTML = `<h2> ${this.scene.name}</h2>`
        this.changebutton()
        this.playvideo()
        this.index++
    }
    changebutton() {
        document.querySelector("#d1").innerText = `${this.scene.decision1}`
        document.querySelector("#d2").innerText = `${this.scene.decision2}`
    }
    changevideo(video) {
        // if (Math.random() > .5) {
        //     console.log("you will win")
        // } else {
        //     console.log("you lose!")
        // }
        // console.log(this.scene[outcome])
        this.url = this.scene[video]
        this.playvideo()
        this.decisionmade = true
    }




    playvideo() {
        var canvas = document.getElementById('canvas');
        var ctx = canvas.getContext('2d');
        var video = document.getElementById('video');
        video.src = this.url
        video.play()
        video.addEventListener('play', function () {
            var $this = this; //cache
            (function loop() {
                if (!$this.paused && !$this.ended) {
                    ctx.drawImage($this, 0, 0, $this.width, $this.height);
                    setTimeout(loop, 1000 / 30); // drawing at 30fps
                }
            })();
        }, 0);
    }
}


document.querySelector('#d1').onclick = function (e) {
    console.log(e.target.id)
    snowstory.changevideo("video1", "outcome1")
}
document.querySelector('#d2').onclick = function (e) {
    snowstory.changevideo("video2", "outcome2")
}
class Scene {
    constructor(name, intro, decision1, decision2, video1, video2, outcome1, outcome2) {
        this.name = name
        this.intro = intro
        this.decision1 = decision1
        this.decision2 = decision2
        this.video1 = video1
        this.video2 = video2
        this.outcome1 = outcome1
        this.outcome2 = outcome2
        // this.result = result
    }
}
let scene1 = new Scene("Armies Assemble", "https://res.cloudinary.com/dvo4cnunn/video/upload/v1599687153/scene_1__armies_assemble_aubjo7.mp4", "drogonattack", "flamingarrows", "https://res.cloudinary.com/dvo4cnunn/video/upload/v1599687350/scene_1-_drogon_attacks_lmfaea.mp4", "https://res.cloudinary.com/dvo4cnunn/video/upload/v1599687329/scene_1__shoot_arrows_ksmmjw.mp4", "this is the first outcome", "this is the second outcome")
let scene2 = new Scene("Viserion Attacks", "https://res.cloudinary.com/dvo4cnunn/video/upload/v1599687308/scene_2__viserion_attack_fti6ks.mp4", "dragonfight", "charge", "https://res.cloudinary.com/dvo4cnunn/video/upload/v1599687312/scene_2__dragon_fight_1_zvxcna.mp4", "https://res.cloudinary.com/dvo4cnunn/video/upload/v1599687347/Scene_2__official_Charge_kkvynu.mp4")
let scene3 = new Scene("Army is exhausted", "https://res.cloudinary.com/dvo4cnunn/video/upload/v1599687242/army_exhausted_jduw3t.mp4", "refuel", "charge", "https://res.cloudinary.com/dvo4cnunn/video/upload/v1599687242/drink_min0in.mp4", "https://res.cloudinary.com/dvo4cnunn/video/upload/v1599687245/grief_l7evpa.mp4")
let scene4 = new Scene("Mormont Dies", "https://res.cloudinary.com/dvo4cnunn/video/upload/v1599687253/mormont-dies_lyd8jd.mp4", "grieve", "rage", "https://res.cloudinary.com/dvo4cnunn/video/upload/v1599687245/grief_l7evpa.mp4", "https://res.cloudinary.com/dvo4cnunn/video/upload/v1599687246/dragonrage_akvr0h.mp4")
let scene5 = new Scene("Bran is in trouble!", "https://res.cloudinary.com/dvo4cnunn/video/upload/v1599687288/NK_to_Bran2_pqk2ty.mp4", "fight", "retreat", "https://res.cloudinary.com/dvo4cnunn/video/upload/v1599687242/drink_min0in.mp4", "https://res.cloudinary.com/dvo4cnunn/video/upload/v1599687245/grief_l7evpa.mp4")
let scene6 = new Scene("Final Fight", "https://res.cloudinary.com/dvo4cnunn/video/upload/v1599687252/Night_King_to_Bran_ppzffv.mp4", "Defeat Night King", "rage", "https://res.cloudinary.com/dvo4cnunn/video/upload/v1599687294/Arya_kills_NK_qapqip.mp4", "https://res.cloudinary.com/dvo4cnunn/video/upload/v1599687246/dragonrage_akvr0h.mp4")
let snowstory = new Story("Jon Snow", "Longclaw")
console.log(snowstory)
snowstory.pickscene() //pick first scene
document.querySelector("video").onended = function (e) {
    if (snowstory.decisionmade === true) {
        snowstory.pickscene()
        snowstory.decisionmade = false
    }
}
document.querySelector("video1").onended = function (e) {
    console.log("onended")
}
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
        this.outcome = ""
    }
    pickscene() {
        this.scene = this.scenes[this.index]
        this.url = this.scene.intro
        document.querySelector("#scenename").innerHTML = `<h2> ${this.scene.name}</h2>`
        this.changebutton()
        this.playvideo()
        this.index++
        document.querySelector("#buttonbox").classList.remove("show")
    }
    changebutton() {
        document.querySelector("#d1").innerText = `${this.scene.decision1}`
        document.querySelector("#d2").innerText = `${this.scene.decision2}`
    }
    changevideo(video, outcome) {
        console.log(video, outcome)
        console.log(this)
        this.outcome = this.scene[outcome]
        console.log(this.scene[outcome])
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

    showoutcome() {
        if (this.outcome.includes("GAME OVER")) {
            alert(this.outcome)
            window.location.reload()
        }
        document.querySelector("#outcome").innerHTML = `<div class="boom">${this.outcome}</div>`

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
let scene1 = new Scene("Armies Assemble", "https://res.cloudinary.com/dvo4cnunn/video/upload/v1599687153/scene_1__armies_assemble_aubjo7.mp4", "drogonattack", "flamingarrows", "https://res.cloudinary.com/dvo4cnunn/video/upload/v1599687350/scene_1-_drogon_attacks_lmfaea.mp4", "https://res.cloudinary.com/dvo4cnunn/video/upload/v1599687329/scene_1__shoot_arrows_ksmmjw.mp4", "Nice! You held them back for now!", "Congrats! You depleted their army by 10%!")
let scene2 = new Scene("Viserion Attacks", "https://res.cloudinary.com/dvo4cnunn/video/upload/v1599687308/scene_2__viserion_attack_fti6ks.mp4", "dragonfight", "charge", "https://res.cloudinary.com/dvo4cnunn/video/upload/v1599687312/scene_2__dragon_fight_1_zvxcna.mp4", "https://res.cloudinary.com/dvo4cnunn/video/upload/v1599687347/Scene_2__official_Charge_kkvynu.mp4", "RuhRoh! While you watch the dragons fight, White Walkers kill and gain 25% of your army!", "Great job! You killed 50 White Walker soldiers!")
let scene3 = new Scene("Army is exhausted", "https://res.cloudinary.com/dvo4cnunn/video/upload/v1599687242/army_exhausted_jduw3t.mp4", "refuel", "charge", "https://res.cloudinary.com/dvo4cnunn/video/upload/v1599687242/drink_min0in.mp4", "https://res.cloudinary.com/dvo4cnunn/video/upload/v1599687245/grief_l7evpa.mp4", "You drank and were merry! You have sufficiently rested and are now ready to fight!", "GAME OVER. Your army was exhausted and defeated! You have failed the North!")
let scene4 = new Scene("Mormont Dies", "https://res.cloudinary.com/dvo4cnunn/video/upload/v1599687253/mormont-dies_lyd8jd.mp4", "grieve", "rage", "https://res.cloudinary.com/dvo4cnunn/video/upload/v1599687245/grief_l7evpa.mp4", "https://res.cloudinary.com/dvo4cnunn/video/upload/v1599687246/dragonrage_akvr0h.mp4", "Daenerys is frozen with grief and does not retaliate. The army is struck with a vicious attack and depleted", "Daenerys and her dragons rage! They cut the White Walker army in half!")
let scene5 = new Scene("Bran is in trouble!", "https://res.cloudinary.com/dvo4cnunn/video/upload/v1599687288/NK_to_Bran2_pqk2ty.mp4", "fight", "retreat", "https://res.cloudinary.com/dvo4cnunn/video/upload/v1599687242/drink_min0in.mp4", "https://res.cloudinary.com/dvo4cnunn/video/upload/v1599687245/grief_l7evpa.mp4", "Theon redeems himself and hold off the Night King, sacrificing his own life to save Bran.", "GAME OVER. The Night King advances, killing Bran and ending the war.")
let scene6 = new Scene("Final Fight", "https://res.cloudinary.com/dvo4cnunn/video/upload/v1599687252/Night_King_to_Bran_ppzffv.mp4", "Defeat Night King", "rage", "https://res.cloudinary.com/dvo4cnunn/video/upload/v1599687294/Arya_kills_NK_qapqip.mp4", "https://res.cloudinary.com/dvo4cnunn/video/upload/v1599687246/dragonrage_akvr0h.mp4", "CONGRATS! You have won the war! Long live the King in the North! The Night King and his whitewalker army has been vanquished thank to you and warrior Arya Stark!", "GAME OVER. The war is lost. You surrender and join the Night King.")
let snowstory = new Story("Jon Snow", "Longclaw")
console.log(snowstory)
snowstory.pickscene() //pick first scene
document.querySelector("video").onended = function (e) {
    // console.log("video onended")
    if (snowstory.decisionmade === true) {
        snowstory.showoutcome()
        snowstory.pickscene()
        snowstory.decisionmade = false
    }
    else {
        document.querySelector("#buttonbox").classList.add("show")
    }
}



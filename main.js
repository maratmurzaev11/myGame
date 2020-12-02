// window.addEventListener ("keypress", function (e) {
//     if (e.keyCode !== 13) return;
//     alert("ENTER")
// });
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let count_heart = 0
let block_to_del
let cols = Math.floor(window.innerHeight/64)
let rows = Math.floor(window.innerWidth/64)
let player = document.querySelector(".player")
let blocks = document.querySelector(".blocks")
let step = 64
let map = [];
let nap = [];
let game = null;
let hearts = document.querySelector(".hearts")
let bricks = document.querySelector(".bricks")

class Player{
    constructor(x,y) {
        this.x=x
        this.y=y
        this.model = player
    }

    render(){
        this.model.style.left = this.x * step + "px";
        this.model.style.top = this.y * step + "px";
            }
}


class Game {
    constructor() {
        this.player = new Player(0,0)
        this.hearts = [];
        this.bricks = [];
        this.bindBtns()
        requestAnimationFrame(()=>this.loop())
        this.place_hearts_and_bricks()
    }

    place_hearts_and_bricks() {
        for (let el of new Array(10)) {
            let el = new DOMParser().parseFromString("<div class=\"heart\">\n" +
                "            <img src=\"img/heart.png\" alt=\"\">\n" +
                "        </div>", "text/html").body.querySelector(".heart")
            this.hearts.push(new Heart(getRandomInt(0, rows - 1), getRandomInt(0, cols - 1), el))
            hearts.appendChild(el)
        }
        for (let el of new Array(10)) {
            let el = new DOMParser().parseFromString("<div class=\"brick\">\n" +
                "            <img src=\"img/ground.png\" alt=\"\">\n" +
                "        </div>", "text/html").body.querySelector(".brick")
            let x = getRandomInt(0, rows - 1)
            let y = getRandomInt(0, cols - 1)
            while(x == 0 && y == 0) {
                 x = getRandomInt(0, rows - 1)
                 y = getRandomInt(0, cols - 1)
            }
            let br = new Brick(x, y, el)
            this.bricks.push(br)
            bricks.appendChild(el)
            br.render()

        }
    }

    bindBtns(){
        document.addEventListener("keydown",(ev)=>{

            switch (ev.key){
                case "ArrowLeft":
                    if(this.player.x == 0) {
                        break
                    }
                    this.player.x--
                    break

                case "ArrowRight":
                    if(this.player.x == rows - 1) {
                        break
                    }
                    this.player.x++
                    break

                case "ArrowUp":
                    if(this.player.y == 0) {
                        break
                    }
                    this.player.y--
                    break

                case "ArrowDown":
                    if(this.player.y == cols - 1) {
                        break
                    }
                    this.player.y++
                    break
                case "a":
                    if(this.player.x == 0) {
                        break
                    }
                    this.player.x--
                    break

                case "d":
                    if(this.player.x == rows - 1) {
                        break
                    }
                    this.player.x++
                    break

                case "w":
                    if(this.player.y == 0) {
                        break
                    }
                    this.player.y--
                    break

                case "s":
                    if(this.player.y == cols - 1) {
                        break
                    }
                    this.player.y++
                    break
            }

        })

    }

    loop(){

        this.player.render()
        let block_to_del = map[this.player.y][this.player.x]
        block_to_del["body"].style.background = "#d3d3d3"
        block_to_del["destroyed"]=true;

        this.hearts.forEach((el, id)=>{
            el.render()
                if (el.y == this.player.y && el.x == this.player.x && !el.deleted) {
                el.body.remove();
                el.deleted = true;
                count_heart++;
            }
        })
        this.bricks.forEach((el, id)=>{
            if (el.y< cols - 1) {
                        if(map[el.y+1][el.x]["destroyed"]==true) {
                            if (!el.isFalling) {
                                setTimeout(() => {
                                    el.y += 1;
                                    el.isFalling = false;
                                }, 1000)
                            }
                            el.isFalling = true;
                        }
                el.render()
            }
        })
        requestAnimationFrame(() => this.loop())
    }
}

class Heart {
  constructor(x, y, heart) {
      this.x = x;
      this.y = y;
      this.body = heart;
      this.deleted = false;
  }
  render() {

      if (! this.deleted) {
          this.body.style.left = this.x * step + "px";
          this.body.style.top = this.y * step + "px";
      }
  }
}

class Brick{
    constructor(x, y, brick) {
        this.x = x;
        this.y = y;
        this.body = brick;
        this.isFalling = false;

    }
    render() {
            this.body.style.left = this.x * step + "px";
            this.body.style.top = this.y * step + "px";
    }
}


let i = 0;
    setTimeout(() => {
        for(let key of new Array(cols)){
            let arr = []
            for (let key2 of new Array(rows)){
                i++;

                let el = new DOMParser().parseFromString("<div class='block'></div>","text/html").body.querySelector(".block")
                blocks.appendChild(el)
                arr.push({
                    body:el,
                    destroyed:false
                })
            }
            map.push(arr)
        }
        if (count_heart == 10) {
            alert(count_heart)
            count_heart = 0
        }
        game = new Game()
        hearts.style.height = blocks.clientHeight + "px";
        bricks.style.height = blocks.clientHeight + "px";

    },100)








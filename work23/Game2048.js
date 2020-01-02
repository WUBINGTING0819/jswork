import { basename } from "path";
import { promises } from "dns";

(function(window, document, $){
    function Game2048(opt){
        var prefix = opt.prefix, len = opt.len, size = opt.size, margin = opt.margin;
        var score = 0;
        var window = 2048;
        var isGameOver = true;
        var board = new board(len);
        var view = new view(prefix, len, size, margin);
        var user = opt.user
        var url = 'http://139.9.81.203:8090/gameRecord/g2048'
        view.init();
        board.onGenerate = function(e){
            view.addNum(e.x, e.y, e.mun);
        };
        board.onMove = function(e){
            if(e.to.num >= winNum){
                isGameOver = true;
                setTimeout(function(){view.win();}, 300);
            }
            if(e.to.num > e.from.num){
                score += e.to.num;
                view.updateScore(score);
            }
            view.move(e.from, e.to);
        };
        board.onMoveComplete = function(e){
            if(!board.canMove()){
                isGameOver = true;
                board.ranklist(url,user,score,view)
            }
            if(e.moved){
                setTimeout(function(){board.generate();}, 200);
            }
        };

        $(document).keydown(function(e){
            if(isGameOver) {
                return false;
            }
            switch (e.which){
                case 37:board.moveLeft();   break;
                case 38:board.moveUp();     break;
                case 39:board.moveRight();  break;
                case 40:board.moveDown();   break;
            }
        });
        function start(){
            score = 0;
            view.updateScore(0);
            view.cleanNum();
            board.init();
            board.generate();
            board.generate();
            isGameOver = false;
        }
        $('#' + prefix + '_restart').click(start);
        start();
    };
    function   Board(len){
        this.len = len;
        this.arr = [];
    }
    Board.prototype = {
        onGenerate: function() {},
        onMove: function() {},
        onMoveComplete: function() {},
        init: function(){
            for(var arr = [], x = 0, len = this.len; x <len; ++x){
                arr[x] = [];
                for(var y = 0; y < len; ++y){
                    arr[x][y] = 0;
                }
            }
            this.arr = arr;
        },
        generate: function(){
            var empty = [];
            for(var x = 0, arr = this.arr, len = arr.length; x < len; ++x){
                for(var y = 0; y < len; ++y){
                    if(arr[x][y] === 0){
                        empty.push({x: x, y: y});
                    }
                }
            }
            if(empty.length < 1){
                return false;
            }
            var pos = empty[Math.floor((Math.random() * empty.length))];
            this.arr[pos.x][pos.y] = Math.random() < 0.5 ? 2 : 4;
            this.onGenerate({x: pos.x, y: pos.y, num: this.arr[pos.x][pos.y]});
        },
        moveLeft:function(){
            var canMove = false;
            for(var x = 0, len = this.arr.length; x < len; ++x){
                for(var y = 0, arr = this.arr[x]; y < len; ++y){
                    for(var next = y + 1; next < len; ++next){
                        if(arr[next] === 0){
                            continue;
                        }
                        if(arr[y] === 0){
                            arr[y] = arr[next];
                            this.onMove({from: {x: x, y: next, num: arr[next]}, to:{x: x, y: y, num: arr[y]}});
                            arr[next] = 0;
                            canMove = true;
                            --y;
                        }else if(arr[y] === arr[next]) {
                            arr[y] += arr[next];
                            this.onMove({from: {x: x, y: next, num: arr[next]}, to:{x: x, y: y, num: arr[y]}})
                            arr[next] = 0;
                            canMove = true;
                        }
                        break;
                    }
                }
            }
            this.onMoveComplete({moved: canMove});
        },


        
    }
})
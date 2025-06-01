class Main {
    constructor(a, b){
        this.pomodoro = new Pomodoro(a, b)
    }
    startStudy(){
        this.pomodoro.startStudy()
        this.pomodoro.changePhase("Study")
    }
    startRest(){
        this.pomodoro.startRest()
        this.pomodoro.changePhase("Rest")
    }
    next(){
        this.pomodoro.nextPhase()
    }
}

class Pomodoro {
    constructor(study_time = 15, rest_time = 5) {
        this.study = study_time
        this.rest = rest_time
        this.phase = 0
    }
    ringBell(){
        document.querySelector('#bell').play()
    }
    // nextPhase(){
    //     this.phase ++
    //     this.changePhase(phases[this.phase])
    //     this.startRest()
    // }
    
    // static phases = ["Study", "Rest"]

    changeTime(text) {
        document.querySelector('div#time').innerHTML = text
    }
 
    changePhase(text) {
        document.querySelector('div#phase').innerHTML = text
    }

    insertButton(phase){
        if(phase === 'Study'){
            return `<button id="next" class="bg-green-900 rounded p-2 active:bg-blue-300 hover:cursor-pointer font-xl text-red-600 mt-1" type="button" onclick="new Main().startRest()"> Start Rest </button`

        }
        if(phase === 'Rest'){
            return `<button id="next" class="bg-green-900 rounded p-2 active:bg-blue-300 hover:cursor-pointer font-xl text-red-600 mt-1" type="button" onclick="new Main().startStudy()"> Start Study </button`
        }
        return ``
    }


    startRest(){
        this.timer(this.rest)
    }

    startStudy(){
        this.study
        this.timer(this.study)
    }

    stop = (id) => clearInterval(id)
    
    timer(t) {
        let min = parseInt(t) - 1
        let sec = 59
        let timer_id = setInterval(() => {
            let string = `${min}:${sec.toString().padStart(2, '0')}`
            this.changeTime(string)
            sec--
            if (min.valueOf() < 0) {
                const phase_txt = document.querySelector('div#phase').innerHTML
                this.ringBell()
                this.changePhase(this.insertButton(phase_txt))
                this.changeTime("Click above")
                this.stop(timer_id)
            }
            if (sec < 0) {
                min--
                sec = 59
            }
        }, 1000);
    }
}
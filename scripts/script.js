function getLastInstance(study, rest, reset){
    const instance = Pomodoro.instances[Pomodoro.instances.length-1]
    if(reset) return instance
    if(instance == undefined){
        Pomodoro.instances = []
        return new Pomodoro(study, rest).startStudy()
    }else{
        instance.changeTimers(study, rest)
        return instance.startStudy()
    }

}
class Pomodoro {
    static instances = []
    constructor(study_time = 15, rest_time = 5) {
        this.study = study_time
        this.rest = rest_time
        Pomodoro.instances = [this]
        this.interval = 0
        this.ms = parseInt(1000)
        this.ringing = false
    }

    actual_phase = 'Study'


    
    ringBell(){
        document.querySelector('#bell').play()
    }
    
    stopBell(){
        document.querySelector('#bell').pause()
    }

    changeTime(text) {
        document.querySelector('div#time').innerHTML = text
    }
 
    changePhase(text) {
        document.querySelector('div#phase').innerHTML = text
    }

    insertButton(phase){
        if(phase === 'Study'){
            // return `<button id="next" class="bg-green-900 rounded p-2 active:bg-blue-300 hover:cursor-pointer font-xl text-red-600 mt-1" type="button" onclick="new Main().startRest()"> Start Rest </button`
            return `<button id="next" class="bg-green-900 rounded p-2 active:bg-blue-300 hover:cursor-pointer font-xl text-red-600 mt-1" type="button" onclick="getLastInstance(0,0,true).startRest()"> Start Rest </button`

        }
        if(phase === 'Rest'){
             return `<button id="next" class="bg-green-900 rounded p-2 active:bg-blue-300 hover:cursor-pointer font-xl text-red-600 mt-1" type="button" onclick="getLastInstance(0,0,true).startStudy()"> Restart </button`
        }
        return ``
    }
    changeTimers(stud, res){
        this.study = parseInt(stud)
        this.rest = parseInt(res)
    }

    startRest(){
        this.actual_phase = 'Rest'
        this.changePhase(this.actual_phase)
        this.stopBell()
        this.timer(this.rest)

    }

    startStudy(){
        this.actual_phase = 'Study'
        this.changePhase(this.actual_phase)
        clearInterval(this.interval)
        this.stopBell()
        this.timer(this.study)
    }

    stop = (id) => clearInterval(id)
    
    timer_list = []

    timer(t) {
        let min = parseInt(t) - 1
        let sec = parseInt(59)
        this.changeTime(`${min}:${(sec).toString().padStart(2, '0')}`)
        let debug_html = document.getElementById('debugger')
        let debugg = parseInt(debug_html.value)
        let ms = this.ms
        if(debugg){
            ms = debugg
        }
       
        let timer_id = setInterval(() => {
            let string = `${min}:${sec.toString().padStart(2, '0')}`
            this.changeTime(string)
            sec--
            if (min.valueOf() < 0) {
                // const phase_txt = document.querySelector('div#phase').innerHTML
                this.ringBell()
                this.changePhase(this.insertButton(this.actual_phase))
                // console.log(phase_txt)
                this.changeTime("Click above")
                this.stop(timer_id)
            }
            if (sec < 0) {
                min--
                sec = 59
            }
            // console.log(`ms: ${ms}`)
            // change this to change speed in miliseconds
        }, ms);
        this.interval = timer_id
    }
}

function showDebugger(){
    const checkbox = document.querySelector(`#debug_show`).valueOf().checked
    let box = document.querySelector('div#debug_wrapper')
    if(checkbox){
        box.removeAttribute("hidden")
        return
    }else{
        box.setAttribute("hidden",'true')
    }
}
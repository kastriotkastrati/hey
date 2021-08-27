document.addEventListener('DOMContentLoaded', () => {

    let y_mode = false;
    let true_text = '';
    let last_letter = '';
    let fake_text = '';
    let base_plea = '';
    let q_form = document.getElementById('question_form');
    let plea = document.getElementById('plea');
    let the_answer = document.getElementById('the_answer');
    let the_reset = document.getElementById('reset');
    let plea_text = "Hello, please answer to the question I'm about to ask below";
    let question = document.getElementById('question');
    let ask = document.getElementById('ask');
    let refreshBtn = document.getElementById('refreshBtn');


    let whoareyou = [
        'Why are you trying this?'
    ]

    let typewriter = new Typewriter(the_answer, {
        delay: 100,
        loop: false
    });


    let submitEvent = (event) => {
        event.preventDefault();

        true_text.length > 0 ? (typewriter.typeString(true_text).start()) : (typewriter.typeString(whoareyou[0]).start());
        the_reset.click();
    }


    q_form.addEventListener('submit', submitEvent)

    plea.addEventListener('input', (event) => {
        if (event.data == '.') {
            y_mode = !y_mode;
            fake_text = '';
            base_plea = plea.value.substring(0, plea.value.length - 1);
        }

        if (y_mode) {
            last_letter = plea_text[plea.value.length - 1];
            fake_text += last_letter;
            plea.value = base_plea + fake_text;

            event.data !== '.' && (true_text += event.data);
            console.log(true_text);
        }
        if (!y_mode) {
            if (event.data == '.') {
                plea.value = plea.value.substring(0, plea.value.length - 1);
            }
        }

        if (true_text.substring(true_text.length - 3) == '---' || plea.value.substring(plea.value.length - 3) == '---' || ask.value.substring(plea.value.length - 3) == '---') {
            console.log('yeah');
            the_reset.click();
            fake_text = '';
            true_text = '';
            plea.value = '';
            the_reset.click();
        }

    });


    refreshBtn.addEventListener('click', () => {
        console.log('yeah');
        y_mode = false;
        true_text = '';
        last_er = '';
        fake_text = '';
        base_plea = '';
        plea.value = '';
        typewriter.deleteAll().start();
        the_reset.click();
    });

    question.addEventListener('input', (e)=> {
        if(e.data == '?'){
            ask.click();
        }
    });


    // handle Music 
    document.addEventListener('click', musicPlay);
    function musicPlay() {
        let music = document.getElementById('music');
        music.play();
        music.volume = 0.1;
        document.removeEventListener('click', musicPlay);
    }

    let video = document.getElementsByClassName('video')[0];
    video.currentTime = Math.floor(Math.random() * 2300);


    //macro 

    document.addEventListener('keydown', (e)=>{
        if(e.shiftKey && e.key == 'Z'){
            e.preventDefault();
            refreshBtn.click();
        }
    })
})
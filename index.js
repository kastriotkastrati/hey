document.addEventListener('DOMContentLoaded', () => {

    let y_mode = false;
    let true_text = '';
    let last_letter = '';
    let fake_text = '';
    let base_plea = '';

    const faker = {
        y_mode: false,
        base_plea: '',
        true_text: '',
        fake_text: '',
        last_letter: ''
    }




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
        if (faker.true_text.length === 0) return;
        if (faker.fake_text.length < 3) {
            typewriter.typeString(whoareyou[0]).start();
            return;
        }

        typewriter.typeString(true_text).start()
    }


    q_form.addEventListener('submit', submitEvent);

    plea.addEventListener('input', (event) => {
        if (event.data == '.') {
            faker.y_mode = !faker.y_mode;
            faker.fake_text = '';
            faker.base_plea = plea.value.substring(0, plea.value.length - 1);
        }

        if (faker.y_mode) {
            faker.last_letter = plea_text[plea.value.length - 1];
            faker.fake_text += faker.last_letter;
            plea.value = base_plea + faker.fake_text;

            event.data !== '.' && (true_text += event.data);
        }
        if (!faker.y_mode) {
            if (event.data == '.') {
                plea.value = plea.value.substring(0, plea.value.length - 1);
            }
        }

        if (true_text.substring(true_text.length - 3) == '---' || plea.value.substring(plea.value.length - 3) == '---' || ask.value.substring(plea.value.length - 3) == '---') {
            the_reset.click();
            faker.fake_text = '';
            faker.true_text = '';
            plea.value = '';
            the_reset.click();
        }

        console.log('y_mode: ', faker.y_mode);
        console.log('true_text: ', faker.true_text);
        console.log('last_letter: ', faker.last_letter);
        console.log('fake_text: ', faker.fake_text);
        console.log('base_plea: ', faker.base_plea);

    });


    refreshBtn.addEventListener('click', () => {
        faker.y_mode = false;
        faker.true_text = '';
        faker.last_letter = '';
        faker.fake_text = '';
        faker.base_plea = '';
        plea.value = '';
        typewriter.deleteAll().start();
        the_reset.click();
    });

    question.addEventListener('input', (e) => {
        if (e.data == '?') {
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

    document.addEventListener('keydown', (e) => {
        if (e.shiftKey && e.key == 'Z') {
            e.preventDefault();
            refreshBtn.click();
        }
    })
})

const logOut = () => {
    if (window.confirm('Do you want to Log Out ?')) {
        window.location.href = '/logOut';
    };
}
let questions;
let reviews;
let purchases;
let contactMessages;

document.addEventListener('DOMContentLoaded', function () {

    const fetchIntegerData = () => {
        $.ajax({
            url: '/admin/data',
            method: 'GET',
            success: (data) => {
                questions = data.questions;
                reviews = data.reviews;
                purchases = data.purchases;
                contactMessages = data.messages;

                console.log('Questions :', questions);
                console.log('Reviews :', reviews);
                console.log('Purchases :', purchases);
                console.log('Contact Messages :', contactMessages);


                const showPopupQuestion = () => {
                    const popup = document.querySelector('.questionMessage');
                    let message = document.getElementById('question');
                    message.innerHTML = `You have new ${questions} Questions!`
                    const timerBar = popup.querySelector('.question-timer');
            
                    popup.style.display = 'block';
                    timerBar.style.width = '100%';
            
                    let percentage = 100;
            
                    let interval = setInterval(() => {
                        timerBar.style.width = `${percentage--}%`;
                        if (percentage == 0) {
                            clearInterval(interval);
                            popup.style.display = 'none';
                        }
                    }, 60);
            
                };
                const showPopupReview = () => {
                    const popup = document.querySelector('.reviewMessage');
                    let message = document.getElementById('review');
                    message.innerHTML = `New ${reviews} reviews are arrived!`
                    const timerBar = popup.querySelector('.review-timer');
            
                    popup.style.display = 'block';
                    // popup.style.top = '40px';
                    timerBar.style.width = '100%';
            
                    let percentage = 100;
            
                    let interval = setInterval(() => {
                        timerBar.style.width = `${percentage--}%`;
                        if (percentage == 0) {
                            clearInterval(interval);
                            popup.style.display = 'none';
                        }
                    }, 60);
            
                };
                const showPopupPurchases = () => {
                    const popup = document.querySelector('.purchasesMessage');
                    let message = document.getElementById('purchases');
                    message.innerHTML = `Users purchases ${purchases} new products!`
                    const timerBar = popup.querySelector('.purchases-timer');
            
                    popup.style.display = 'block';
                    // popup.style.top = '60px';
                    timerBar.style.width = '100%';
            
                    let percentage = 100;
            
                    let interval = setInterval(() => {
                        timerBar.style.width = `${percentage--}%`;
                        if (percentage == 0) {
                            clearInterval(interval);
                            popup.style.display = 'none';
                        }
                    }, 60);
            
                };
                const showPopupContactMessage = () => {
                    const popup = document.querySelector('.contactMessage');
                    let message = document.getElementById('contact');
                    message.innerHTML = `${contactMessages} Users want to contact with Us!`
                    const timerBar = popup.querySelector('.contact-timer');
            
                    popup.style.display = 'block';
                    // popup.style.top = '80px';
                    timerBar.style.width = '100%';
            
                    let percentage = 100;
            
            
                    let interval = setInterval(() => {
                        timerBar.style.width = `${percentage--}%`;
                        if (percentage == 0) {
                            clearInterval(interval);
                            popup.style.display = 'none';
                        }
                    }, 60);
            
                };
            
            
                if (questions !== 0) {
                    setTimeout(showPopupQuestion, 0);
            
                }
            
                if (reviews !== 0) {
                    setTimeout(showPopupReview, 1000);
            
                }
                if (purchases !== 0) {
                    setTimeout(showPopupPurchases, 2000);
            
                }
                if (contactMessages !== 0) {
                    setTimeout(showPopupContactMessage, 3000);
            
                }


    

                // Use the integer data as needed
            },
            error: (error) => {
                console.error('Error fetching integer data:', error);
            }
        });
    };


    

    fetchIntegerData();
});

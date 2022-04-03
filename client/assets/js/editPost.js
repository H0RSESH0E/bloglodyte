async function editButtonHandler(event) {
    event.preventDefault();
    console.log('-----', event);

    
    // const response = await fetch(`/api/posts`, {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     title,
    //     post_body,
    //   }),
    //   headers: { 
    //     'Content-Type': 'application/json'
    //   }
    // });
  
    // if (response.ok) {
    //   document.location.replace('/dashboard');
    // } else {
    //   alert(response.statusText);
    // }
  }
  console.log('EDIT POST --- editPost.js');
  document.querySelector('.post-list').addEventListener('submit', editButtonHandler);
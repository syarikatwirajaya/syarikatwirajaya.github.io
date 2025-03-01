function php_email_form_submit(thisForm, action, formData) {
  fetch(action, {
    method: 'POST',
    body: formData,
    headers: {'X-Requested-With': 'XMLHttpRequest'}
  })
  .then(response => {
    if (response.ok) {
      return response.text();  // Ambil respon sebagai teks
    } else {
      throw new Error(`${response.status} ${response.statusText} ${response.url}`); 
    }
  })
  .then(data => {
    thisForm.querySelector('.loading').classList.remove('d-block');

    // Cuba parse data sebagai JSON
    try {
      var jsonData = JSON.parse(data);
      if (jsonData.ok) {
        thisForm.querySelector('.sent-message').classList.add('d-block');
        thisForm.reset(); 
      } else {
        throw new Error(data ? data : 'Form submission failed and no error message returned from: ' + action);
      }
    } catch (error) {
      // Jika parse JSON gagal, fallback kepada perbandingan teks
      if (data.trim() == 'OK') {
        thisForm.querySelector('.sent-message').classList.add('d-block');
        thisForm.reset();
      } else {
        throw new Error(data ? data : 'Form submission failed and no error message returned from: ' + action);
      }
    }
  })
  .catch((error) => {
    displayError(thisForm, error);
  });
}

function search() {
  let form = document.getElementById("search");

  for(let i = 0; i < form.length; i++) {
    console.log(form[i].name + ": " + form[i].checked);
  }
}

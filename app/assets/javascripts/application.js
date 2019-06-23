// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

document.addEventListener('DOMContentLoaded', () => {
    document.getElementsByClassName('new_product')[0].addEventListener('submit', (e) => {
        e.preventDefault();
        console.log(document.getElementsByName("authenticity_token").length)
        console.log("Comment out line 26 that gets the authenticity_token for tests")
        fetch("/products", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    authenticity_token: document.getElementsByName("authenticity_token")[0].value,
                    product: {
                        name: $('#product_name')[0].value,
                        price: $('#product_price')[0].value,
                        description: $('#product_description')[0].value,
                        inventory: $('#product_inventory')[0].value
                    }
                })
            })
            .then(resp => resp.json())
            .then(product => fetch(`/products/${product.id}`))
            .then(resp => resp.text())
            .then(page => {
                document.open();
                document.write(page);
                document.close();
            })

    })
});
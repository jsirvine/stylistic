$(document).ready(function() {
    initializePage();
});

function initializePage() {

	$(".import-form").hide();
	$("#edit-import-item").click(function(){
		$("html, body").animate({ scrollTop: 0 }, 500);
		$(".import-form").slideDown(200);
	})

	var imageLoader = document.getElementById('imageLoader');
    imageLoader.addEventListener('change', handleImage, false);

	function handleImage(e){
		var reader = new FileReader();
		reader.onload = function(event) {
			var img = new Image();
			img.src = event.target.result;
			img.onload = function() {
            	$("#thisImage").attr("src", img.src);
			}
		}
		reader.readAsDataURL(e.target.files[0]);  
	}

	$("#form-close").click(function(){
		$(".import-form").slideUp(200);
		document.getElementById("import-form").reset();
		$("#thisImage").attr("src", "/images/icons/import.png")
	})

	$(".dropdown").hide();
    $(".remove-item").click(function(event) {
        var itemID = event.target.id;
        console.log("This is the item ID: " + itemID);
        $(".dropdown").toggle();
    });

	$(function(){
		$(".save-box :submit").click(function(e){
			$("textarea").each(function() {
				if($(this).val() === ""){
					alert("Please enter a title and related tags.");
					e.preventDefault();
				}
			});
		});
	});
}
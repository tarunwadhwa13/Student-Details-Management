$(document).ready(function() {

    t = $('#student').DataTable({
        paging:false
    });
        // Hide the entry counter "Showing 5 of 5 entries"
        $('#student_info').addClass('hidden');


    // add new Row

        $(document).on( 'click','#addRow', function () {
               counter = $('#student tr').length-1;
                
                temp = '<div class="slider"><ul><li><i class="edit fa fa-pencil" aria-hidden="true" data-toggle="tooltip" title="Edit"></i></li>\
                    <li><i class="fa fa-trash confirm" aria-hidden="true" data-toggle="tooltip" title="Delete" data-confirm-button="Yes I am" data-cancel-button="Whoops no"></i></li>\
                    <li><i class="fa fa-check" aria-hidden="true" data-toggle="tooltip" title="Select"></i></li>\
                </ul>\
            </div>'
            
            var rollno = $('#rollno').val();
            var name = $('#name').val();
            var marks = $('#marks').val();
            var to_add = '<tr class="left-right"><td>'+ rollno + '</td><td>\
            ' + name + '</td><td>' + marks + '</td><td>' + temp + '</tr>'

            $('#student').find('tbody').append(to_add);
            $("#add_only").addClass('hidden');
            counter++;
            $('[data-toggle="tooltip"]').tooltip();

             
        });
    // Tooltip    
    $('[data-toggle="tooltip"]').tooltip(); 

    // Search box 
     updateBox();

    // Welcome Screen to main screen
    $('.welcome-screen button').on('click', function() {
        var name = $('#name-input').val();
        if (name.length > 2) {
            var message = "Welcome, " + name;
            $('.main .user-name').text(message);
            $('.welcome-screen').addClass('hidden');
            $('.main').removeClass('hidden');
        } else {
            $('#name-input').addClass('error');
        }

    });

    // Show entry inputs

    $(document).on( 'click','#add_entry', function() {
        if($(this).prop('value')=="Add New Entry"){
         var row = $('tr:last');
         $("#add_only").insertAfter(row);
        $('#add_only').removeClass('hidden');
        }
        else{
            multiple_delete();
        }
    });    

    // Edit Details
    $(document).on('click','i.edit',function () {
        var currentTD = $(this).parents('tr').find('td');
        if ($(this).prop('class') == 'edit fa fa-pencil') {
            $(this).removeClass('fa-pencil');
            $(this).addClass('fa-floppy-o');                  
            $.each(currentTD, function () {
                $(this).prop('contenteditable', true)
                
            });
        } else {
            $(this).removeClass('fa-floppy-o');
            $(this).addClass('fa-pencil');
           $.each(currentTD, function () {
                $(this).prop('contenteditable', false);   
            });   
        }
        
    });

    // select rows
    $(document).on('click','i.fa-check',function(){
        console.log($(this).prop('class'));
    if($(this).prop('class') == 'fa fa-check'){
        $(this).parents('tr').css('background-color','grey');
        $(this).removeClass('fa fa-check');
        $(this).addClass('fa fa-times');
        $(this).parents('tr').addClass('selected');

    }
    if($('.selected').length>0){
        $('#add_entry').prop('value','Delete Entries');
    }
    else{
        $('#add_entry').prop('value','Add New Entry');
    }
    
});

    $(document).on('click','i.fa-times',function(){
            console.log($(this).prop('class'));
            if($(this).prop('class') == 'fa fa-times'){
                $(this).parents('tr').css('background-color','white');
                $(this).removeClass('fa fa-times');
                $(this).addClass('fa fa-check');
                $(this).parents('tr').removeClass('selected');
            }
        
        
        if($('.selected').length>0){
            $('#add_entry').prop('value','Delete Entries');
        }
        else{
            $('#add_entry').prop('value','Add New Entry');
        }
        
});
    

   

    // multiple delete
    function multiple_delete(){
        $('.selected').remove();
        $('#add_entry').prop('value','Add New Entry');
    }


    // delete Entries
    
    $('.fa-trash').confirm({
        element:this,
        text: "Are you sure you want to delete that Entry?",
        title: "Confirmation required",
        confirm: function(element) {
            row_index = $(element).parents('tr').index()+1;
            console.log(row_index);
            document.getElementById("student").deleteRow(row_index);
        },
        cancel: function(button) {
            // nothing to do
        },
        confirmButton: "Yes I am",
        cancelButton: "No",
        post: true,
        confirmButtonClass: "btn-danger",
        cancelButtonClass: "btn-default",
        dialogClass: "modal-dialog modal-lg" // Bootstrap classes for large modal
    });
        


});
// update search box view
function updateBox(){
    text = document.getElementById("student_filter").firstChild.firstChild;
    document.getElementById("student_filter").firstChild.removeChild(text);
    newNode = document.createElement("i")
    newNode.setAttribute("class","fa fa-search")
    document.getElementById("student_filter").firstChild.appendChild(newNode)
}




$(document).ready(function () {
    $('#form').validate({
        rules: {
            corporateName: {
                required: true,
                minlength: 3
            },
            industry: {
                required: true,
                selectcheck: true
            },
            membership: {
                required: true,
                selectcheck: true
            },
            firstName: {
                required: true,
                minlength: 3
            },
            lastName: {
                required: true,
                minlength: 3
            },
            email: {
                required: true,
                email: true
            },
            sex: {
                required: true,
                selectcheck: true
            },
            age: {
                required: true,
                agecheck: true // Custom method for age validation
            },
            residentialArea: {
                required: true,
            },
            mainIdustry: {
                required: true,
                selectcheck: true
            },
            corporateMemberAffiliation: {
                required: true
            },
            sex: {
                required: true,
                selectcheck: true
            },
            mainIndustry: {
                required: true,
                selectcheck: true
            }
        },
        // PESAN ERROR
        messages: {
            corporateName: {
                required: 'nama harus diisi!',
                minlength: 'minimal 3 karakter!'
            },
            industry: 'please select an industry!',
            membership: 'please select a membership type!',
            firstName: {
                required: 'nama harus diisi!',
                minlength: 'minimal 3 karakter!'
            },
            lastName: {
                required: 'nama harus diisi!',
                minlength: 'minimal 3 karakter!'
            },
            email: {
                required: 'email harus diisi!',
                email: 'email tidak valid!'
            },
            age: {
                required: "please enter your age!",
            },
            residentialArea: {
                required: "area of residence is required!"
            },
            corporateMemberAffiliation: {
                required: "corporate member affiliation required!"
            }
        },
    });

    //METHOD MESSAGE ERROR VALIDATION
    $.validator.addMethod("selectcheck", function (value, element) {
        return value != "industry" && value != "membership" && value != "sex" && value != "mainIndustry";
    }, "Please select an option");
    $.validator.addMethod("agecheck", function (value, element) {
        var age = parseInt(value);
        return age >= 18 && age <= 100;
    }, "please enter a valid age between 18 and 100 years!");

});

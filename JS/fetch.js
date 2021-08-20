

//     fetch('https://dev.azure.com/' + organization + '/' + project + '/' + '/_apis/wit/workitems?ids=' + ids + '&api-version=6.1-preview')
//         .then(response => response.json())
//         .then(data => console.log(data));
// }
let data
let projects

function retrieveProjects(organization) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", AzureDevOPs_SWBC_PAT_64);
    myHeaders.append("Cookie", "VstsSession=%7B%22PersistentSessionId%22%3A%220ebcec05-2805-485d-b311-b5c5bf5bc8d5%22%2C%22PendingAuthenticationSessionId%22%3A%2200000000-0000-0000-0000-000000000000%22%2C%22CurrentAuthenticationSessionId%22%3A%2200000000-0000-0000-0000-000000000000%22%2C%22SignInState%22%3A%7B%7D%7D");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("https://dev.azure.com/" + organization + "/_apis/projects?api-version=6.0", requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            projects = result
            for (let i = 0; i < result.value.length; i++)
            {
                document.getElementById("projectSelect").innerHTML += "<option>" + result.value[i].name + "</option>"
            }
        })
.catch(error => console.log('error', error));
}

function retrieveWorkItems(organization, project, ids) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", AzureDevOPs_SWBC_PAT_64);
    myHeaders.append("Cookie", "VstsSession=%7B%22PersistentSessionId%22%3A%220ebcec05-2805-485d-b311-b5c5bf5bc8d5%22%2C%22PendingAuthenticationSessionId%22%3A%2200000000-0000-0000-0000-000000000000%22%2C%22CurrentAuthenticationSessionId%22%3A%2200000000-0000-0000-0000-000000000000%22%2C%22SignInState%22%3A%7B%7D%7D");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("https://dev.azure.com/" + organization + "/" + project + "/_apis/wit/workitems?ids=" + ids + "&api-version=6.1-preview.3", requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            data = result
            editDiv = document.getElementById("edit").innerText += 'There are: ' + result["count"] + ' results '
            for (let i = 0; i < result["value"].length; i++) {
                // if (i % 2 - 1 == 0) {document.getElementById("edit").innerHTML += "<style="background-color : lightblue;">"}
                document.getElementById("edit").innerHTML += "<br><a href='https://dev.azure.com/" + organization + "/"+ project +"/_workitems/edit/"+ result['value'][i]['id'] +"'>" + result['value'][i]['fields']['System.Title'] + "</a> - " + result.value[i].fields['System.Description'] + ". Created by: <a href='"+ result.value[0].fields["System.CreatedBy"].url +"'>" + result.value[i].fields["System.CreatedBy"].displayName + "</a>"

            }
        })
        .catch(error => console.log('error', error));
}

retrieveWorkItems("SWBC-FigWebDev", encodeURI("RM.Test"), "225399")
retrieveProjects("SWBC-FigWebDev")
$( () => {
    $.get('links.yaml', function(yamlText) {
        const data = jsyaml.load(yamlText);
        const $linksSection = $('#links-section');

        function addLink($sectionDiv, link) {
            if (link.url == null) {
                const $anchor = $('<h2>', {
                    text: link.title
                });
                $sectionDiv.append($anchor);
                return;
            }
            const $anchor = $('<a>', {
                href: link.url,
                target: '_blank',
                text: link.title
            });
            if (link.relatedSkill) {
                const relatedIcon = data.sections.find(
                    section => section.title === link.relatedSkill
                ).icon;
                $anchor.append(`<img src="assets/${relatedIcon}">`);
            } else if (link.icon) {
                $anchor.append(`<img src="assets/${link.icon}">`);
            }
            $sectionDiv.append($anchor);
        }
        data.sections.forEach((section, index) => {
            const $sectionDiv = $('<div>', { class: 'links-col' });
            const $header = $('<h1>');
            if (section.icon) {
                $header.append(`<img src="assets/${section.icon}" />`);
            }
            $header.append(section.title);
            $sectionDiv.append($header);

            section.links.forEach(link => addLink($sectionDiv, link));

            // Add projects dropdown
            if (section.projects && section.projects.length > 0) {
                const $dropdown = $('<div>', { class: 'projects' });
                const $dropdownButton = $('<div>', { class: 'projects-button', text: 'Projects', tabIndex: 0 });
                $dropdownButton.append(`<i class="arrow down"></i>`)
                const $dropdownContent = $('<div>', { class: 'projects-content' });
                
                section.projects.forEach(project => addLink($dropdownContent, project));

                $dropdown.append($dropdownButton);
                $dropdown.append($dropdownContent);
                $sectionDiv.append($dropdown);
            }
            $linksSection.append($sectionDiv);

            if (index < data.sections.length - 1) {
                const $divider = $('<span>', { class: 'vertical-divider' });
                $linksSection.append($divider);
            }
        });
    }).fail(function(error) {
        console.error(error);
    }).then(function() {
        $('a').click(function(e) {
            e.preventDefault();
            var linkUrl = $(this).attr('href');
            setTimeout(function(url) {
                window.location = url;
                window.target = "_blank";
                $('a').trigger('blur');
            }, 500, linkUrl);
        });

        // Projects dropdown
        $('.projects-button').on('click', function() {
            $(this).toggleClass('clicked')
            $(this).find('.arrow').toggleClass('down up');
            mouseDown.play();
            $(this).parent().find('.projects-content').toggle();
            if (!$(this).hasClass('clicked')) {
                $(this).blur();
                mouseUp.play();
            }
        });

        // Add click sound
        const mouseDown = new Audio();
        const mouseUp = new Audio();
        mouseDown.src = "/assets/mouse-down.mov";
        mouseUp.src = "/assets/mouse-up.mov";

        const $clickable = $('a, .profile-pic');
        $clickable.on('mousedown', function() {
            mouseDown.play();
        })
        $clickable.on('mouseup', function() {
            mouseUp.play();
        })
    });

    const NumOfProfilePics = 3;
    let picIndex = Math.floor(Math.random() * NumOfProfilePics);
    let profilePicURL = `assets/profile${picIndex}.jpg`;
    $('.profile-pic').find('img').attr('src', profilePicURL);
    $('.profile-pic').on('mouseup', function(e) {
        setTimeout(() => {
            let $pic = $(this).find("img");
            picIndex = (picIndex + 1) % NumOfProfilePics
            let profilePicURL = `assets/profile${picIndex}.jpg`;
            $pic.attr('src', profilePicURL);
            $pic.blur();
        }, 120);
    })

    var isMobile = (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4)));
    if (!isMobile) {
        $("#cat").load("/src/cat.html"); 
    }
});

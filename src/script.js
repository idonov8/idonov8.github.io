$( () => {
    $.get('links.yaml', function(yamlText) {
        const data = jsyaml.load(yamlText);
        const $linksSection = $('#links-section');

        data.sections.forEach((section, index) => {
            const $sectionDiv = $('<div>', { class: 'links-col' });
            const $header = $('<h1>');
            if (section.icon) {
                $header.append(`<img src="assets/${section.icon}" />`);
            }
            $header.append(section.title);
            $sectionDiv.append($header);

            section.links.forEach(link => {
                const $anchor = $('<a>', {
                    href: link.url,
                    target: '_blank',
                    text: link.title
                });
                $sectionDiv.append($anchor);
            });

            // Add projects dropdown
            if (section.projects && section.projects.length > 0) {
                const $dropdown = $('<div>', { class: 'projects' });
                const $dropdownButton = $('<div>', { class: 'projects-button', text: 'Projects', tabIndex: 0 });
                $dropdownButton.append(`<i class="arrow down"></i>`)
                const $dropdownContent = $('<div>', { class: 'projects-content' });
                
                section.projects.forEach(project => {
                    const $projectLink = $('<a>', {
                        href: project.url,
                        target: '_blank',
                        text: project.title
                    });
                    $dropdownContent.append($projectLink);
                });

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
            $(this).parent().find('.projects-content').toggle();
            if (!$(this).hasClass('clicked')) {
                $(this).blur();
            }
        });
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
});

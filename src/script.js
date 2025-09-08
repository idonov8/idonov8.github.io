function generateHarmoniousColors() {
    const baseHue = Math.random() * 360;

    // Define main colors
    const colors = {
        primary: `hsl(${baseHue}, 80%, 45%)`, // Button background
        background: `hsl(${(baseHue + 30) % 360}, 50%, 90%)`, // Page background
        shadow: `hsl(${(baseHue + 30) % 360}, 60%, 40%)`, 
        border: `hsl(${baseHue}, 20%, 50%)`, 
        hover: `hsl(${(baseHue + 200) % 360}, 80%, 45%)`, 
        divider: `hsl(${baseHue}, 10%, 70%)`
    };
    // Make text color darker than primary by reducing lightness by 15%
    colors.text = `hsl(${baseHue}, 80%, 20%)`; // 40% lightness instead of 55% from primary

    // Apply colors as CSS variables
    const root = document.documentElement;
    Object.entries(colors).forEach(([key, value]) => {
        root.style.setProperty(`--color-${key}`, value);
    });
}

$( () => {
    $.get('links.yaml', function(yamlText) {
        const data = jsyaml.load(yamlText);
        const $mainContent = $('#main-content');

        // Create sections based on the new structure
        data.sections.forEach(section => {
            const $section = $('<div>', { class: 'section' });
            
            // Section header
            const $header = $('<div>', { class: 'section-header' });
            const $title = $('<h1>');
            if (section.icon) {
                // Check if it's a custom icon (not in the icons/SVG directory)
                if (section.icon.includes('assets/icons/SVG/')) {
                    // Use <use> for standard icons
                    const iconName = section.icon.split('/').pop().replace('.svg', '');
                    $title.append(`<svg class="icon"><use href="${section.icon}#${iconName}"></use></svg>`);
                } else {
                    // For custom icons, use img tag for now
                    $title.append(`<img src="${section.icon}" alt="${section.title}" class="icon" />`);
                }
            }
            $title.append(section.title);
            $header.append($title);
            $section.append($header);

            // Handle different section types
            if (section.type === 'developer') {
                // All projects in one grid
                if (section.projects && section.projects.length > 0) {
                    const $grid = $('<div>', { class: 'projects-grid' });
                    section.projects.forEach(project => {
                        const $card = $('<div>', { 
                            class: 'project-card',
                            'data-url': project.url
                        });
                        $card.append(`<h3>${project.title}</h3>`);
                        if (project.description) {
                            $card.append(`<p>${project.description}</p>`);
                        }
                        $grid.append($card);
                    });
                    $section.append($grid);
                }
            } else if (section.type === 'filmmaker') {
                // Personal videos with embeds
                if (section.personalVideos && section.personalVideos.length > 0) {
                    const $videoGrid = $('<div>', { class: 'video-grid' });
                    section.personalVideos.forEach(video => {
                        const $videoItem = $('<div>', { class: 'video-item' });
                        $videoItem.append(`<div class="video-title">${video.title}</div>`);
                        const $embed = $('<div>', { class: 'video-embed' });
                        $embed.append(`<iframe src="https://www.youtube.com/embed/${video.embedId}" allowfullscreen></iframe>`);
                        $videoItem.append($embed);
                        $videoGrid.append($videoItem);
                    });
                    $section.append($videoGrid);
                }

                // Professional projects
                if (section.professionalProjects && section.professionalProjects.length > 0) {
                    const $professional = $('<div>', { class: 'professional-projects' });
                    $professional.append('<h3>Professionally, I also made:</h3>');
                    const $links = $('<div>', { class: 'professional-links' });
                    section.professionalProjects.forEach(project => {
                        const $link = $('<a>', {
                            href: project.url,
                            target: '_blank',
                            text: project.title
                        });
                        $links.append($link);
                    });
                    $professional.append($links);
                    $section.append($professional);
                }
            } else if (section.type === 'photographer') {
                // Photography links as project cards
                if (section.links && section.links.length > 0) {
                    const $grid = $('<div>', { class: 'projects-grid' });
                    section.links.forEach(link => {
                        const $card = $('<div>', { 
                            class: 'project-card photography-card',
                            'data-url': link.url
                        });
                        $card.append(`<h3>${link.title}</h3>`);
                        if (link.description) {
                            $card.append(`<p>${link.description}</p>`);
                        }
                        $grid.append($card);
                    });
                    $section.append($grid);
                }
            }

            $mainContent.append($section);
        });
    }).fail(function(error) {
        console.error(error);
    }).then(function() {
        // Handle project card clicks for iframe modal
        $('.project-card').on('click', function() {
            const url = $(this).data('url');
            openIframeModal(url);
        });

        // Handle regular link clicks (with delay for sound effect)
        $('a:not(.contact-btn)').click(function(e) {
            e.preventDefault();
            var linkUrl = $(this).attr('href');
            setTimeout(function(url) {
                window.open(url, '_blank');
            }, 500, linkUrl);
        });

        // Add click sound
        const mouseDown = new Audio();
        const mouseUp = new Audio();
        mouseDown.src = "/assets/mouse-down.mov";
        mouseUp.src = "/assets/mouse-up.mov";

        const $clickable = $('a, .profile-pic, .project-card');
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
        generateHarmoniousColors();
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
    generateHarmoniousColors();
});

// Iframe modal functions
function openIframeModal(url) {
    const $modal = $('#iframe-modal');
    const $iframe = $('#project-iframe');
    
    $iframe.attr('src', url);
    $modal.show();
    
    // Prevent body scroll when modal is open
    $('body').css('overflow', 'hidden');
}

function closeIframeModal() {
    const $modal = $('#iframe-modal');
    const $iframe = $('#project-iframe');
    
    $modal.hide();
    $iframe.attr('src', '');
    
    // Restore body scroll
    $('body').css('overflow', 'auto');
}

function openInNewTab(url) {
    window.open(url, '_blank');
    closeIframeModal();
}

// Modal event handlers
$(document).ready(function() {
    $('#close-modal').on('click', closeIframeModal);
    $('#fullscreen-btn').on('click', function() {
        const url = $('#project-iframe').attr('src');
        if (url) {
            openInNewTab(url);
        }
    });
    
    // Close modal when clicking outside
    $('#iframe-modal').on('click', function(e) {
        if (e.target === this) {
            closeIframeModal();
        }
    });
    
    // Close modal with Escape key
    $(document).on('keydown', function(e) {
        if (e.key === 'Escape' && $('#iframe-modal').is(':visible')) {
            closeIframeModal();
        }
    });
});

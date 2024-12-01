$( () => {
    $.get('links.yaml', function(yamlText) {
        const data = jsyaml.load(yamlText);
        const $linksSection = $('#links-section');

        data.sections.forEach((section, index) => {
            const $sectionDiv = $('<div>', { class: 'links-col' });
            const $header = $('<h1>')
			if (section.icon) {
				$header.append(`<img src="assets/${section.icon}" />`)
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
	});
});

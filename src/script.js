document.addEventListener("DOMContentLoaded", () => {
    fetch('links.yaml')
        .then(response => response.text())
        .then(yamlText => {
            const data = jsyaml.load(yamlText);
            const linksSection = document.getElementById('links-section');

            data.sections.forEach((section, index) => {
                const sectionDiv = document.createElement('div');
				sectionDiv.classList = "links-col"
                const header = document.createElement('h1');
                header.textContent = section.title;
                sectionDiv.appendChild(header);

                section.links.forEach(link => {
                    const anchor = document.createElement('a');
                    anchor.href = link.url;
					anchor.target = "_blank";
                    anchor.textContent = link.title;
                    sectionDiv.appendChild(anchor);
                });

                linksSection.appendChild(sectionDiv);

                if (index < data.sections.length - 1) {
                    const divider = document.createElement('span');
                    divider.className = 'vertical-divider';
                    linksSection.appendChild(divider);
                }
            });
        })
        .catch(error => console.error(error));
});

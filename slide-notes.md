***
# First Section
!--center
This is the first slide
---
## Second page
This is the second page
---
## Third page
This is the third page
***
# Second Section
This is the second section, first page
---
## Second page
This is the second section, second page


START

    section=1
    page=1
    count=1
 
    '<div class="ft-section" data-id="section-' + section + '">' +
    '<div id="/section-' + section + '/page-' + page + '" class="ft-page" data-id="page-' + count + '">'
    

--- -> 
    '</div>' +
    '<div id="/section-' + section + '/page-' + page + '" class="ft-page" data-id="page-' + count + '">'
    
    page++
    count++
    
*** ->
    '</div></div>' +
    '<div class="ft-section" data-id="section-' + section + '">' +
    '<div id="/section-' + section + '/page-' + page + '" class="ft-page" data-id="page-' + count + '">'
    
    section++
    page=1
    count++


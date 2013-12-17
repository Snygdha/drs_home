/**
 * @package WordPress
 * @subpackage Crystalline
 * @since Crystalline 1.0
 * 
 * Portfolio Sorting Run Script for jQuery Isotope Plugin
 * Created by CMSMasters
 * 
 */


jQuery(document).ready(function () { 
	(function ($) { 
		var container = $('section.portfolio');
		
		
		function getNumbColumns() { 
			var winWidth = $(window).width(), 
				contWidth = container.width(), 
				columnNumb = 1;
			
			
			if (container.hasClass('four_columns')) {
				if (winWidth > 767) {
					columnNumb = 4;
				} else if (winWidth > 540) {
					columnNumb = 2;
				}
			} else if (container.hasClass('three_columns')) {
				if (winWidth > 767) {
					columnNumb = 3;
				}
			} else if (container.hasClass('two_columns')) {
				if (winWidth > 540) {
					columnNumb = 2;
				}
			}
			
			
			return columnNumb;
		}
		
		
		function setColumnWidth() { 
			var contWidth = container.width(), 
				columnNumb = getNumbColumns(), 
				postWidth = Math.floor(contWidth / columnNumb);
			
			
			container.find('article.project').each(function () { 
				$(this).css( { 
					width : postWidth + 'px' 
				} );
			} );
		}
		
		
		function setPjsSize() { 
			var winWidth = $(window).width(), 
				contWidth = container.width(), 
				postWidth = Math.floor(contWidth / 4), 
				postHeight = Math.floor((postWidth / 100) * 69), 
				pjWidth = postWidth, 
				pjHeight = postHeight;
			
			
			container.find('article.project').each(function () { 
				if ($(this).hasClass('four_x_four')) {
					pjWidth = postWidth * 4;
					pjHeight = postHeight * 4;
				} else if ($(this).hasClass('three_x_three')) {
					if (winWidth > 767) {
						pjWidth = postWidth * 3;
						pjHeight = postHeight * 3;
					} else {
						pjWidth = postWidth * 4;
						pjHeight = postHeight * 4;
					}
				} else if ($(this).hasClass('three_x_two')) {
					if (winWidth > 767) {
						pjWidth = postWidth * 3;
						pjHeight = postHeight * 2;
					} else {
						pjWidth = postWidth * 4;
						pjHeight = Math.floor((postHeight * 8) / 3);
					}
				} else if ($(this).hasClass('three_x_one')) {
					if (winWidth > 767) {
						pjWidth = postWidth * 3;
						pjHeight = postHeight;
					} else {
						pjWidth = postWidth * 4;
						pjHeight = Math.floor((postHeight * 4) / 3);
					}
				} else if ($(this).hasClass('two_x_three')) {
					if (winWidth > 540) {
						pjWidth = postWidth * 2;
						pjHeight = postHeight * 3;
					} else {
						pjWidth = postWidth * 4;
						pjHeight = Math.floor(postHeight * 6);
					}
				} else if ($(this).hasClass('two_x_two')) {
					if (winWidth > 540) {
						pjWidth = postWidth * 2;
						pjHeight = postHeight * 2;
					} else {
						pjWidth = postWidth * 4;
						pjHeight = postHeight * 4;
					}
				} else if ($(this).hasClass('two_x_one')) {
					if (winWidth > 540) {
						pjWidth = postWidth * 2;
						pjHeight = postHeight;
					} else {
						pjWidth = postWidth * 4;
						pjHeight = Math.floor(postHeight * 2);
					}
				} else if ($(this).hasClass('one_x_three')) {
					if (winWidth > 767) {
						pjWidth = postWidth;
						pjHeight = postHeight * 3;
					} else if (winWidth > 540) {
						pjWidth = postWidth * 2;
						pjHeight = postHeight * 6;
					} else {
						pjWidth = postWidth * 4;
						pjHeight = postHeight * 12;
					}
				} else if ($(this).hasClass('one_x_two')) {
					if (winWidth > 767) {
						pjWidth = postWidth;
						pjHeight = postHeight * 2;
					} else if (winWidth > 540) {
						pjWidth = postWidth * 2;
						pjHeight = postHeight * 4;
					} else {
						pjWidth = postWidth * 4;
						pjHeight = postHeight * 8;
					}
				} else if ($(this).hasClass('one_x_one')) {
					if (winWidth > 767) {
						pjWidth = postWidth;
						pjHeight = postHeight;
					} else if (winWidth > 540) {
						pjWidth = postWidth * 2;
						pjHeight = postHeight * 2;
					} else {
						pjWidth = postWidth * 4;
						pjHeight = postHeight * 4;
					}
				}
				
				
				$(this).css( { 
					width : pjWidth + 'px' 
				} );
				
				
				$(this).find('.preloader, .resizable_block, .cmsms_content_slider_parent .shortcode_slideshow_slides, .jp-video.fullwidth').css( { 
					paddingBottom : pjHeight + 'px' 
				} );
				
				
				$(this).find('.shortcode_slideshow_container').css( { 
					height : pjHeight + 'px', 
					position : 'relative', 
					overflow : 'hidden' 
				} );
			} );
		}
		
		
		function reArrangeProjects() { 
			setColumnWidth();
			
			container.isotope('reLayout');
		}
		
		
		function reArrangeProjectsMasonry() { 
			setPjsSize();
			
			container.isotope( { 
				itemSelector : 'article.project', 
				masonry : { 
					columnWidth : Math.floor(container.width() / 4) 
				}, 
				resizable : false 
			} );
		}
		
		
		if (container.hasClass('masonry')) {
			container.imagesLoaded(function () { 
				setPjsSize();
				
				
				container.isotope( { 
					itemSelector : 'article.project', 
					masonry : { 
						columnWidth : Math.floor(container.width() / 4) 
					}, 
					resizable : false 
				} );
			} );
		} else {
			container.imagesLoaded(function () { 
				setColumnWidth();
				
				
				container.isotope( { 
					itemSelector : 'article.project', 
					layoutMode : 'fitRows', 
					resizable : false, 
					getSortData : { 
						pj_name : function (el) { 
							return el.find('.entry-title > a').text();
						}, 
						pj_date : function (el) { 
							return parseInt(el.find('.meta-date').text());
						} 
					} 
				} );
			} );
		}
		
		
		$('.pj_options_block .pj_filter a').bind('click', function () { 
			var selector = $(this).attr('data-filter'), 
				text = $(this).text(), 
				filter_el = $(this).parent().parent().parent().find('.pj_cat_filter');
			
			
			$(this).parent().parent().find('>li.current').removeClass('current');
			
			$(this).parent().addClass('current');
			
			
			filter_el.attr( { 
				title : text, 
				'data-filter' : selector 
			} ).find('span').text(text);
			
			
			container.isotope( { 
				filter : selector 
			} );
			
			
			setTimeout(function () { 
				if (container.hasClass('masonry')) {
					reArrangeProjectsMasonry();
				} else {
					reArrangeProjects();
				}
			}, 300);
			
			
			return false;
		} );
		
		
		$('.pj_options_block .pj_sort > a').bind('click', function () { 
			var type = $(this).attr('name'), 
				asc = (type === 'pj_name') ? true : false, 
				current = ($(this).hasClass('current')) ? true : false, 
				reversed = ($(this).hasClass('reversed')) ? true : false;
			
			
			if (current) { 
				if (reversed) { 
					$(this).removeClass('reversed');
					
					
					asc = true;
				} else { 
					$(this).addClass('reversed');
					
					
					asc = false;
				}
			} else { 
				$(this).parent().find('.current').removeClass('current');
				
				$(this).parent().find('.reversed').removeClass('reversed');
				
				
				if (type === 'pj_name') { 
					$(this).addClass('current');
				} else { 
					$(this).addClass('current reversed');
				}
			}
			
			
			container.isotope( { 
				sortBy : type, 
				sortAscending : asc 
			} );
			
			
			setTimeout(function () { 
				if (container.hasClass('masonry')) {
					reArrangeProjectsMasonry();
				} else {
					reArrangeProjects();
				}
			}, 300);
			
			
			return false;
		} );
		
		
		$('.cmsms_project_loader').bind('click', function () { 
			var newElements = '', 
				numberColumn = '', 
				newHTML = '';
			
			
			if (container.hasClass('four_columns')) {
				numberColumn = 'four_columns';
			} else if (container.hasClass('three_columns')) {
				numberColumn = 'three_columns';
			} else if (container.hasClass('two_columns')) {
				numberColumn = 'two_columns';
			} else if (container.hasClass('one_column')) {
				numberColumn = 'one_column';
			}
			
			
			$.ajax( { 
				type : 'POST', 
				dataType : 'html', 
				url : templateURL + '/framework/function/portfolio-loader.php', 
				data : { 
					id : $('#middle.portfolio_page').attr('data-id'), 
					column : numberColumn, 
					offset : container.find('> article').length 
				}, 
				success : function (data) { 
					newHTML = data.replace(/<figure class="preloader">/g, '<figure class="preloader_removed">').replace(/<\/figure>/g, '<span class="image_rollover"></span></figure>').replace(/<span class="image_rollover"><\/span><\/figure><\/li>/g, '</figure></li>');
					
					
					container.isotope('insert', $(newHTML));
					
					
					if (container.hasClass('masonry')) {
						reArrangeProjectsMasonry();
					} else {
						reArrangeProjects();
					}
				} 
			} );
			
			
			return false;
		} );
		
		
		if (container.hasClass('masonry')) {
			$(window).on('debouncedresize', function () { 
				reArrangeProjectsMasonry();
			} );
		} else {
			$(window).on('debouncedresize', function () { 
				reArrangeProjects();
			} );
		}
	} )(jQuery);
} );


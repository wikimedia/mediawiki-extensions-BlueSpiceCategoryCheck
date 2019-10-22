$( document ).on( 'click', '#wpSave', function( e, options ) {
	var $me = $(this);

	options = options || {};
	if ( options.insertCategoryTriggered === true ) {
		return true;
	}

	if( typeof( VisualEditor ) !== "undefined" && typeof( tinymce ) !== "undefined" && VisualEditor._editorMode == "tiny" ) {
		tinymce.execCommand('mceHwCategory');
	} else {
		$( '#bs-editbutton-insertcategory' ).trigger( 'click' );
	}
	Ext.require( 'BS.InsertCategory.Dialog', function() {
		BS.InsertCategory.Dialog.on( 'ok', function( sender, data ) {
			if ( data.length < 1 ) {
				bs.util.alert(
					'bs-categorycheck-insertcategory-no-category-error',
					{
						titleMsg: 'bs-extjs-error',
						textMsg: 'bs-categorycheck-insertcategory-no-category'
					},
					{
						ok: function () {
							$me.trigger('click');
						},
						cancel: function () {
						},
						scope: this
					}
				);
			} else {
				$me.trigger(
					'click',
					{
						insertCategoryTriggered: true
					}
				);
			}
		} );
	} );
	e.preventDefault();
});
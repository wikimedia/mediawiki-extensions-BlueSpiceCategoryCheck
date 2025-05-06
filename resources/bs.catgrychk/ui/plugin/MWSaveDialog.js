bs.util.registerNamespace( 'bs.catgrychk.ui.plugin' );

bs.catgrychk.ui.plugin.MWSaveDialog = function BsCatgyChkUiPluginMWSaveDialog( component ) { // eslint-disable-line no-unused-vars
	bs.catgrychk.ui.plugin.MWSaveDialog.super.apply( this, arguments );
};

OO.inheritClass( bs.catgrychk.ui.plugin.MWSaveDialog, bs.vec.ui.plugin.MWSaveDialog );

bs.catgrychk.ui.plugin.MWSaveDialog.prototype.swapPanel = function ( panel, noFocus ) { // eslint-disable-line no-unused-vars
	this.categories = bs.vec.getCategoriesFromTarget( ve.init.target );

	if ( this.categories.length > 0 ) {
		this.showList();
	} else {
		this.showError();
	}

	this.component.getActions().setAbilities( { save: false } );
};

bs.catgrychk.ui.plugin.MWSaveDialog.prototype.showList = function () {
	if ( this.$errorMessage ) {
		this.$errorMessage.hide();
	}
	if ( this.$categoryList ) {
		this.$categoryList.remove();
		this.$categoryList = null;
	}

	const checkbox = this.makeCheckbox( 'bs-categorycheck-insertcategory-confirm-categories' );
	const categoryLinkList = this.makeCategoryLinkList();

	const listIntro = mw.message( 'bs-categorycheck-insertcategory-category-list' );
	this.$categoryList =
		$( '<div id="bs-categorycheck-confirm-categories" class="alert alert-warning" role="alert">' ) // eslint-disable-line no-jquery/no-parse-html-literal
			.append( listIntro.plain() )
			.append( '<br>' )
			.append( categoryLinkList )
			.append( checkbox.$element );

	this.component.savePanel.$element.prepend( this.$categoryList );
};

bs.catgrychk.ui.plugin.MWSaveDialog.prototype.showError = function () {
	if ( this.$categoryList ) {
		this.$categoryList.hide();
	}
	if ( this.$errorMessage ) {
		this.$errorMessage.remove();
		this.$errorMessage = null;
	}

	const checkbox = this.makeCheckbox( 'bs-categorycheck-insertcategory-ignore-no-category' );

	const errorMsg = mw.message( 'bs-categorycheck-insertcategory-no-category' );
	this.$errorMessage =
		$( '<div id="bs-categorycheck-missingcategory" class="alert alert-danger" role="alert">' ) // eslint-disable-line no-jquery/no-parse-html-literal
			.append( errorMsg.plain() )
			.append( checkbox.$element );

	this.component.savePanel.$element.prepend( this.$errorMessage );
};

bs.catgrychk.ui.plugin.MWSaveDialog.prototype.toggleSaveButton = function ( value ) {
	this.component.getActions().setAbilities( { save: value } );
};

bs.catgrychk.ui.plugin.MWSaveDialog.prototype.makeCheckbox = function ( label ) {
	const ignore = new OO.ui.CheckboxInputWidget( {} );
	ignore.on( 'change', this.toggleSaveButton, [], this );

	let ariaLabel = '';
	if ( this.categories.length > 0 ) {
		ariaLabel = 'bs-categorycheck-confirm-categories';
	} else {
		ariaLabel = 'bs-categorycheck-missingcategory';
	}
	const $children = ignore.$element.children();
	for ( let i = 0; i < $children.length; i++ ) {
		if ( $children[ i ].type === 'checkbox' ) {
			ignore.$element.children().eq( i )
				.attr( 'aria-describedby', ariaLabel );
		}
	}

	const fieldSetLayout = new OO.ui.FieldsetLayout( {} );
	const labelMsg = mw.message( label ); // eslint-disable-line mediawiki/msg-doc

	fieldSetLayout.addItems( [
		new OO.ui.FieldLayout( ignore, { label: labelMsg.plain(), align: 'inline' } )
	] );

	return fieldSetLayout;
};

bs.catgrychk.ui.plugin.MWSaveDialog.prototype.makeCategoryLinkList = function () {
	const links = [];
	for ( let i = 0; i < this.categories.length; i++ ) {
		const categoryName = this.categories[ i ];
		const categoryTitle = mw.Title.makeTitle( bs.ns.NS_CATEGORY, categoryName );
		const link = mw.html.element(
			'a',
			{
				href: categoryTitle.getUrl(),
				title: categoryTitle.getName(),
				target: '_blank',
				'data-bs-title': categoryTitle.getPrefixedText()
			},
			categoryTitle.getName()
		);
		links.push( link );
	}

	return links.join( ', ' );
};

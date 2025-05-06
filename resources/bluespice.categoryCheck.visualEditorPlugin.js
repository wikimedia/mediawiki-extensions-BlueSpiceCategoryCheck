bs.vec.registerComponentPlugin(
	bs.vec.components.SAVE_DIALOG,
	( component ) => {
		const bsgCategoryCheckNamespaces =
			mw.config.get( 'bsgCategoryCheckNamespaces', [] );
		const currentNamespace = mw.config.get( 'wgNamespaceNumber' );

		if ( bsgCategoryCheckNamespaces.indexOf( currentNamespace ) === -1 ) {

			// Base class that does nothing
			return new bs.vec.ui.plugin.MWSaveDialog( component );
		}

		return new bs.catgrychk.ui.plugin.MWSaveDialog( component );
	}
);

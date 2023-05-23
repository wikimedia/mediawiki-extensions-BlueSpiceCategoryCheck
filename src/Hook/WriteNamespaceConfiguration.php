<?php

namespace BlueSpice\CategoryCheck\Hook;

use BlueSpice\NamespaceManager\Hook\NamespaceManagerBeforePersistSettingsHook;

class WriteNamespaceConfiguration implements NamespaceManagerBeforePersistSettingsHook {

	/**
	 * @inheritDoc
	 */
	public function onNamespaceManagerBeforePersistSettings(
		array &$configuration, int $id, array $definition, array $mwGlobals
	): void {
		$enabledNamespace = $mwGlobals['bsgCategoryCheckNamespaces'];
		$currentlyActivated = in_array( $id, $enabledNamespace );

		$explicitlyDeactivated = false;
		if ( isset( $definition[ 'categorycheck' ] ) && $definition[ 'categorycheck' ] === false ) {
			$explicitlyDeactivated = true;
		}

		$explicitlyActivated = false;
		if ( isset( $definition[ 'categorycheck' ] ) && $definition[ 'categorycheck' ] === true ) {
			$explicitlyActivated = true;
		}

		if ( ( $currentlyActivated && !$explicitlyDeactivated ) || $explicitlyActivated ) {
			$configuration['bsgCategoryCheckNamespaces'][] = $id;
		}
	}
}

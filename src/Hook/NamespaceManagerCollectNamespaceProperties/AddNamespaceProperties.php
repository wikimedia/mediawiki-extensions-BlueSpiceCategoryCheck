<?php

namespace BlueSpice\CategoryCheck\Hook\NamespaceManagerCollectNamespaceProperties;

class AddNamespaceProperties {

	/**
	 * @inheritDoc
	 */
	public function onNamespaceManagerCollectNamespaceProperties(
		int $namespaceId,
		array $globals,
		array &$properties
	): void {
		$properties['categorycheck'] = in_array(
			$namespaceId,
			$globals['bsgCategoryCheckNamespaces'] ?? []
		);
	}

}

<?php

namespace BlueSpice\CategoryCheck\Hook\NamespaceManagerGetMetaFields;

use BlueSpice\NamespaceManager\Hook\NamespaceManagerGetMetaFields;

class RegisterMetaField extends NamespaceManagerGetMetaFields {

	/**
	 * @return bool
	 */
	protected function doProcess() {
		$this->metaFields[] = [
			'name' => 'categorycheck',
			'type' => 'boolean',
			'label' => wfMessage( 'bs-categorycheck-nsm-label-categorycheck' )->text(),
			'filter' => [
				'type' => 'boolean'
			]
		];

		return true;
	}

}

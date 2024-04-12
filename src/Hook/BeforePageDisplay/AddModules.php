<?php

namespace BlueSpice\CategoryCheck\Hook\BeforePageDisplay;

use BlueSpice\Hook\BeforePageDisplay;

class AddModules extends BeforePageDisplay {

	/** @var int[] */
	protected $enabledNamespaces = [];

	protected function skipProcessing() {
		$title = $this->out->getTitle();
		if ( !$title ) {
			return true;
		}

		if ( $title->isSpecialPage() ) {
			return true;
		}

		// No JS, CSS and so on
		if ( !$title->isWikitextPage() ) {
			return true;
		}

		if ( $this->isNotEnabledForCurrentNamespace() ) {
			return true;
		}

		return false;
	}

	protected function doProcess() {
		$this->out->addJsConfigVars(
			'bsgCategoryCheckNamespaces',
			$this->enabledNamespaces
		);

		return true;
	}

	/**
	 * @return bool
	 */
	protected function isNotEnabledForCurrentNamespace() {
		$this->enabledNamespaces =
			$this->getConfig()->get( 'CategoryCheckNamespaces' );

		return !in_array(
			$this->out->getTitle()->getNamespace(),
			$this->enabledNamespaces
		);
	}
}

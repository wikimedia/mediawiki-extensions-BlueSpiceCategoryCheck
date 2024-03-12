<?php

namespace BlueSpice\CategoryCheck\Hook\BSUsageTrackerRegisterCollectors;

use BS\UsageTracker\Hook\BSUsageTrackerRegisterCollectors;
use MediaWiki\MediaWikiServices;

class CategoryCheckEnabled extends BSUsageTrackerRegisterCollectors {

	protected function doProcess() {
		$categoryCheckNamespaces = MediaWikiServices::getInstance()->getConfigFactory()
			->makeConfig( 'bsg' )->get( 'CategoryCheckNamespaces' );

		$this->collectorConfig['no-of-namespaces-category-check'] = [
			'class' => 'Basic',
			'config' => [
				'identifier' => 'no-of-namespaces-category-check',
				'internalDesc' => 'Number of namespaces with CategoryCheck enabled',
				'count' => count( $categoryCheckNamespaces )
			]
		];
	}
}

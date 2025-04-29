<?php

namespace Drupal\localgov_live_preview_microsites\Plugin\Menu;

use Drupal\Core\Menu\LocalTaskDefault;
use Drupal\Core\Routing\RouteMatchInterface;

class LivePreviewLocalTask extends LocalTaskDefault {

  /**
   * {@inheritdoc}
   */
  public function getRouteParameters(RouteMatchInterface $route_match) {
    $route_parameters = parent::getRouteParameters($route_match);
    $group = localgov_microsites_group_get_by_context();
    $route_parameters['group'] = $group?->id();
    return $route_parameters;
  }

}

<?php

use Inertia\Testing\AssertableInertia as Assert;

it('renders the home page component', function () {
    $this->get('/')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('home'));
});

Feature: sample
  As an... I want to ...
  Scenario: succesful case
    Given my interesting table
      | horizon | 1 |
      | sky | 2  |
    When I increase "horizon" by 11
    Then the sum of both is 13
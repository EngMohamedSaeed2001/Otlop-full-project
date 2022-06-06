package com.resturant.project.repository.specification;

import com.resturant.project.model.UserSearchParameters;
import com.resturant.project.model.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

@Builder
@AllArgsConstructor
public class UserSpecifications implements Specification<User> {

    private UserSearchParameters userSearchParameters;

    @Override
    public Predicate toPredicate(Root<User> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {

        Predicate predicate = criteriaBuilder.conjunction();

        if (userSearchParameters.getEmail() != null) {
            predicate.getExpressions().add(criteriaBuilder
                    .and(criteriaBuilder.like(criteriaBuilder.lower(root.get("email")), userSearchParameters.getEmail())));
        }

        return predicate;
    }
}
